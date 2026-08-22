import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { InsumosNavComponent } from '../../components/insumos-nav/insumos-nav.component';
import { InsumosCtaComponent } from '../../components/insumos-cta/insumos-cta.component';
import { INSPIRA_MENU, MARCAS_DESTACADAS } from '../../insumos.data';

@Component({
  selector: 'app-insumos-page',
  standalone: true,
  imports: [RouterLink, InsumosNavComponent, InsumosCtaComponent],
  templateUrl: './insumos-page.component.html',
  styleUrls: ['../../insumos-theme.scss', './insumos-page.component.scss']
})
export class InsumosPageComponent {
  brands = MARCAS_DESTACADAS;
  menu = INSPIRA_MENU;
}
