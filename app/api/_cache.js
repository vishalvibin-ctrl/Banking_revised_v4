// Simple in-memory cache shared across API routes
// Updated daily by /api/cron/refresh-news (7am Dubai)
// Persists for the lifetime of the serverless function instance
// Falls back to fallback headlines if empty

let cache = {
  items: [],
  fetchedAt: null,
  source: 'empty',
}

export const newsCache = {
  get: () => cache,
  set: (items, source = 'live') => {
    cache = {
      items,
      fetchedAt: new Date().toISOString(),
      source,
    }
    return cache
  },
  clear: () => {
    cache = { items: [], fetchedAt: null, source: 'empty' }
  },
}
