import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryImageSize, NgxGalleryOptions } from '@kolkov/ngx-gallery';
import { Offer } from 'src/app/models/offer';
import { User } from 'src/app/models/user';
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
  
  user: User = JSON.parse(localStorage.getItem('user'))

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
            width: '600px',
            height: '400px',
            thumbnailsColumns: 4,
            imageAnimation: NgxGalleryAnimation.Slide
          },
          // max-width 800
          {
            imageSize: NgxGalleryImageSize.Contain,
            breakpoint: 200,
            imagePercent: 50,
            thumbnailsPercent: 20,
            thumbnailsMargin: 20,
            thumbnailMargin: 20
          },
          {
            breakpoint: 100,
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

  addToCart(){
    this.offerService.addOfferToCart(this.offerId).subscribe();
  }

}
