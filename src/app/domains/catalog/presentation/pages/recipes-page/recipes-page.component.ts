import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../../../../shared/kernel/services/seo.service';
import { ScrollWaveComponent } from '../../../../../shared/ui/scroll-wave/scroll-wave.component';
import { Recipe, publishedRecipes, recipesByCollection } from './recetas.data';

@Component({
  selector: 'app-recipes-page',
  standalone: true,
  imports: [RouterLink, ScrollWaveComponent],
  templateUrl: './recipes-page.component.html',
  styleUrl: './recipes-page.component.scss'
})
export class RecipesPageComponent implements OnInit {
  private seo = inject(SeoService);
  recipes: Recipe[] = publishedRecipes();
  temporada = recipesByCollection('fiestas-patrias-2026');
  verano = recipesByCollection('verano-2026');
  featured =
    this.recipes.find((r) => r.slug === 'mangonada-chillout') ||
    this.recipes[0];

  ngOnInit() {
    const brand = 'Caf\u00e9 Etrusca';
    this.seo.set({
      title: 'Recetas para cafeter\u00eda | Fiestas Patrias y Verano 2026 | ' + brand,
      description:
        'Recetario ChillOut, Fiestas Patrias y Verano 2026: mangonada, micheladas, cold brew, sodas y m\u00e1s bebidas de barra.',
      keywords:
        'recetas cafeter\u00eda, Fiestas Patrias, Verano 2026, ChillOut, mangonada, cold brew, Caf\u00e9 Etrusca, recetas barista',
      image: '/assets/images/recetas/mangonada-card.webp',
      ogType: 'website',
      jsonLd: ({ origin, url }) => {
        const items = this.recipes.map((r, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          url: origin + '/recetas/' + r.slug,
          name: [r.title, r.titleAccent].filter(Boolean).join(' ')
        }));
        return [
          {
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            '@id': url + '#recipes',
            name: 'Recetas para cafeter\u00eda | ' + brand,
            description:
              'Recetas de bebidas para barra y cafeter\u00eda: ChillOut, temporada y cl\u00e1sicos.',
            url,
            isPartOf: { '@id': origin + '/#website' },
            mainEntity: {
              '@type': 'ItemList',
              itemListElement: items,
              numberOfItems: items.length
            }
          }
        ];
      }
    });
  }

  displayTitle(r: Recipe): string {
    return [r.title, r.titleAccent].filter(Boolean).join(' ');
  }
}
