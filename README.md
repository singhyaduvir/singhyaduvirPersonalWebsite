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
