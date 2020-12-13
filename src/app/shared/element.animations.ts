import { animate, state, style, transition, trigger } from '@angular/animations';

export function fade() {
  return trigger('fade', [
    state('void', style({ opacity: 0 })),
    transition(':enter, :leave', [
      animate('160ms')
    ])
  ]);
}
