import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { ConfirmationDialogComponent } from 'src/app/dialogs/dialog-confirmation/confirmation-dialog.component';
import { OfferState } from 'src/app/enums/offer-state';
import { PaginationProperties } from 'src/app/enums/pagination-properties';
import { Offer } from 'src/app/models/offer';
import { OfferWithBaseData } from 'src/app/models/offer-base-data';
import { PaginatedOffers } from 'src/app/models/paginatedOffers';
import { SearchModel } from 'src/app/models/searchModel';
import { User } from 'src/app/models/user';
import { UserInfo } from 'src/app/models/user-info';
import { OfferService } from 'src/app/services/offer/offer.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  constructor(private userService: UserService, private offerService: OfferService, public dialog: MatDialog) { }

  currentUser: User = JSON.parse(localStorage.getItem('user'));

  user: UserInfo;

  offersPaginated: PaginatedOffers;
  model: SearchModel = new SearchModel();
  defaultSort: string = "creation";
  pagination: PaginationProperties = new PaginationProperties();
  totalSize: number;
  offers: OfferWithBaseData[] = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit(): void {
    this.initModel();

    this.userService.getUserInfo(this.currentUser.id)
      .subscribe((result) => {
        this.user = result;
      })

    this.offerService.getOffers(this.model)
      .subscribe((response) => {
        this.offersPaginated = response;
        this.offers = this.offersPaginated.items;
        this.totalSize = response.totalCount;
      })
  }

  private initModel() {
    this.model.pageIndex = 1;
    this.model.pageSize = 10;
    this.model.orderBy = this.defaultSort;
    this.model.sellerId = this.currentUser.id;

    this.pagination.pageIndex = 0;
    this.pagination.pageSize = 10;
    this.pagination.orderBy = "creation";
  }

  public handlePage(e: any) {
    this.model.pageIndex = e.pageIndex + 1;
    this.model.pageSize = e.pageSize;

    this.offerService.getOffers(this.model)
      .subscribe((response) => {
        this.offersPaginated = response;
        this.offers = this.offersPaginated.items;
        this.totalSize = response.totalCount;
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
            this.offerService.getOffers(this.model)
              .subscribe((response) => {
                this.offersPaginated = response;
                this.offers = this.offersPaginated.items;
                this.totalSize = response.totalCount;
              })
          })
      }
    });
  }
}
