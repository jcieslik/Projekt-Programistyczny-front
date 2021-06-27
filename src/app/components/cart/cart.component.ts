import { ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { PaginationProperties } from 'src/app/enums/pagination-properties';
import { Component, OnInit } from '@angular/core';
import { OfferWithBaseData } from 'src/app/models/offer-base-data';
import { OfferService } from 'src/app/services/offer/offer.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private offerService: OfferService) { }

  offers: OfferWithBaseData[] = [];
  
  cartId: number = 1; // temporary 

  dataSource: any;

  public pageSize = 10;

  public currentPage = 0;

  public totalSize = 0;

  public pageEvent;

  ngOnInit(): void {
    this.getOffersFromCart();
    this.totalSize = this.offers.length
    this.dataSource = new MatTableDataSource<OfferWithBaseData>(this.offers);
    this.dataSource.paginator = this.paginator;
    this.iterator();
  }

  getOffersFromCart(){
    this.offerService.getOffersFromCart(this.cartId).subscribe((result) => {  this.offers = result  });;
    this.totalSize = this.offers.length
  }

  removeOfferFromCart(offerId: number){
    this.offerService.removeOfferFromCart(offerId).subscribe();
    this.offers = this.offers.filter(elem => elem.id !== offerId);
    this.totalSize = this.offers.length

  }
  
  public handlePage(e: any) {
    this.currentPage = e.pageIndex;
    this.pageSize = e.pageSize;
    this.iterator();
  }

  private iterator() {
    const end = (this.currentPage + 1) * this.pageSize;
    const start = this.currentPage * this.pageSize;
    const part = this.offers.slice(start, end);
    this.dataSource = part;
  }
}
