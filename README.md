# Jalina Hirushan — Portfolio

Space-themed portfolio built with Next.js 14, React, TypeScript, and Tailwind CSS, with a Gemini assistant, Medium articles, and a contact form.

## Local setup

Use Node.js 22 and npm. Run `npm ci` to install the exact lockfile versions, copy `.env.example` to `.env.local`, fill in the required values, then run `npm run dev`.

- `GOOGLE_API_KEY`: Gemini API credential. `GEMINI_MODEL` defaults to `gemini-2.5-flash`; confirm model availability for your account before deployment.
- `EMAIL_USER` and `EMAIL_PASSWORD`: Gmail sender account and app password. The recipient and public email are `jalina.hirushan.dev@gmail.com`; incoming messages use the visitor's validated address as Reply-To.
- `KV_REST_API_URL` and `KV_REST_API_TOKEN`: Redis REST credentials supporting EVAL, required for production rate limiting. Missing credentials or a limiter outage disables chat/contact delivery safely; it does not affect the portfolio page. Local development uses process-local counters.

Never commit real credentials. Existing `.env.local` values are not overwritten by these changes.

## Checks

Run `npm run lint`, `npm run typecheck`, `npm test`, and `npm run build`. CI runs the same checks. The build needs access to Google Fonts; Medium fetch failures render a link to the real profile instead of sample posts. Run `npm start` after building to preview production.

The automated tests use mocked AI, email, and Redis services where applicable; they do not send email or make paid AI requests. Verify those integrations in your deployment after configuring credentials.

## Content and behavior

- Edit `src/lib/portfolio.ts` for the site URL, public contact email, and work history. The Work section and assistant consume the same work history. The internship ended in June 2026.
- Other assistant facts live in `data/`. Keep project and education facts aligned with their visible sections.
- Medium articles are fetched on the server and revalidated hourly. Missing images use `public/placeholder.svg`; unknown image hosts are not passed to the optimizer.
- `src/app/sitemap.ts` owns the sitemap; do not add another `public/sitemap.xml`.
- Chat permits 10 requests per minute and contact permits 3 per 10 minutes, per trusted client address on Vercel. Other hosting environments use a shared global bucket until a trusted proxy identity strategy is added. Fixed windows allow a burst around window boundaries.
- The assistant receives one question at a time; conversation history is not sent to the model.

Deployment references: [Gemini model lifecycle](https://ai.google.dev/gemini-api/docs/deprecations), [Vercel request headers](https://vercel.com/docs/headers/request-headers).
