import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountComponent } from './components/account/account.component';
import { CartComponent } from './components/cart/cart.component';
import { CreateOfferComponent } from './components/create-offer/create-offer.component';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { MessagesComponent } from './components/messages/messages.component';
import { RegisterComponent } from './components/register/register/register.component';
import { SearchComponent } from './components/search/search.component';
import { OwnOffersComponent } from './components/own-offers/own-offers.component';
import { AuthGuard } from './services/authentication/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent }, 
  { path: 'home', component: HomeComponent }, 
  { path: 'cart', component: CartComponent, canActivate: [AuthGuard] }, 
  { path: 'search', component: SearchComponent }, 
  { path: 'messages', component: MessagesComponent, canActivate: [AuthGuard] }, 
  { path: 'favorites', component: FavoritesComponent, canActivate: [AuthGuard] }, 
  { path: 'account', component: AccountComponent, canActivate: [AuthGuard] }, 
  { path: 'createOffer', component: CreateOfferComponent, canActivate: [AuthGuard] },
  { path: 'register', component: RegisterComponent },
  { path: 'ownOffers', component: OwnOffersComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
