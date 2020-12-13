import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// Components
import { HomePageComponent } from './home-page/home-page.component';
import { MainLoginComponent } from './login/main-login.component';

const routes: Routes = [
  // Home Page: main menu
  { path: 'home', component: HomePageComponent, pathMatch: 'full' },

  // Main Login: login page
  { path: '', component: MainLoginComponent },

  // otherwise redirect to Main Page
  { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
