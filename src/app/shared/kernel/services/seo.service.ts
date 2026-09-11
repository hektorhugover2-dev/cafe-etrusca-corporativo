import { Injectable, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

export interface SeoUrlContext {
  /** Current site origin, e.g. http://127.0.0.1:4200 or https://cafeetrusca.com */
  origin: string;
  /** Absolute canonical URL for this route */
  url: string;
}

export interface SeoInput {
  title: string;
  description: string;
  keywords?: string;
  /** Absolute URL or site-relative path. Falls back to brand OG image. */
  image?: string;
  /** schema.org JSON-LD, or a factory that receives the live origin/url */
  jsonLd?:
    | Record<string, unknown>
    | Record<string, unknown>[]
    | ((ctx: SeoUrlContext) => Record<string, unknown> | Record<string, unknown>[]);
  ogType?: string;
}

@Injectable({ providedIn: 'root' })
export class SeoService {
  private title = inject(Title);
  private meta = inject(Meta);
  private document = inject(DOCUMENT);
  private router = inject(Router);

  /** Default social share image (landscape hero on CDN). */
  private readonly defaultImage =
    'https://cafeetrusca.com/img/1920X1080_BANNER_HOME_LA_FENICE.webp';

  /** Local → 127.0.0.1; elsewhere → the host that is actually serving the app. */
  resolveOrigin(): string {
    const loc = this.document.defaultView?.location || this.document.location;
    const host = (loc?.hostname || '').toLowerCase();
    const port = loc?.port || '';

    if (host === 'localhost' || host === '127.0.0.1') {
      const p = port ? `:${port}` : '';
      return `http://127.0.0.1${p}`;
    }

    if (loc?.origin && loc.origin !== 'null') {
      return loc.origin;
    }

    return 'https://cafeetrusca.com';
  }

  set(input: SeoInput) {
    const origin = this.resolveOrigin();
    const path = this.router.url.split('?')[0] || '/';
    const url = `${origin}${path}`;
    const imagePath = input.image || this.defaultImage;
    const image = imagePath.startsWith('http') ? imagePath : `${origin}${imagePath}`;

    this.title.setTitle(input.title);
    this.meta.updateTag({ name: 'description', content: input.description });
    if (input.keywords) {
      this.meta.updateTag({ name: 'keywords', content: input.keywords });
    }
    this.meta.updateTag({ name: 'robots', content: 'index,follow' });
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

    let canonical = this.document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = this.document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      this.document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', url);

    if (input.jsonLd) {
      const data = typeof input.jsonLd === 'function' ? input.jsonLd({ origin, url }) : input.jsonLd;
      this.setJsonLd('app-jsonld', data);
    }
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
