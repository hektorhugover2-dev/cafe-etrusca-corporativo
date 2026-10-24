import { Component, OnInit, inject } from '@angular/core';
import { InsumosCtaComponent } from '../../components/insumos-cta/insumos-cta.component';
import { ScrollWaveComponent } from '../../../../../shared/ui/scroll-wave/scroll-wave.component';
import { GrinderSliderComponent } from '../../components/grinder-slider/grinder-slider.component';
import { MAQ_NAV, MAQ_SECTIONS, MaqSection } from '../../maquinas.data';
import { GRINDER_BRANDS, GrinderBrand, sliderFromBlock } from '../../grinders.data';
import { SeoService } from '../../../../../shared/kernel/services/seo.service';
import { ASSETS_BASE_URL } from '../../../../../../../shared/kernel/config/assets-url';

@Component({
  selector: 'app-maquinas-page',
  standalone: true,
  imports: [InsumosCtaComponent, ScrollWaveComponent, GrinderSliderComponent],
  templateUrl: './maquinas-page.component.html',
  styleUrls: ['../../insumos-theme.scss', './maquinas-page.component.scss']
})
export class MaquinasPageComponent implements OnInit {
  /** Base de imágenes/videos (CDN R2 o /assets local). Ver assets-url.ts */
  protected readonly assetsBase = ASSETS_BASE_URL;
  private seo = inject(SeoService);

  nav = MAQ_NAV;
  sections = MAQ_SECTIONS;
  slidersBySection: Record<string, GrinderBrand[]> = Object.fromEntries(
    MAQ_SECTIONS.map((sec) => [
      sec.id,
      sec.id === 'molinos' ? GRINDER_BRANDS : sec.blocks.map(sliderFromBlock)
    ])
  );

  slidersOf(sec: MaqSection): GrinderBrand[] {
    return this.slidersBySection[sec.id] || [];
  }

  ngOnInit() {
    this.seo.set({
      title: 'Maquina y Equipo para poner una cafetería - Encuentra todo lo que necesitas',
      description: 'Maquina y Equipo para poner una cafetería: En Etrusca encontrarás todo lo que necesitas para poner, renovar o innovar en tu negocio de cafetería',
      keywords: 'Maquina y Equipo para poner una cafetería, cafeteria,como iniciar una cafeteria,como poner una cafeteria,maquinas de espresso,molinos,licuadoras,tostadores',
      image: `${ASSETS_BASE_URL}/images/maquinas/hero.webp`,
    });
  }
}