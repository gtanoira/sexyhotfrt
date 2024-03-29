import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// Components
import { MainLoginComponent } from './login/main-login.component';

const routes: Routes = [

  /**
   * LAZY LOADING
   */
  // Home Page: main menu
  {
    path: 'home',
    loadChildren: () => import('./home-page/home-page.module').then(m => m.HomePageModule),
    data: { animation: 'homePage' }
  },

  /**
   * NOT LAZY LOADING
   */
  // Main Login: login page
  { path: '', component: MainLoginComponent, pathMatch: 'full', data: { animation: 'mainPage' } },

  // otherwise redirect to Main Page
  { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
