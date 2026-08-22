import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { InsumosNavComponent } from '../../components/insumos-nav/insumos-nav.component';
import { InsumosCtaComponent } from '../../components/insumos-cta/insumos-cta.component';
import {
  InsumosCategory,
  INSPIRA_MENU,
  findCategory
} from '../../insumos.data';

@Component({
  selector: 'app-insumos-category-page',
  standalone: true,
  imports: [RouterLink, InsumosNavComponent, InsumosCtaComponent],
  templateUrl: './insumos-category-page.component.html',
  styleUrls: ['../../insumos-theme.scss']
})
export class InsumosCategoryPageComponent implements OnInit {
  cat: InsumosCategory | null = null;
  menu = INSPIRA_MENU;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const found = findCategory(params.get('slug'));
      if (!found) {
        this.router.navigate(['/productos/insumos']);
        return;
      }
      this.cat = found;
    });
  }

  asCompare(extra: Record<string, unknown> | undefined) {
    return (extra?.['compare'] as Array<Record<string, string>>) ?? [];
  }

  asSeasonal(extra: Record<string, unknown> | undefined) {
    return extra?.['seasonal'] as
      | { title: string; text: string; tag: string; image: string }
      | undefined;
  }

  asSteps(extra: Record<string, unknown> | undefined) {
    return (extra?.['steps'] as Array<{ n: string; title: string; text: string; image: string }>) ?? [];
  }

  asJam(extra: Record<string, unknown> | undefined) {
    return (extra?.['jamTable'] as Array<Record<string, string>>) ?? [];
  }

  asEnjoy(extra: Record<string, unknown> | undefined) {
    return (extra?.['enjoy'] as string[]) ?? [];
  }
}
