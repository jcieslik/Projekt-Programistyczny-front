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
import { AuthGuard } from './services/authentication/auth.guard';
import { OfferComponent } from './components/offer/offer.component';
import { UserOffersComponent } from './components/user-offers/user-offers.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { ChangeUserInfoComponent } from './components/change-user-info/change-user-info.component';
import { UserRole } from './enums/user-role';
import { NoPermissionComponent } from './components/no-permission/no-permission.component';
import { SearchComponent } from './components/search/search.component';
import { UsersComponent } from './components/users/users.component';
import { AdminOffersComponent } from './components/admin-offers/admin-offers.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  {
    path: 'cart', component: CartComponent, canActivate: [AuthGuard],
    data: {
      userRoles: [UserRole.Customer]
    }
  },
  { path: 'search', component: SearchComponent, },
  {
    path: 'messages', component: MessagesComponent, canActivate: [AuthGuard],
    data: {
      userRoles: [UserRole.Customer, UserRole.Admin]
    }
  },
  {
    path: 'messages/:id', component: MessagesComponent, canActivate: [AuthGuard],
    data: {
      userRoles: [UserRole.Customer, UserRole.Admin]
    }
  },
  {
    path: 'favorites', component: FavoritesComponent, canActivate: [AuthGuard],
    data: {
      userRoles: [UserRole.Customer]
    }
  },
  {
    path: 'account', component: AccountComponent, canActivate: [AuthGuard],
    data: {
      userRoles: [UserRole.Customer]
    }
  },
  {
    path: 'changeUserInfo', component: ChangeUserInfoComponent, canActivate: [AuthGuard],
    data: {
      userRoles: [UserRole.Customer]
    }
  },
  {
    path: 'createOffer', component: CreateOfferComponent, canActivate: [AuthGuard],
    data: {
      userRoles: [UserRole.Customer]
    }
  },
  { path: 'register', component: RegisterComponent },
  { path: 'userOffers/:id', component: UserOffersComponent },
  { path: 'userProfile/:id', component: UserProfileComponent },
  { path: 'offer/:id', component: OfferComponent },
  {
    path: 'checkout', component: CheckoutComponent, canActivate: [AuthGuard],
    data: {
      userRoles: [UserRole.Customer]
    }
  },
  {
    path: 'users', component: UsersComponent, canActivate: [AuthGuard],
    data: {
      userRoles: [UserRole.Admin]
    }
  },
  { path: 'noPermission', component: NoPermissionComponent },
  {
    path: 'adminOffers', component: AdminOffersComponent, canActivate: [AuthGuard],
    data: {
      userRoles: [UserRole.Admin]
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
