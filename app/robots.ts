import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/site';

/**
 * Answer engines each run their own crawler. The wildcard rule already
 * lets them in; naming them makes the intent explicit and survives a
 * future edit that tightens the wildcard. Nothing here blocks a bot.
 */
const AI_CRAWLERS = [
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'ClaudeBot',
  'anthropic-ai',
  'PerplexityBot',
  'Perplexity-User',
  'Google-Extended',
  'Applebot',
  'Applebot-Extended',
  'Bingbot',
  'CCBot',
  'DuckAssistBot',
  'meta-externalagent',
];

export default function robots(): MetadataRoute.Robots {
  // The CMS and its API are useless to crawlers and a needless surface to
  // advertise.
  const disallow = ['/admin', '/admin/', '/api/'];
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow },
      ...AI_CRAWLERS.map((userAgent) => ({ userAgent, allow: '/', disallow })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
