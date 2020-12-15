import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// Components
import { ImportBatchsComponent } from '../import-batchs/import-batchs.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'grids',
        component: ImportBatchsComponent,
        outlet: 'home-page'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule { }
