import { z } from "zod";

const providerMetaSchema = z.object({
  name: z.string().min(1),
  slug: z.string().min(1),
  logo: z.string().min(1),
  darkLogo: z.string().min(1).optional(),
  status: z.literal("beta").optional(),
  statusNote: z.string().optional(),
  description: z.string().min(1),
  features: z.array(z.string().min(1)),
  config: z.record(z.string(), z.unknown()),
  install: z.string().min(1),
});

type ProviderMeta = z.infer<typeof providerMetaSchema>;

type ProviderSource = {
  slug: string;
  repo: string;
};

export type Provider = ProviderMeta & {
  logo: string;
  darkLogo?: string;
  repo: string;
};

const providerSources: ProviderSource[] = [
  { slug: "ploi", repo: "shippercli/provider-ploi" },
  { slug: "forge", repo: "shippercli/provider-forge" },
  { slug: "cpanel", repo: "shippercli/provider-cpanel" },
  { slug: "easypanel", repo: "shippercli/provider-easypanel" },
];

const featureAliases: Record<string, string> = {
  "Application Deployment": "Application Deployment",
  "Static and PHP Deployments": "Application Deployment",
  "Site Management": "Application Deployment",
  "Domain Mapping": "Domain Management",
  "Git Source Management": "Git Deployment",
  "Git Version Control": "Git Deployment",
  "SSL Certificates (Let's Encrypt)": "SSL Certificates",
};

function normalizeFeatures(features: string[]) {
  return Array.from(
    new Set(features.map((feature) => featureAliases[feature] ?? feature))
  );
}

function rawGithubUrl(repo: string, path: string) {
  return `https://raw.githubusercontent.com/${repo}/main/${path}`;
}

async function fetchProvider(source: ProviderSource): Promise<Provider> {
  const response = await fetch(rawGithubUrl(source.repo, "meta.json"), {
    next: { revalidate: 300 },
    signal: AbortSignal.timeout(10_000),
  });

  if (!response.ok) {
    throw new Error(`Failed to load provider metadata for ${source.slug}`);
  }

  let meta: ProviderMeta;
  try {
    const result = providerMetaSchema.safeParse(await response.json());
    if (!result.success || result.data.slug !== source.slug) {
      throw new Error("Invalid metadata");
    }
    meta = result.data;
  } catch {
    throw new Error(`Invalid provider metadata for ${source.slug}`);
  }

  return {
    ...meta,
    features: normalizeFeatures(meta.features),
    logo: rawGithubUrl(source.repo, meta.logo),
    darkLogo: meta.darkLogo ? rawGithubUrl(source.repo, meta.darkLogo) : undefined,
    repo: source.repo,
  };
}

export async function getProviders() {
  // Each render must reach fetch so Next can track its revalidation interval.
  return Promise.all(providerSources.map(fetchProvider));
}

export async function getAllProviderFeatures() {
  const providers = await getProviders();
  return Array.from(new Set(providers.flatMap((provider) => provider.features))).sort();
}

export async function getProvider(slug: string) {
  const providers = await getProviders();
  return providers.find((provider) => provider.slug === slug);
}
