import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountComponent } from './components/account/account.component';
import { CartComponent } from './components/cart/cart.component';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { MessagesComponent } from './components/messages/messages.component';
import { SearchComponent } from './components/search/search.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent }, 
  { path: 'home', component: HomeComponent }, 
  { path: 'cart', component: CartComponent }, 
  { path: 'search', component: SearchComponent }, 
  { path: 'messages', component: MessagesComponent }, 
  { path: 'favorites', component: FavoritesComponent }, 
  { path: 'account', component: AccountComponent }, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
