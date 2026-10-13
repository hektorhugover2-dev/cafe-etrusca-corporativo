import { PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RedirectCommand, ResolveFn, Router } from '@angular/router';
import { from, of, switchMap } from 'rxjs';
import { EventService } from '../../../../../shared/kernel/services/event.service';
import { PAST_EVENT_FORM_TARGET, isPastEvent } from '../../event-paths';

/**
 * Event of /cursos-y-talleres/:slug. In the browser, a past or unknown slug (the API only lists
 * upcoming dates) is sent with replaceUrl (no history entry for the dead URL) to its course page
 * (by categoryId + sucursal when the API still returns the event, else parsed from the slug), or to
 * the "solicitar información" form on the cursos page when no course matches (past-event-target.ts,
 * loaded lazily: it pulls the course catalog). Covers in-app navigation, `ng serve` and a page
 * prerendered before its date that is still deployed; on the hosting these URLs already answer the
 * same 301 (deploy/iis/web.config, server.ts). On the server (prerender) it returns null → noindex.
 */
export const eventBySlugResolver: ResolveFn<any | null> = (route) => {
  const router = inject(Router);
  const browser = isPlatformBrowser(inject(PLATFORM_ID));
  const slug = route.paramMap.get('slug') || '';
  return inject(EventService)
    .getBySlug(slug)
    .pipe(
      switchMap((event) => {
        if (event && !isPastEvent(event)) return of(event);
        if (!browser) return of(null);
        return from(
          import('../../past-event-target').then(({ pastEventCoursePath }) => {
            const course = pastEventCoursePath(
              slug,
              Number(event?.categoryId ?? event?.category?.id) || null,
              Number(event?.locationId ?? event?.location?.id) || null
            );
            return new RedirectCommand(router.parseUrl(course || PAST_EVENT_FORM_TARGET), { replaceUrl: true });
          })
        );
      })
    );
};
