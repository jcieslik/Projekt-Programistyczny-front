import { Component, OnInit, ViewChild } from '@angular/core';
import { OfferWithBaseData } from 'src/app/models/offer-base-data';
import { OfferService } from 'src/app/services/offer/offer.service';
import { User } from 'src/app/models/user';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-own-offers',
  templateUrl: './own-offers.component.html',
  styleUrls: ['./own-offers.component.scss']
})
export class OwnOffersComponent implements OnInit {

  offers: OfferWithBaseData[] = [];

  user: User = JSON.parse(localStorage.getItem('user'));

  public displayedColumns = ['', '', '', '', ''];
  public dataSource: any;    

  public pageSize = 10;
  public currentPage = 0;
  public totalSize = 0;

  public pageEvent;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private offerService: OfferService) { }

  ngOnInit(): void {
    this.offerService.getOffersFromUser(this.user.id)
      .subscribe((response) => {
        this.offers = response;
        this.dataSource = new MatTableDataSource<OfferWithBaseData>(response);
        this.dataSource.paginator = this.paginator;
        this.totalSize = this.offers.length;
        this.iterator();
      }) 
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
