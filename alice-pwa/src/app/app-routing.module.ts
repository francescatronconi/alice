import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CheckInComponent } from './components/pages/check-in/check-in.component';
import { DiarioComponent } from './components/pages/diario/diario.component';
import { MappaComponent } from './components/pages/mappa/mappa.component';


const routes: Routes = [
  {path: '', component: CheckInComponent},
  {path: 'diario', component: DiarioComponent},
  {path: 'mappa', component: MappaComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
