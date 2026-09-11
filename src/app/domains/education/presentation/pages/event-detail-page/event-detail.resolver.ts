import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { EventService } from '../../../../../shared/kernel/services/event.service';

export const eventBySlugResolver: ResolveFn<any | null> = (route) => {
  return inject(EventService).getBySlug(route.paramMap.get('slug') || '');
};
