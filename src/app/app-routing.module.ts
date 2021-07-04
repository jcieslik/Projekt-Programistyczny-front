import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountComponent } from './components/account/account.component';
import { CartComponent } from './components/cart/cart.component';
import { CreateOfferComponent } from './components/create-offer/create-offer.component';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { MessagesComponent } from './components/messages/messages.component';
import { RegisterComponent } from './components/register/register.component';
import { SearchComponent } from './components/search/search.component';
import { AuthGuard } from './services/authentication/auth.guard';
import { OfferComponent } from './components/offer/offer.component';
import { YourOffersComponent } from './components/your-offers/your-offers.component';
import { UserOffersComponent } from './components/user-offers/user-offers.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent }, 
  { path: 'home', component: HomeComponent }, 
  { path: 'cart', component: CartComponent, canActivate: [AuthGuard] }, 
  { path: 'search', component: SearchComponent }, 
  { path: 'messages', component: MessagesComponent, canActivate: [AuthGuard] }, 
  { path: 'messages/:id', component: MessagesComponent, canActivate: [AuthGuard] }, 
  { path: 'favorites', component: FavoritesComponent, canActivate: [AuthGuard] }, 
  { path: 'account', component: AccountComponent, canActivate: [AuthGuard] }, 
  { path: 'createOffer', component: CreateOfferComponent, canActivate: [AuthGuard] },
  { path: 'register', component: RegisterComponent },
  { path: 'userOffers/:id', component: UserOffersComponent },
  { path: 'userProfile/:id', component: UserProfileComponent },
  { path: 'yourOffers', component: YourOffersComponent, canActivate: [AuthGuard] },
  { path: 'offer/:id', component: OfferComponent },
  { path: 'checkout/:id', component: CheckoutComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
