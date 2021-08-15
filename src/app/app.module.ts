import { BrowserModule } from '@angular/platform-browser';
import { CommonModule, registerLocaleData } from '@angular/common';
import localePl from '@angular/common/locales/pl';
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
import { MatBadgeModule } from '@angular/material/badge';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
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
import { ConfirmationDialogComponent } from './dialogs/dialog-confirmation/confirmation-dialog.component';
import { CommentsComponent } from './components/comments/comments.component';
import { NoPermissionComponent } from './components/no-permission/no-permission.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatExpansionModule} from '@angular/material/expansion';
import { SummarizeOrderService } from 'src/app/services/summarize-order/summarize-order.service';

import { EnumToArrayPipe } from './pipes/enum-to-array.pipe';
import { MailboxTypeTranslationComponent } from './enum-translations/mailbox-type-translation/mailbox-type-translation.component';
import { NgxEditorModule } from 'ngx-editor';
import { InboxComponent } from './components/messages/inbox/inbox.component';
import { CreateMessageComponent } from './components/messages/create-message/create-message.component';
import { SentComponent } from './components/messages/sent/sent.component';
import { TrashComponent } from './components/messages/trash/trash.component';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { MailboxToolbarComponent } from './components/messages/mailbox-toolbar/mailbox-toolbar.component';
import { DisplayMessageComponent } from './components/messages/display-message/display-message.component';
import { ErrorInterceptor } from './helpers/error.interceptor';
import { OfferTypeTranslationComponent } from './enum-translations/offer-type-translation/offer-type-translation.component';
import { CreateCommentDialogComponent } from './dialogs/create-comment/create-comment-dialog.component';
import { CreateBidComponent } from './dialogs/create-bid/create-bid.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AngularInpostGeowidgetModule } from 'angular-inpost-geowidget';
import { OfferStateTranslationComponent } from './enum-translations/offer-state-translation/offer-state-translation.component';
import { DialogPaymentComponent } from './dialogs/dialog-payment/dialog-payment.component';
import { UserBidsComponent } from './components/user-bids/user-bids.component';

registerLocaleData(localePl);

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
    MailboxTypeTranslationComponent,
    OffersComponent,
    UserOffersComponent,
    CheckoutComponent,
    FilterbarComponent,
    DialogCategoryComponent,
    UserProfileComponent,
    ChangeUserInfoComponent,
    ConfirmationDialogComponent,
    CommentsComponent,
    NoPermissionComponent,
    EnumToArrayPipe,
    InboxComponent,
    CreateMessageComponent,
    SentComponent,
    TrashComponent,
    MailboxToolbarComponent,
    DisplayMessageComponent,
    OfferTypeTranslationComponent,
    CreateCommentDialogComponent,
    CreateBidComponent,
    OfferStateTranslationComponent,
    DialogPaymentComponent,
    UserBidsComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule,
    CheckboxModule,
    AngularInpostGeowidgetModule,
    WavesModule,
    ButtonsModule,
    InputsModule,
    IconsModule,
    CardsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatInputModule,
    MatCardModule,
    MatTooltipModule,
    MatTabsModule,
    MatChipsModule,
    MatBadgeModule,
    MatSelectModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FormsModule,
    NgxSpinnerModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatTableModule,
    MatDialogModule,
    NgxGalleryModule,
    MatGridListModule,
    MatExpansionModule,
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
    NgbModule,
    NgxEditorModule,
    NgxMatSelectSearchModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SpinnerInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true,
    },
    { provide: LOCALE_ID, useValue: "pl" }
    ,
    [SummarizeOrderService]
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
