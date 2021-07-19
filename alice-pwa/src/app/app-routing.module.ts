import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CheckInComponent } from './components/pages/check-in/check-in.component';
import { DiarioComponent } from './components/pages/diario/diario.component';
import { MappaComponent } from './components/pages/mappa/mappa.component';
import { BadgeComponent } from './components/pages/badge/badge.component';
import { TellStoryComponent } from './components/pages/tell-story/tell-story.component';
import { SvgMapComponent } from './components/pages/svg-map/svg-map.component';
import { PartitaComponent } from './components/pages/partita/partita.component';
import { QrCodePopupComponent } from './components/pages/qr-code-popup/qr-code-popup.component';
import { BadgeMapComponent } from './components/pages/badge-map/badge-map.component';


const routes: Routes = [
  {path: '', component: CheckInComponent},
  {path: 'diario', component: DiarioComponent},
  {path: 'mappa', component: MappaComponent},
  {path: 'map/:id', component: SvgMapComponent},
  //{path: 'biblioteca', component: SvgMapComponent},
  {path: 'badge', component: BadgeComponent},
  {path: 'badgemap', component: BadgeMapComponent},
  {path: 'qrcode', component: QrCodePopupComponent},
  {path: 'partita', component: PartitaComponent},
  {path: ':key/story', component: TellStoryComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
