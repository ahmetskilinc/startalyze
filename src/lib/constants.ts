import { env } from './env';

export const domain =
  process.env.NEXT_PUBLIC_VERCEL_ENV === 'production'
    ? `https://${process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL}`
    : process.env.VERCEL_BRANCH_URL
      ? `https://${process.env.NEXT_PUBLIC_VERCEL_BRANCH_URL}`
      : process.env.NEXT_PUBLIC_VERCEL_URL
        ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
        : process.env.NEXT_PUBLIC_DEVELOPMENT_URL
          ? process.env.NEXT_PUBLIC_DEVELOPMENT_URL
          : env.NEXT_PUBLIC_DEVELOPMENT_URL;
export const features = [
  {
    title: 'Startup Idea Validator',
    description:
      'Paste your startup idea and get instant insights with market data, SWOT analysis, competitor breakdowns, user personas, and go-to-market strategy.',
    link: '/',
  },
  {
    title: 'Competitor Scraper',
    description:
      'Automatically find and summarize existing products in your niche using web scraping and smart clustering.',
    link: '/',
  },
  {
    title: 'Market Opportunity Detector',
    description:
      'Analyze underserved niches, keyword trends, and product gaps to find your ideal launch angle.',
    link: '/',
  },
  {
    title: 'SWOT Generator',
    description:
      'Get a strengths, weaknesses, opportunities, and threats breakdown of your idea based on real-time data.',
    link: '/',
  },
  {
    title: 'Go-to-Market Planner',
    description:
      'Generate a lean launch roadmap with acquisition channels, content ideas, and distribution hacks.',
    link: '/',
  },
  {
    title: 'AI Persona Builder',
    description:
      'Create user personas based on your product and market — including motivations, pain points, and buying triggers.',
    link: '/',
  },
];
export const navLinks = [
  { text: 'Home', href: 'hero' },
  { text: 'Features', href: 'features' },
  { text: 'Try It', href: 'cta' },
  { text: 'FAQ', href: 'faq' },
];

export const UI_CUSTOM = {
  shine_color: ['#5b0fff', '#3c57ef', '#3b76ff', '#3b24c1', '#d2e2ff'],
  shimmer_btn: {
    shimmerColor: '#fcfaff',
    shimmerSize: '0.15em',
    shimmerDuration: '3s',
    borderRadius: '100px',
    background: '#4f39f6',
  },
  aurora_text: {
    color: ['#5b0fff', '#3c57ef', '#3b76ff', '#3b24c1', '#d2e2ff'],
  },
};
