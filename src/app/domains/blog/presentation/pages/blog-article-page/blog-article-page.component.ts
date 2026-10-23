import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { SeoService } from '../../../../../shared/kernel/services/seo.service';
import { absoluteAssetUrl, assetUrl } from '../../../../../shared/kernel/config/assets-url';
import { BlogLinkCtaComponent } from '../../components/blog-link-cta/blog-link-cta.component';
import { BLOG_BY_SLUG, BLOG_DATE_PUBLISHED, BlogArticle, PODCAST_URL, WEBINAR_URL } from './blog-articles.data';

/**
 * Guías /blog/<slug>/ (briefs SEO 20 oct 2026). Sin índice /blog/ y fuera de menú, home y footer.
 * Breadcrumb de todas: Inicio › Recetas y guías (/recetas/) › artículo.
 */
@Component({
  selector: 'app-blog-article-page',
  standalone: true,
  imports: [RouterLink, BlogLinkCtaComponent],
  templateUrl: './blog-article-page.component.html',
  styleUrl: './blog-article-page.component.scss'
})
export class BlogArticlePageComponent {
  readonly webinarUrl = WEBINAR_URL;
  readonly podcastUrl = PODCAST_URL;
  private seo = inject(SeoService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  article: BlogArticle | null = null;
  readonly img = assetUrl;

  constructor() {
    this.route.paramMap.subscribe((params) => {
      const slug = params.get('slug') || '';
      this.article = BLOG_BY_SLUG[slug] ?? null;
      if (!this.article) {
        this.seo.set({ title: 'Guía no encontrada | Café Etrusca', description: 'Esta guía no existe.', robots: 'noindex,follow' });
        return;
      }
      this.applySeo(this.article);
    });
  }

  /** Enlaces internos dentro del HTML de los párrafos: navegación con el router. */
  /** Tarjetas del CTA de recetas con la imagen resuelta (CDN o /assets). */
  cardsOf(cards?: Array<{ name: string; path: string; img: string }>) {
    return (cards || []).map((c) => ({ ...c, img: this.img(c.img) }));
  }

  onContentClick(ev: MouseEvent) {
    const a = (ev.target as HTMLElement | null)?.closest?.('a');
    const href = a?.getAttribute('href') || '';
    if (!a || !href.startsWith('/') || a.target === '_blank' || ev.ctrlKey || ev.metaKey || ev.shiftKey || ev.button !== 0) return;
    ev.preventDefault();
    this.router.navigateByUrl(href);
  }

  private applySeo(a: BlogArticle) {
    const path = `/blog/${a.slug}/`;
    this.seo.set({
      title: a.title,
      description: a.description,
      image: a.hero.src,
      ogType: 'article',
      path,
      jsonLd: ({ origin, url }) => this.jsonLd(a, origin, url)
    });
  }

  private jsonLd(a: BlogArticle, origin: string, url: string): Record<string, unknown> {
    const org = {
      '@type': 'Organization',
      name: 'Café Etrusca',
      url: origin + '/',
      logo: { '@type': 'ImageObject', url: absoluteAssetUrl('images/logo-etrusca.webp') }
    };
    const abs = (p: string) => (/^https?:/.test(p) ? p : origin + p);
    const graph: Record<string, unknown>[] = [
      {
        '@type': 'BlogPosting',
        '@id': url + '#article',
        headline: a.h1,
        description: a.description,
        inLanguage: 'es-MX',
        mainEntityOfPage: url,
        url,
        image: [absoluteAssetUrl(a.hero.src)],
        datePublished: BLOG_DATE_PUBLISHED,
        dateModified: BLOG_DATE_PUBLISHED,
        author: org,
        publisher: org
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Inicio', item: origin + '/' },
          { '@type': 'ListItem', position: 2, name: 'Recetas y guías', item: origin + '/recetas/' },
          { '@type': 'ListItem', position: 3, name: a.h1, item: url }
        ]
      }
    ];
    const faqs = a.faq.filter((f) => !f.pending);
    if (faqs.length) {
      graph.push({
        '@type': 'FAQPage',
        mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } }))
      });
    }
    if (a.itemList) {
      graph.push({
        '@type': 'ItemList',
        name: a.itemList.name,
        itemListElement: a.itemList.items.map((it, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: it.name,
          ...(it.path ? { url: abs(it.path) } : {})
        }))
      });
    }
    if (a.howTo) {
      graph.push({
        '@type': 'HowTo',
        name: a.howTo.name,
        image: absoluteAssetUrl(a.hero.src),
        step: a.howTo.steps.map((s, i) => ({
          '@type': 'HowToStep',
          position: i + 1,
          name: s.name,
          text: s.text || s.name,
          ...(s.id ? { url: url + '#' + s.id } : {})
        }))
      });
    }
    return { '@context': 'https://schema.org', '@graph': graph };
  }
}
