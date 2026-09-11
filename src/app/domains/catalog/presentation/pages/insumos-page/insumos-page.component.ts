import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { InsumosNavComponent } from '../../components/insumos-nav/insumos-nav.component';
import { InsumosCtaComponent } from '../../components/insumos-cta/insumos-cta.component';
import { ScrollWaveComponent } from '../../../../../shared/ui/scroll-wave/scroll-wave.component';
import { INSPIRA_MENU, MARCAS_DESTACADAS } from '../../insumos.data';
import { SeoService } from '../../../../../shared/kernel/services/seo.service';

@Component({
  selector: 'app-insumos-page',
  standalone: true,
  imports: [RouterLink, InsumosNavComponent, InsumosCtaComponent, ScrollWaveComponent],
  templateUrl: './insumos-page.component.html',
  styleUrls: ['../../insumos-theme.scss', './insumos-page.component.scss']
})
export class InsumosPageComponent implements OnInit {
  private seo = inject(SeoService);

  ngOnInit() {
    this.seo.set({
      title: "Insumos Para Cafeterías - Café, Bases, Polvos, Jarabes, Salsas, Concentrados",
      description: "Insumos Para Cafeterías como café, bases, polvos, jarabes, salsas, concentrados, tés, tisanas, chai, popotes, popping, perlas explosivas, jaleas y más.",
      keywords: "Insumos Para Cafeterías, café, bases, polvos, jarabes, salsas, concentrados, tés, tisanas, chai, popping, perlas explosivas"
    });
  }

  brands = MARCAS_DESTACADAS;
  menu = INSPIRA_MENU;
}
