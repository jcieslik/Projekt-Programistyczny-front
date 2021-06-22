import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MessagesComponent } from './components/messages/messages.component';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { SearchComponent } from './components/search/search.component';
import { CartComponent } from './components/cart/cart.component';
import { HomeComponent } from './components/home/home.component';
import { AccountComponent } from './components/account/account.component';
import { CheckboxModule, WavesModule, ButtonsModule, InputsModule, IconsModule, CardsModule } from 'angular-bootstrap-md'
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule} from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateOfferComponent } from './components/create-offer/create-offer.component';
import { RegisterComponent } from './components/register/register.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SpinnerInterceptor } from './http-interceptors/spinner-interceptor';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { OfferComponent } from './components/offer/offer.component';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';
import { ProductStateTranslationComponent } from './enum-translations/product-state-translation/product-state-translation.component';
import { OrderStatusTranslationComponent } from './enum-translations/order-status-translation/order-status-translation.component';
import { OffersComponent } from './components/offers/offers.component';
import { YourOffersComponent } from './components/your-offers/your-offers.component';
import { UserOffersComponent } from './components/user-offers/user-offers.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    MessagesComponent,
    FavoritesComponent,
    SearchComponent,
    CartComponent,
    HomeComponent,
    AccountComponent,
    CreateOfferComponent,
    RegisterComponent,
    OfferComponent,
    ProductStateTranslationComponent,
    OrderStatusTranslationComponent,
    OffersComponent,
    YourOffersComponent,
    UserOffersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule,
    CheckboxModule,
    WavesModule,
    ButtonsModule,
    InputsModule,
    IconsModule,
    CardsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatSelectModule,
    ReactiveFormsModule, 
    BrowserAnimationsModule,
    FormsModule,
    NgxSpinnerModule,
    MatPaginatorModule,
    MatTableModule, 
    MatDialogModule,
    NgxGalleryModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SpinnerInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
