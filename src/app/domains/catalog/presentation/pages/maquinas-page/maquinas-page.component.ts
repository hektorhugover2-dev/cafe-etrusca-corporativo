import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { InsumosCtaComponent } from '../../components/insumos-cta/insumos-cta.component';
import { ScrollWaveComponent } from '../../../../../shared/ui/scroll-wave/scroll-wave.component';
import { MAQ_NAV, MAQ_SECTIONS } from '../../maquinas.data';
import { SeoService } from '../../../../../shared/kernel/services/seo.service';

@Component({
  selector: 'app-maquinas-page',
  standalone: true,
  imports: [RouterLink, InsumosCtaComponent, ScrollWaveComponent],
  templateUrl: './maquinas-page.component.html',
  styleUrls: ['../../insumos-theme.scss', './maquinas-page.component.scss']
})
export class MaquinasPageComponent implements OnInit {
  private seo = inject(SeoService);

  nav = MAQ_NAV;
  sections = MAQ_SECTIONS;

  ngOnInit() {
    this.seo.set({
      title: 'Maquina y Equipo para poner una cafetería - Encuentra todo lo que necesitas',
      description: 'Maquina y Equipo para poner una cafetería: En Etrusca encontrarás todo lo que necesitas para poner, renovar o innovar en tu negocio de cafetería',
      keywords: 'Maquina y Equipo para poner una cafetería, cafeteria,como iniciar una cafeteria,como poner una cafeteria,maquinas de espresso,molinos,licuadoras,tostadores',
      image: '/assets/images/maquinas/hero.webp'
    });
  }
}
