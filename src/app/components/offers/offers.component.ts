import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { PaginationProperties } from 'src/app/enums/pagination-properties';
import { OfferWithBaseData } from 'src/app/models/offer-base-data';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.scss']
})
export class OffersComponent implements OnInit {
  @Input()
  offers: OfferWithBaseData[];
  @Input()
  totalSize: number;

  @Output()
  pageChange = new EventEmitter<PaginationProperties>();

  pagination: PaginationProperties = new PaginationProperties();

  public pageEvent;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor() { }

  ngOnInit(): void {
    this.pagination.pageIndex = 0;
    this.pagination.pageSize = 10;
    this.pagination.orderBy = "creation";
  }

  public handlePage(e: any) {
    this.pagination.pageIndex = e.pageIndex;
    this.pagination.pageSize = e.pageSize;
    this.pageChange.emit(this.pagination);
  }
}
