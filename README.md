# SIRRA BV website

Next.js website met een ingebouwde Sanity Studio als CMS. De Studio is bereikbaar via `/studio` zodra de site draait en de Sanity-omgeving is ingesteld.

## Ontwikkelen

```bash
npm run dev
```

Open daarna:

- Website: http://localhost:3000
- CMS: http://localhost:3000/studio

## Belangrijke documentatie

- [CMS-handleiding voor redacteuren](./docs/cms-handleiding.md)

## Scripts

```bash
npm run dev
npm run build
npm run lint
npm run format:check
```

## Omgeving

Gebruik `.env.example` als basis voor `.env.local`. De belangrijkste variabelen zijn:

- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET`
- `NEXT_PUBLIC_SANITY_API_VERSION`
- `NEXT_PUBLIC_SANITY_STUDIO_URL`
