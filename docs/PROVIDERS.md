---
description: "How the providers block is structured, how projects reference providers, and where provider-specific options belong."
section: "Configuration"
order: 21
---

# Providers

The `providers` block defines provider credentials and provider-specific settings.

## Shape

```yaml
providers:
  hosting:
    api_key: "${HOSTING_API_KEY}"
```

Projects reference a provider by key:

```yaml
projects:
  api:
    provider: hosting
```

## What Belongs Here

- credentials
- API endpoints or hosts when the provider requires them
- provider-specific identifiers that are shared across environments

## What Does Not Belong Here

- profile branch selection
- profile domain names
- preview-only naming
- per-environment infrastructure decisions

Those belong in [Profiles](./PROFILES.md).

## Capability Differences

Provider-specific fields and support levels are documented on provider pages:

- [Ploi](/providers/ploi)
- [Laravel Forge](/providers/forge)
- [cPanel](/providers/cpanel)
- [EasyPanel](/providers/easypanel)

Provider pages are built from the provider package's `meta.json` file. The feature matrix combines the capabilities declared by the package metadata, so supported and unsupported features stay visible as integrations evolve. A `Beta` label means the provider follows the current API and configuration structure but is still in early testing; some features may not work on every account or provider instance.

The provider packages currently tracked by the website are:

- [Ploi](https://github.com/shippercli/provider-ploi)
- [Laravel Forge](https://github.com/shippercli/provider-forge)
- [cPanel](https://github.com/shippercli/provider-cpanel)
- [EasyPanel](https://github.com/shippercli/provider-easypanel)

## Failure Modes

- wrong credential variable names: match the provider page exactly
- using one provider config for a different provider plugin: keep keys and expectations aligned
- assuming every provider supports the same resources: check the provider feature matrix first
