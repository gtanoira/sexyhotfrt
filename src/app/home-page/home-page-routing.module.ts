import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from '../core/auth-guard.service';
// Components
import { ImportBatchsComponent } from '../import-batchs/import-batchs.component';
import { HomePageComponent } from './home-page.component';

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
    canActivate: [ AuthGuardService ],
    children: [
      {
        path: 'grids',
        component: ImportBatchsComponent,
        canActivate: [ AuthGuardService ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule { }
