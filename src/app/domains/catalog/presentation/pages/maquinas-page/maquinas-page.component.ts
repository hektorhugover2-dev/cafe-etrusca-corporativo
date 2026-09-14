import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Subscription } from 'rxjs';
import { InsumosCtaComponent } from '../../components/insumos-cta/insumos-cta.component';
import { ScrollWaveComponent } from '../../../../../shared/ui/scroll-wave/scroll-wave.component';
import { GrinderSliderComponent } from '../../components/grinder-slider/grinder-slider.component';
import { MAQ_HUB, MAQ_NAV, MAQ_SECTIONS, MaqSection, findMaqNav } from '../../maquinas.data';
import { GRINDER_BRANDS, GrinderBrand, sliderFromBlock } from '../../grinders.data';
import { SeoService } from '../../../../../shared/kernel/services/seo.service';

@Component({
  selector: 'app-maquinas-page',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, InsumosCtaComponent, ScrollWaveComponent, GrinderSliderComponent],
  templateUrl: './maquinas-page.component.html',
  styleUrls: ['../../insumos-theme.scss', '../../jarabes-theme.scss', './maquinas-page.component.scss']
})
export class MaquinasPageComponent implements OnInit, OnDestroy {
  private seo = inject(SeoService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private sub?: Subscription;

  nav = MAQ_NAV;
  hub = MAQ_HUB;
  sections: MaqSection[] = MAQ_SECTIONS;
  slug: string | null = null;
  heroTitle = 'MÁQUINAS';
  heroLead = 'Rendimiento y tecnología para tu operación';
  heroBody =
    'Máquina y equipo para poner, renovar o innovar tu cafetería. Cada equipo se eligió por calidad, desempeño y durabilidad: te asesoramos, instalamos y damos servicio para alargar su vida útil.';

  slidersBySection: Record<string, GrinderBrand[]> = Object.fromEntries(
    MAQ_SECTIONS.map((sec) => [
      sec.id,
      sec.id === 'molinos' ? GRINDER_BRANDS : sec.blocks.map(sliderFromBlock)
    ])
  );

  slidersOf(sec: MaqSection): GrinderBrand[] {
    return this.slidersBySection[sec.id] || [];
  }

  waveOf(sec: MaqSection): string {
    const list = this.slidersOf(sec);
    return list[list.length - 1]?.bg || '#f4eee4';
  }

  firstOf(sec: MaqSection): GrinderBrand | null {
    return this.slidersOf(sec)[0] || null;
  }

  waveTopOf(sec: MaqSection): string {
    return this.firstOf(sec)?.bg || '#f4eee4';
  }

  get firstBrand(): GrinderBrand | null {
    for (const sec of this.sections) {
      const list = this.slidersOf(sec);
      if (list.length) return list[0];
    }
    return null;
  }

  get heroColor(): string {
    return '#f4eee4';
  }

  get heroAccent(): string {
    return this.firstBrand?.leadColor || '#c45c4a';
  }

  ngOnInit() {
    this.sub = this.route.paramMap.subscribe((params) => this.applySlug(params.get('slug')));
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }

  private applySlug(slug: string | null) {
    this.slug = slug;
    if (!slug) {
      this.sections = MAQ_SECTIONS;
      this.heroTitle = 'MÁQUINAS';
      this.heroLead = 'Rendimiento y tecnología para tu operación';
      this.heroBody =
        'Máquina y equipo para poner, renovar o innovar tu cafetería. Cada equipo se eligió por calidad, desempeño y durabilidad: te asesoramos, instalamos y damos servicio para alargar su vida útil.';
      this.seo.set({
        title: 'Maquina y Equipo para poner una cafetería - Encuentra todo lo que necesitas',
        description:
          'Maquina y Equipo para poner una cafetería: En Etrusca encontrarás todo lo que necesitas para poner, renovar o innovar en tu negocio de cafetería',
        keywords:
          'Maquina y Equipo para poner una cafetería, cafeteria,como iniciar una cafeteria,como poner una cafeteria,maquinas de espresso,molinos,licuadoras,tostadores',
        image: '/assets/images/maquinas/hero.webp',
        canonical: 'https://cafeetrusca.com/maquinaria-y-equipo-para-cafeterias',
        ogType: 'website',
        jsonLd: ({ origin, url }) => [
          {
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            '@id': url + '#maquinas',
            name: 'Máquina y equipo para cafeterías',
            description:
              'Máquina y equipo para poner, renovar o innovar tu cafetería: espresso, autoservicio, licuadoras, molinos y tostadores.',
            url,
            isPartOf: { '@id': origin + '/#website' }
          }
        ]
      });
      return;
    }

    const item = findMaqNav(slug);
    const sec = MAQ_SECTIONS.find((s) => s.id === slug);
    if (!item || !sec) {
      this.router.navigateByUrl(MAQ_HUB);
      return;
    }

    this.sections = [sec];
    this.heroTitle = sec.title;
    this.heroLead = item.desc;
    this.heroBody = sec.intro;
    this.seo.set({
      title: item.seoTitle,
      description: item.seoDescription,
      keywords: item.seoKeywords,
      image: '/assets/images/maquinas/hero.webp',
      canonical: 'https://cafeetrusca.com' + item.link,
      ogType: 'website',
      jsonLd: ({ origin, url }) => [
        {
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          '@id': url + '#' + item.id,
          name: item.seoTitle,
          description: item.seoDescription,
          url,
          isPartOf: { '@id': origin + '/#website' },
          about: { '@type': 'Thing', name: item.label }
        }
      ]
    });
  }
}