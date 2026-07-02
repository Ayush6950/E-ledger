# Backend — Supabase

This directory contains the Supabase configuration and database migrations for EstateLedger.

## Structure

```
backend/
└── supabase/
    ├── config.toml        # Supabase project config
    └── migrations/        # SQL migration files
```

## Setup

1. Install the Supabase CLI: https://supabase.com/docs/guides/cli
2. Link your project:
   ```bash
   supabase link --project-ref <your-project-ref>
   ```
3. Run migrations:
   ```bash
   supabase db push
   ```

## Environment Variables

The Supabase credentials are stored in the root `.env` file:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_PUBLISHABLE_KEY`
- `VITE_SUPABASE_PROJECT_ID`
