# Yaduvir Singh

Personal portfolio site. Next.js (App Router), TypeScript, and Tailwind CSS. All copy and links live in `content/`.

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run lint
npm run typecheck
npm run build
npm start
```

## Email alerts

Contact form submissions and first visits are sent to the Gmail address in
`GMAIL_USER` using Nodemailer and a Gmail App Password.

1. Enable 2-Step Verification in your Google Account.
2. Open your Google Account's **App passwords** settings and create an app
   password for this website.
3. Copy `.env.example` to `.env.local` and set `GMAIL_USER` to your Gmail
   address and `GMAIL_APP_PASSWORD` to the generated app password (without
   spaces). Keep the password private; do not add a `NEXT_PUBLIC_` prefix.
4. Add `GMAIL_USER` and `GMAIL_APP_PASSWORD` as server-side environment
   variables in your hosting dashboard, then redeploy.

The `.env.local` file is ignored by Git. If the hosting provider blocks SMTP
connections, Gmail SMTP delivery will fail; switch to the Gmail API with OAuth2
rather than exposing credentials or silently changing email providers.

## Where to edit content

| File | Purpose |
| --- | --- |
| `content/site.ts` | Name, bio, LinkedIn, GitHub, email, resume path, metadata |
| `content/projects.ts` | Selected work and project-page sections |
| `content/experience.ts` | Professional experience |
| `content/exploring.ts` | Currently exploring topics |
| `content/reading.ts` | Reading list |
| `content/interests.ts` | Beyond work |

## Where to add files

- Project screenshots: `public/images/projects/`
- Book covers: `public/images/books/`
- Hobby photos: `public/images/hobbies/`
- Resume and slide decks: `public/documents/`

After adding a file, point the matching `src` or `href` field in the content file to the public path, for example `/documents/Yaduvir_Singh_Resume.pdf`.
