import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';
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
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
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
import { MatGridListModule } from '@angular/material/grid-list';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { NgxStripeModule } from 'ngx-stripe';
import {LayoutModule} from '@angular/cdk/layout';
import { FilterbarComponent } from './components/filterbar/filterbar.component';
import { DialogCategoryComponent } from './dialogs/dialog-category/dialog-category.component';
import { NgxMatDatetimePickerModule, NgxMatNativeDateModule, NgxMatTimepickerModule } from '@angular-material-components/datetime-picker';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { ChangeUserInfoComponent } from './components/change-user-info/change-user-info.component';

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
    UserOffersComponent,
    CheckoutComponent,
    FilterbarComponent,
    DialogCategoryComponent,
    UserProfileComponent,
    ChangeUserInfoComponent
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
    MatTabsModule,
    MatSelectModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FormsModule,
    NgxSpinnerModule,
    MatPaginatorModule,
    MatTableModule,
    MatDialogModule,
    NgxGalleryModule,
    MatGridListModule,
    MatCheckboxModule,
    MatStepperModule,
    LayoutModule,
    NgxStripeModule.forRoot('pk_test_51J6t0pFBQwYWjNW6VzVlX04L3de14TnSCfJgW3fTMGKytO4Ou0eSV6rSlZCJNvzXTq3Sc8Pw02udihz0uhma9xNZ00QeIQpbiQ'),
    MatDatepickerModule,
    NgxMatTimepickerModule,
    NgxMatDatetimePickerModule,
    MatNativeDateModule,
    NgxMatNativeDateModule,
    MatStepperModule,
    MatRadioModule,
    MatDividerModule,
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
