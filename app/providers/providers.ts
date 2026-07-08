type ProviderMeta = {
  name: string;
  slug: string;
  logo: string;
  status?: "beta";
  statusNote?: string;
  description: string;
  features: string[];
  config: Record<string, unknown>;
  install: string;
};

type ProviderSource = {
  slug: string;
  repo: string;
};

export type Provider = ProviderMeta & {
  logo: string;
  repo: string;
};

const providerSources: ProviderSource[] = [
  { slug: "ploi", repo: "shippercli/provider-ploi" },
  { slug: "forge", repo: "shippercli/provider-forge" },
  { slug: "cpanel", repo: "shippercli/provider-cpanel" },
  { slug: "easypanel", repo: "shippercli/provider-easypanel" },
];

function rawGithubUrl(repo: string, path: string) {
  return `https://raw.githubusercontent.com/${repo}/main/${path}`;
}

async function fetchProvider(source: ProviderSource): Promise<Provider> {
  const response = await fetch(rawGithubUrl(source.repo, "meta.json"), {
    cache: "force-cache",
  });

  if (!response.ok) {
    throw new Error(`Failed to load provider metadata for ${source.slug}`);
  }

  const meta = (await response.json()) as ProviderMeta;

  return {
    ...meta,
    logo: rawGithubUrl(source.repo, meta.logo),
    repo: source.repo,
  };
}

let providersPromise: Promise<Provider[]> | undefined;

export async function getProviders() {
  providersPromise ??= Promise.all(providerSources.map(fetchProvider));
  return providersPromise;
}

export async function getAllProviderFeatures() {
  const providers = await getProviders();
  return Array.from(new Set(providers.flatMap((provider) => provider.features))).sort();
}

export async function getProvider(slug: string) {
  const providers = await getProviders();
  return providers.find((provider) => provider.slug === slug);
}
