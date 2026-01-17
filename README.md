# 🚀 Portfolio Website

A modern, interactive portfolio website built with Next.js 14, featuring a space-themed design with dynamic animations, 3D graphics, and an AI-powered chatbot assistant.

## ✨ Features

### 🎨 Interactive UI/UX

- **Space-themed Design**: Immersive cosmic background with aurora effects, twinkling stars, and animated astronaut overlay
- **Smooth Animations**: Engaging scroll animations and transitions
- **3D Graphics**: Interactive 3D elements powered by Three.js and React Three Fiber
- **Responsive Layout**: Fully optimized for desktop, tablet, and mobile devices

### 🤖 AI Chatbot Assistant

- **Intelligent Portfolio Guide**: "Pixel" - an AI assistant powered by Google's Gemini AI
- **Context-Aware Responses**: Answers questions about experience, projects, skills, and achievements
- **Real-time Chat Interface**: Smooth, interactive chat experience with typing indicators

### 📱 Sections

- **Hero Section**: Eye-catching introduction with animated elements
- **Education**: Academic background and achievements
- **Skills**: Technical skills with interactive skill icons
- **Work Experience**: Professional work history
- **Projects**: Showcased projects with MacBook-style presentation frames
- **Blog**: Latest blog posts and articles
- **Contact**: Get in touch section

### 🔧 Technical Features

- **Server-Side Rendering**: Optimized performance with Next.js App Router
- **Type Safety**: Full TypeScript implementation
- **Analytics**: Integrated Vercel Analytics and Speed Insights
- **SEO Optimized**: Automated sitemap and robots.txt generation
- **Email Integration**: Contact form with Nodemailer

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **3D Graphics**: [Three.js](https://threejs.org/), [React Three Fiber](https://docs.pmnd.rs/react-three-fiber), [@react-three/drei](https://github.com/pmndrs/drei)
- **AI**: [Google Generative AI](https://ai.google.dev/) (Gemini)
- **UI Components**: [Lucide React](https://lucide.dev/) icons
- **Animations**: Custom CSS animations with Tailwind
- **Email**: [Nodemailer](https://nodemailer.com/)
- **Analytics**: Vercel Analytics & Speed Insights
- **Database**: [Vercel KV](https://vercel.com/docs/storage/vercel-kv)

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- npm, yarn, pnpm, or bun package manager

### Installation

1. Clone the repository:

```bash
git clone https://github.com/JalinaH/my-portfolio.git
cd my-portfolio
```

2. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

3. Set up environment variables:
   Create a `.env.local` file in the root directory and add:

```env
GEMINI_API_KEY=your_gemini_api_key
KV_URL=your_vercel_kv_url
KV_REST_API_URL=your_vercel_kv_rest_api_url
KV_REST_API_TOKEN=your_vercel_kv_rest_api_token
KV_REST_API_READ_ONLY_TOKEN=your_vercel_kv_read_only_token
```

4. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📁 Project Structure

```
my-portfolio/
├── src/
│   ├── app/              # Next.js App Router pages
│   │   ├── api/          # API routes (chatbot)
│   │   ├── actions.ts    # Server actions
│   │   ├── layout.tsx    # Root layout
│   │   └── page.tsx      # Home page
│   ├── components/       # React components
│   │   ├── UI/           # Reusable UI components
│   │   ├── hero-section.tsx
│   │   ├── chatbot.tsx
│   │   └── ...           # Other section components
│   └── lib/              # Utility functions
├── data/                 # Markdown content files
│   ├── bio.md
│   ├── projects.md
│   ├── skills.md
│   └── ...
├── public/               # Static assets
└── package.json
```

## 🎨 Customization

### Content Updates

All portfolio content is stored in markdown files in the `data/` directory:

- `bio.md` - Personal bio and introduction
- `projects.md` - Projects showcase
- `skills.md` - Technical skills
- `work.md` - Work experience
- `achievements.md` - Achievements and awards
- `experience.md` - Professional experience
- `extracurricular_volunteering.md` - Volunteer work
- `social_links.md` - Social media links

Simply edit these files to update your portfolio content.

### Styling

- Global styles: [src/app/globals.css](src/app/globals.css)
- Tailwind config: [tailwind.config.js](tailwind.config.js)
- Component-specific styles: Inline with Tailwind classes

## 🔗 API Routes

### `/api/chat` (POST)

AI chatbot endpoint that processes user messages and generates contextual responses about the portfolio.

**Request Body:**

```json
{
  "messages": [
    {
      "role": "user",
      "content": "Tell me about your projects"
    }
  ]
}
```

## 📊 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🚢 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Import project in [Vercel](https://vercel.com/new)
3. Configure environment variables
4. Deploy!

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/JalinaH/my-portfolio)

### Other Platforms

This Next.js app can be deployed to any platform that supports Node.js:

- [Netlify](https://www.netlify.com/)
- [Railway](https://railway.app/)
- [DigitalOcean](https://www.digitalocean.com/)

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/JalinaH/my-portfolio/issues).

## 👨‍💻 Author

**Jalina Hirushan**

- GitHub: [@JalinaH](https://github.com/JalinaH)
- Portfolio: [Your Portfolio URL]

## 🙏 Acknowledgments

- Space theme inspired by the cosmos
- Icons from [Lucide](https://lucide.dev/)
- Built with [Next.js](https://nextjs.org/)
- AI powered by [Google Gemini](https://ai.google.dev/)

---

Made with ❤️ and ☕
