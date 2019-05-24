import { trigger, animate, transition, style } from '@angular/animations';

export const fadeAnimation =
  trigger('routeState', [
    transition('*<=>*', [
      style({ opacity: 0.1 }),
      animate('.8s', style({ opacity: 1 }))
    ])
  ]);
