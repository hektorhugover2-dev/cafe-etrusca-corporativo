import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { DOCUMENT, NgClass } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { SeoService } from '../../../../../shared/kernel/services/seo.service';
import { ScrollWaveComponent } from '../../../../../shared/ui/scroll-wave/scroll-wave.component';
import { Recipe, recipeBySlug, relatedRecipes } from './recetas.data';
import { ASSETS_BASE_URL, absoluteAssetUrl } from '../../../../../shared/kernel/config/assets-url';

@Component({
  selector: 'app-recipe-detail-page',
  standalone: true,
  imports: [NgClass, RouterLink, ScrollWaveComponent],
  templateUrl: './recipe-detail-page.component.html',
  styleUrl: './recipe-detail-page.component.scss'
})
export class RecipeDetailPageComponent implements OnInit, OnDestroy {
  /** Base de imágenes/videos (CDN R2 o /assets local). Ver assets-url.ts */
  protected readonly assetsBase = ASSETS_BASE_URL;
  private seo = inject(SeoService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private document = inject(DOCUMENT);
  private sanitizer = inject(DomSanitizer);

  recipe: Recipe | null = null;
  related: Recipe[] = [];
  checked: Record<number, boolean> = {};

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const found = recipeBySlug(params.get('slug'));
      if (!found || !found.published) {
        this.router.navigate(['/recetas']);
        return;
      }
      this.recipe = found;
      this.checked = {};
      this.related = relatedRecipes(found.slug, 6);
      this.applySeo(found);
      this.scrollToTop();
    });
  }


  private scrollToTop() {
    const view = this.document.defaultView;
    // Prerender/SSR window has no scrollTo (was logging TypeError for every recipe at build).
    if (!view || typeof view.scrollTo !== 'function') return;
    view.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }

  ngOnDestroy() {
    this.document.getElementById('recipe-jsonld')?.remove();
  }

  toggleIngredient(i: number) {
    this.checked[i] = !this.checked[i];
  }

  get featuredRelated(): Recipe[] {
    return this.related.slice(0, 3);
  }

  stepNum(i: number): string {
    return String(i + 1).padStart(2, '0');
  }

  brandHtml(text: string): string {
    return text.replace(/ChillOut/g, '<b class="co-brand">ChillOut</b>');
  }

  /** URL del iframe de YouTube (sanitizada) para recetas con video. */
  videoEmbed(id: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube-nocookie.com/embed/' + encodeURIComponent(id));
  }

  displayTitle(recipe: Recipe): string {
    return [recipe.title, recipe.titleAccent].filter(Boolean).join(' ');
  }

  private applySeo(recipe: Recipe) {
    const pack = recipe.seo || {
      title: this.displayTitle(recipe) + ' | Caf\u00e9 Etrusca',
      description: recipe.summary,
      keywords: recipe.category + ', receta, Caf\u00e9 Etrusca, ChillOut'
    };
    const imagePath = recipe.banner || recipe.image || '';
    this.seo.set({
      title: pack.title,
      description: pack.description,
      keywords: pack.keywords,
      image: imagePath || undefined,
      ogType: 'article',
      jsonLd: ({ origin, url }) => {
        const data = this.buildRecipeJsonLd(recipe, origin, url);
        if (!recipe.breadcrumbJsonLd) return data;
        const { ['@context']: _ctx, ...node } = data;
        return {
          '@context': 'https://schema.org',
          '@graph': [
            node,
            {
              '@type': 'BreadcrumbList',
              itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Inicio', item: origin + '/' },
                { '@type': 'ListItem', position: 2, name: 'Recetas', item: origin + '/recetas/' },
                { '@type': 'ListItem', position: 3, name: this.displayTitle(recipe), item: url }
              ]
            }
          ]
        };
      }
    });
  }

  private buildRecipeJsonLd(recipe: Recipe, origin: string, url: string) {
    const abs = (path?: string) => {
      if (!path) return '';
      return path.startsWith('http') ? path : origin + path;
    };
    const images = [recipe.banner, recipe.image].filter(Boolean).map((p) => abs(p as string));
    const prep = (() => {
      const m = String(recipe.time || '').match(/(\d+)\s*min/i);
      return m ? 'PT' + m[1] + 'M' : 'PT5M';
    })();
    return {
      '@context': 'https://schema.org',
      '@type': 'Recipe',
      '@id': url + '#recipe',
      name: this.displayTitle(recipe),
      image: images.length ? images : undefined,
      description: recipe.summary,
      keywords: recipe.seo?.keywords || recipe.category,
      author: {
        '@type': 'Organization',
        name: 'Caf\u00e9 Etrusca',
        url: origin + '/'
      },
      publisher: {
        '@type': 'Organization',
        name: 'Caf\u00e9 Etrusca',
        logo: {
          '@type': 'ImageObject',
          url: absoluteAssetUrl('images/logo-etrusca.webp')
        }
      },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': url
      },
      datePublished: recipe.datePublished || '2026-01-01',
      video: recipe.video
        ? {
            '@type': 'VideoObject',
            name: recipe.video.name,
            description: recipe.summary,
            embedUrl: 'https://www.youtube.com/embed/' + recipe.video.youtubeId,
            contentUrl: 'https://www.youtube.com/watch?v=' + recipe.video.youtubeId,
            thumbnailUrl: recipe.video.thumbnailUrl,
            uploadDate: recipe.video.uploadDate
          }
        : undefined,
      prepTime: prep,
      cookTime: 'PT0M',
      totalTime: prep,
      recipeYield: recipe.yield || '1 porci\u00f3n',
      recipeCategory: recipe.category || 'Bebida',
      recipeCuisine: 'Mexicana',
      recipeIngredient: recipe.ingredients || [],
      recipeInstructions: (recipe.steps || []).map((step, i) => ({
        '@type': 'HowToStep',
        position: i + 1,
        name: step.title,
        text: step.text,
        url: url + '#step-' + (i + 1),
        image: step.icon ? abs(step.icon) : undefined
      })),
      tool: (recipe.tools || []).map((name) => ({
        '@type': 'HowToTool',
        name
      }))
    };
  }

  private setJsonLd(recipe: Recipe) {
    // Kept for route changes: SeoService.set already writes app-jsonld.
    // Also keep legacy id cleared so old tags do not linger.
    this.document.getElementById('recipe-jsonld')?.remove();
  }
}
