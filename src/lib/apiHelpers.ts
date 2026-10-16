/**
 * Shared API response helpers with HTTP caching headers.
 *
 * - Public GET endpoints (read by the frontend website) get Cache-Control headers
 *   so the frontend, CDN, and browser can cache them and avoid repeated DB hits.
 * - Mutation responses (POST/PUT/DELETE) always skip caching.
 */

import { NextResponse } from 'next/server';

/** SEO fields extracted from a Page record */
export function buildSeoObject(page: Record<string, any> | null) {
  if (!page) return null;
  return {
    metaTitle: page.metaTitle,
    metaDescription: page.metaDescription,
    targetKeywords: page.targetKeywords,
    canonicalUrl: page.canonicalUrl,
    noIndex: page.noIndex,
    schema: page.schema,
    headingOptions: page.headingOptions,
  };
}

/**
 * Build a NextResponse with Cache-Control for public GET endpoints.
 * maxAge = seconds a fresh response may be used
 * staleWhileRevalidate = seconds stale data can be served while background refetch runs
 */
export function cachedJson(
  data: unknown,
  {
    maxAge = 60,
    staleWhileRevalidate = 300,
  }: { maxAge?: number; staleWhileRevalidate?: number } = {}
): NextResponse {
  const res = NextResponse.json(data);
  res.headers.set(
    'Cache-Control',
    `public, s-maxage=${maxAge}, stale-while-revalidate=${staleWhileRevalidate}`
  );
  return res;
}

/** Response that must NOT be cached (mutations, admin-only data). */
export function noCacheJson(data: unknown, init?: { status?: number }): NextResponse {
  const res = NextResponse.json(data, init);
  res.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate');
  return res;
}

/** Uniform 500 error response – never cached. */
export function errorJson(message = 'Internal Server Error', status = 500): NextResponse {
  return noCacheJson({ success: false, error: message }, { status });
}
