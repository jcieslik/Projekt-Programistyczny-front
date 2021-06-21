import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryImageSize, NgxGalleryOptions } from '@kolkov/ngx-gallery';
import { Offer } from 'src/app/models/offer';
import { OfferService } from 'src/app/services/offer/offer.service';

@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.scss']
})
export class OfferComponent implements OnInit {

  galleryOptions: NgxGalleryOptions[];
  
  galleryImages: NgxGalleryImage[] = [];
  
  offerId: number;

  offer: Offer;

  constructor(private offerService: OfferService, 
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.offerId = +this.route.snapshot.paramMap.get('id')
    this.offerService.getOffer(this.offerId)
      .subscribe((result) => {
        this.offer = result;
        this.galleryOptions = [
          {
            imageArrows: false,
            imageSize: NgxGalleryImageSize.Contain,
            width: '500px',
            height: '400px',
            thumbnailsColumns: 4,
            imageAnimation: NgxGalleryAnimation.Slide
          },
          // max-width 800
          {
            imageSize: NgxGalleryImageSize.Contain,
            breakpoint: 400,
            width: '100%',
            height: '600px',
            imagePercent: 20,
            thumbnailsPercent: 20,
            thumbnailsMargin: 20,
            thumbnailMargin: 20
          },
          // max-width 400
          {
            breakpoint: 200,
            preview: false
          }
        ];
        result.images.forEach(element => {
          this.galleryImages.push({
            small: element.imageData,
            medium: element.imageData,
            big: element.imageData
          })
        });
      })
  }

}
