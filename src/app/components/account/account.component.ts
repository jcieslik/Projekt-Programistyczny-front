import { Component, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from 'src/app/dialogs/dialog-confirmation/confirmation-dialog.component';
import { OfferState } from 'src/app/enums/offer-state';
import { PaginationProperties } from 'src/app/enums/pagination-properties';
import { Offer } from 'src/app/models/offer';
import { OfferWithBaseData } from 'src/app/models/offer-base-data';
import { PaginatedOffers } from 'src/app/models/paginatedOffers';
import { PaginatedOrders } from 'src/app/models/paginatedOrders';
import { Province } from 'src/app/models/province';
import { SearchModel } from 'src/app/models/searchModel';
import { UpdateUser } from 'src/app/models/updateUser';
import { User } from 'src/app/models/user';
import { UserInfo } from 'src/app/models/user-info';
import { OfferService } from 'src/app/services/offer/offer.service';
import { OrderService } from 'src/app/services/order/order.service';
import { ProvinceService } from 'src/app/services/province/province.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  constructor(private userService: UserService,
    private offerService: OfferService,
    private orderService: OrderService,
    private provinceService: ProvinceService,
    public dialog: MatDialog) { }

  currentUser: User = JSON.parse(localStorage.getItem('user'));

  provinces: Province[];

  editable = false;

  user: UserInfo;

  defaultSort: string = "creation";

  isAlertDisplayed = false;

  error = false;

  selectedProvince: Province;

  offersModel: SearchModel = new SearchModel();
  paginationOffers: PaginationProperties = new PaginationProperties();
  offersPaginated: PaginatedOffers;

  ordersModel: PaginationProperties = new PaginationProperties();
  paginationOrders: PaginationProperties = new PaginationProperties();
  ordersPaginated: PaginatedOrders;

  ngOnInit(): void {
    this.initModel();

    this.userService.getUserInfo(this.currentUser.id)
      .subscribe((result) => {
        this.user = result;
        this.provinceService.getProvinces()
          .subscribe((result) => {
            this.provinces = result;
            this.selectedProvince = result.filter(elem => {
              return elem.id === this.user.province.id;
            })[0]
          })
      })

    this.getOffers();
    this.getOrders();
  }

  private initModel() {
    this.offersModel.pageIndex = 1;
    this.offersModel.pageSize = 10;
    this.offersModel.orderBy = this.defaultSort;
    this.offersModel.sellerId = this.currentUser.id;

    this.paginationOffers.pageIndex = 0;
    this.paginationOffers.pageSize = 10;
    this.paginationOffers.orderBy = this.defaultSort;

    this.ordersModel.pageIndex = 1;
    this.ordersModel.pageSize = 10;
    this.ordersModel.orderBy = this.defaultSort;

    this.paginationOrders.pageIndex = 0;
    this.paginationOrders.pageSize = 10;
    this.paginationOrders.orderBy = this.defaultSort;
  }

  public handlePageOffers(e: any) {
    this.offersModel.pageIndex = e.pageIndex + 1;
    this.offersModel.pageSize = e.pageSize;

    this.getOffers();
  }

  public handlePageOrder(e: any) {
    this.ordersModel.pageIndex = e.pageIndex + 1;
    this.ordersModel.pageSize = e.pageSize;

    this.getOrders();
  }

  getOffers() {
    this.offerService.getOffers(this.offersModel)
      .subscribe((response) => {
        this.offersPaginated = response;
      });
  }

  getOrders() {
    this.orderService.getOrdersFromUser(this.ordersModel)
      .subscribe((result) => {
        this.ordersPaginated = result;
      })
  }

  endAuction(chosenOffer: OfferWithBaseData) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '300px',
      height: '200px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const offer = new Offer();
        offer.id = chosenOffer.id;
        offer.state = OfferState.Finished;
        this.offerService.updateOffer(offer)
          .subscribe(() => {
            this.getOffers();
          })
      }
    });
  }

  editUserData() {
    this.editable = !this.editable;
  }

  submit() {
    if (!this.user.city || !this.user.postCode || !this.user.street) {
      this.error = true;
      return;
    }
    if(!(this.user.bankAccountNumber.length === 26 || this.user.bankAccountNumber.length === 0)) {
      this.isAlertDisplayed = true;
      return;
    }
    let updatedUser = new UpdateUser();
    updatedUser.id = this.user.id;
    updatedUser.city = this.user.city;
    updatedUser.postCode = this.user.postCode;
    updatedUser.bankAccountNumber = this.user.bankAccountNumber;
    updatedUser.street = this.user.street;
    updatedUser.provinceId = this.selectedProvince.id;
    this.userService.updateUser(updatedUser)
      .subscribe((result) => {
        window.location.reload();
      })
  }

  closeAlert() {
    this.isAlertDisplayed = false;
  }

  closeError() {
    this.error = false;
  }
}
