import { Injectable, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { SITE_ORIGIN, siteAssetUrl, siteUrl } from '../config/site-url';

export interface SeoUrlContext {
  /** Canonical site origin (environment.siteOrigin), e.g. https://cafeetrusca.com */
  origin: string;
  /** Absolute canonical URL for this route (always with trailing slash) */
  url: string;
}

export interface SeoInput {
  title: string;
  description: string;
  keywords?: string;
  /** Absolute URL or site-relative path. Falls back to brand OG image. */
  image?: string;
  /** schema.org JSON-LD, or a factory that receives the canonical origin/url */
  jsonLd?:
    | Record<string, unknown>
    | Record<string, unknown>[]
    | ((ctx: SeoUrlContext) => Record<string, unknown> | Record<string, unknown>[]);
  ogType?: string;
  /** Optional site path to use as canonical instead of the current router URL. */
  path?: string;
  /** robots meta (default index,follow). Never combine noindex with a canonical to another URL. */
  robots?: string;
}

@Injectable({ providedIn: 'root' })
export class SeoService {
  private title = inject(Title);
  private meta = inject(Meta);
  private document = inject(DOCUMENT);
  private router = inject(Router);

  /** Default social share image (landscape hero on CDN). */
  private readonly defaultImage =
    '/assets/images/home/banners/banner_home_la_fenice.webp';

  /**
   * Canonical origin. Deliberately NOT the request/window host: prerender runs on
   * 127.0.0.1:<port> and the dev site runs on desarrollo.cafeetrusca.com, and neither
   * must ever appear in canonical / og:url / JSON-LD.
   */
  resolveOrigin(): string {
    return SITE_ORIGIN;
  }

  /** Absolute canonical URL (with trailing slash) for a path or the current route. */
  canonicalUrl(path?: string): string {
    return siteUrl(path ?? this.router.url);
  }

  set(input: SeoInput) {
    const origin = this.resolveOrigin();
    const url = this.canonicalUrl(input.path);
    const image = siteAssetUrl(input.image || this.defaultImage);

    this.title.setTitle(input.title);
    this.meta.updateTag({ name: 'description', content: input.description });
    if (input.keywords) {
      this.meta.updateTag({ name: 'keywords', content: input.keywords });
    }
    // Dev/staging hosts are blocked with X-Robots-Tag + robots.txt at server/hosting level
    // (see src/server.ts and deploy/iis/web.config); the HTML stays identical for production.
    this.meta.updateTag({ name: 'robots', content: input.robots || 'index,follow' });
    this.meta.updateTag({ name: 'author', content: 'Café Etrusca' });
    this.meta.updateTag({ name: 'language', content: 'es' });

    this.meta.updateTag({ property: 'og:title', content: input.title });
    this.meta.updateTag({ property: 'og:description', content: input.description });
    this.meta.updateTag({ property: 'og:type', content: input.ogType || 'website' });
    this.meta.updateTag({ property: 'og:url', content: url });
    this.meta.updateTag({ property: 'og:site_name', content: 'Café Etrusca' });
    this.meta.updateTag({ property: 'og:locale', content: 'es_MX' });
    this.meta.updateTag({ property: 'og:image', content: image });
    this.meta.updateTag({ property: 'og:image:alt', content: 'Café Etrusca' });

    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: input.title });
    this.meta.updateTag({ name: 'twitter:description', content: input.description });
    this.meta.updateTag({ name: 'twitter:image', content: image });

    this.setCanonical(url);

    if (input.jsonLd) {
      const data = typeof input.jsonLd === 'function' ? input.jsonLd({ origin, url }) : input.jsonLd;
      this.setJsonLd('app-jsonld', data);
    }
  }

  /** Update the robots meta after the page data arrives (e.g. course × sede pages without dates). */
  setRobots(content: string) {
    this.meta.updateTag({ name: 'robots', content });
  }

  /** Canonical + og:url to another primary URL (site path or absolute). */
  setCanonicalPath(path: string) {
    const url = /^https?:/.test(path) ? path : this.canonicalUrl(path);
    this.setCanonical(url);
    this.meta.updateTag({ property: 'og:url', content: url });
  }

  setCanonical(url: string) {
    let canonical = this.document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = this.document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      this.document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', url);
  }

  setJsonLd(id: string, data: Record<string, unknown> | Record<string, unknown>[]) {
    this.document.getElementById(id)?.remove();
    const el = this.document.createElement('script');
    el.type = 'application/ld+json';
    el.id = id;
    el.text = JSON.stringify(data);
    this.document.head.appendChild(el);
  }

  clearJsonLd(id: string) {
    this.document.getElementById(id)?.remove();
  }
}
