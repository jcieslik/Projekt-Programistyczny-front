import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { OfferWithBaseData } from 'src/app/models/offer-base-data';
import { OfferService } from 'src/app/services/offer/offer.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  offers: OfferWithBaseData[] = [];

  public displayedColumns = ['', '', '', '', ''];
  public dataSource: any;    

  public pageSize = 10;
  public currentPage = 0;
  public totalSize = 0;

  public pageEvent;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  constructor(private offerService: OfferService) { }

  ngOnInit(): void {
    this.offerService.getAllOffers()
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
