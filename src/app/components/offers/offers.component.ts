import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { PaginationProperties } from 'src/app/enums/pagination-properties';
import { OfferWithBaseData } from 'src/app/models/offer-base-data';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.scss']
})
export class OffersComponent implements OnInit {
  @Input()
  offers: OfferWithBaseData[] = [];

  @Output()
  pageChange = new EventEmitter<PaginationProperties>();

  public dataSource: any;

  public pageSize = 10;
  public currentPage = 0;
  public totalSize = 0;

  public pageEvent;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor() { }

  ngOnInit(): void {
    this.totalSize = this.offers.length
    this.dataSource = new MatTableDataSource<OfferWithBaseData>(this.offers);
    this.dataSource.paginator = this.paginator;
    this.iterator();
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
