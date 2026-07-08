export const providers = [
  {
    name: "Ploi",
    slug: "ploi",
    logo: "/providers/ploi-io-logo-user-crop.webp",
    status: "beta",
    statusNote: "Currently in early testing. Some features may not work as expected on all Ploi instances.",
    description:
      "Manage servers and deployments through the Ploi API. Ideal for developers who want a managed server control panel with a clean UI.",
    features: [
      "Site Management",
      "SSL Certificates",
      "Database Management",
      "Queue Workers",
      "Cron Jobs",
      "Environment Variables",
    ],
    config: {
      provider: "ploi",
      api_key: "${PLOI_API_KEY}",
      server_id: "123456",
    },
    install: "composer require shippercli/ploi-provider",
  },
  {
    name: "Laravel Forge",
    slug: "forge",
    logo: "/providers/forge.svg",
    status: "beta",
    statusNote: "Currently in early testing. Some features may not work as expected on all Forge instances.",
    description:
      "Deploy to servers managed by Laravel Forge. Perfect for Laravel applications with built-in Composer, queue, and SSL support.",
    features: [
      "Site Management",
      "SSL Certificates (Let's Encrypt)",
      "Database Management",
      "Queue Workers",
      "Git Deployment",
      "Daemon Commands",
    ],
    config: {
      provider: "forge",
      api_token: "${FORGE_API_TOKEN}",
      server_id: "789012",
    },
    install: "composer global require laravel/forge-sdk",
  },
  {
    name: "cPanel",
    slug: "cpanel",
    logo: "/providers/cpanel.svg",
    status: "beta",
    statusNote: "Currently in early testing. Some features may not work as expected on all cPanel instances.",
    description:
      "Automate deployments to shared cPanel hosting accounts. Works with any cPanel provider that gives you API access.",
    features: ["Git Version Control", "Domain Management", "Database Management", "SSL Certificates"],
    config: {
      provider: "cpanel",
      host: "cpanel.example.com",
      port: 2083,
      username: "myuser",
      api_token: "${CPANEL_API_TOKEN}",
    },
    install: "composer require shippercli/provider-cpanel",
  },
  {
    name: "EasyPanel",
    slug: "easypanel",
    logo: "/providers/easypanel.svg",
    status: "beta",
    statusNote: "Currently in early testing. Some features may not work as expected on all EasyPanel instances.",
    description:
      "Deploy PHP applications with Git integration and EasyPanel-managed services on self-hosted infrastructure.",
    features: [
      "Git Source Management",
      "Application Deployment",
      "Database Management",
      "Domain Mapping",
      "SSL Certificates",
    ],
    config: {
      provider: "easypanel",
      url: "https://easypanel.example.com",
      auth_token: "${EASYPANEL_AUTH_TOKEN}",
    },
    install: "composer require shippercli/provider-easypanel",
  },
] as const;

export const allProviderFeatures = Array.from(
  new Set(providers.flatMap((provider) => provider.features))
).sort();

export function getProvider(slug: string) {
  return providers.find((provider) => provider.slug === slug);
}
