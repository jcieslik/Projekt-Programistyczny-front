import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Offer } from 'src/app/models/offer';
import { OfferService } from 'src/app/services/offer/offer.service';
import { ImageDisplayComponent } from '../image-display/image-display.component';

@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.scss']
})
export class OfferComponent implements OnInit {

  offerId: number;

  offer: Offer;

  constructor(private offerService: OfferService, 
    private route: ActivatedRoute,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.offerId = +this.route.snapshot.paramMap.get('id')
    this.offerService.getOffer(this.offerId)
      .subscribe((result) => {
        this.offer = result;
      })
  }

  openDialog() {
    const dialogRef = this.dialog.open(ImageDisplayComponent, {
      data: { image: this.offer.images[0].imageData },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
