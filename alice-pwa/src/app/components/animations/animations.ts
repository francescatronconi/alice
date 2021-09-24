import {
    animation, trigger, animateChild, group,
    transition, animate, style, query, stagger,
  } from '@angular/animations';
  
export const fallInAppear = animation([
    query('.fall-in-item', [
        style({opacity: 0, transform: 'translateY(-100px)'}),
        stagger('50ms', [
            animate('200ms', style({opacity: 1, transform: 'none'}))
        ])
    ]),
]);

export const shineForward = animation([
    query('.shine-forward', [
        style({transform: 'scale(0.7) rotate(0deg)'}),
        animate('12s', style({transform: 'scale(1) rotate(120deg)'})),
        animate('12s', style({transform: 'scale(0.7) rotate(240deg)'})),
        animate('12s', style({transform: 'scale(0) rotate(360deg)'})),
    ]),
]);

export const shineBackward = animation([
    query('.shine-backward', [
        style({transform: 'scale(1) rotate(0deg)'}),
        animate('12s', style({transform: 'scale(0.7) rotate(-120deg)'})),
        animate('12s', style({transform: 'scale(1) rotate(-240deg)'})),
        animate('12s', style({transform: 'scale(0) rotate(-360deg)'})),
    ]),
]);

export const fadeOut = animation([
    query('.fadeOut', [
        style({opacity: 0}),
        animate('1s', style({opacity: 1})),
    ]),
]);

