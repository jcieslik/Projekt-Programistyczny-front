import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryImageSize, NgxGalleryOptions } from '@kolkov/ngx-gallery';
import { CreateBidComponent } from 'src/app/dialogs/create-bid/create-bid.component';
import { OfferType } from 'src/app/enums/offer-type';
import { Bid } from 'src/app/models/bid';
import { Offer } from 'src/app/models/offer';
import { User } from 'src/app/models/user';
import { CartService } from 'src/app/services/cart/cart.service';
import { Wish } from 'src/app/models/wish';
import { BidService } from 'src/app/services/bid/bid.service';
import { OfferService } from 'src/app/services/offer/offer.service';
import { WishService } from 'src/app/services/wish/wish.service';
import { MatDialog } from '@angular/material/dialog';
import { OfferState } from 'src/app/enums/offer-state';

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

  offerType = OfferType;

  offerState = OfferState;

  user: User = JSON.parse(localStorage.getItem('user'))

  constructor(
    private offerService: OfferService,
    private cartService: CartService,
    private route: ActivatedRoute,
    private wishService: WishService,
    private bidService: BidService,
    public dialog: MatDialog) { }

  isFavorite: boolean = true;

  ngOnInit(): void {
    this.offerId = +this.route.snapshot.paramMap.get('id')
    this.checkForUserWish();
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

  checkForUserWish() {
    this.wishService.checkForUserWish(this.offerId)
      .subscribe((result) => {
        this.isFavorite = result;
      })
  }
  addToCart() {
    this.cartService.addOfferToCart(this.offerId).subscribe();
  }

  checkIfBuyingDisabled(): boolean {
    if (this.user) {
      if (this.offer.offerType === OfferType.BuyNow) {
        return this.offer.seller.id === this.user.id;
      } else if (this.offer.offerType === OfferType.Auction) {
        return this.offer.seller.id === this.user.id || (this.offer.bestBid && this.offer.bestBid.bidderId === this.user.id);
      }
    }
    return true;
  }

  getRouterLink(): string {
    if (this.user) {
      return this.offer.seller.id === this.user.id ? '/account/' : '/userProfile/' + this.offer.seller.id;
    }
    return '/userProfile/' + this.offer.seller.id;
  }

  makeFavorite() {
    let wish = new Wish();
    wish.customerId = this.user.id;
    wish.offerId = this.offerId;
    if (!this.isFavorite) {
      this.wishService.createWish(wish)
        .subscribe((result) => {
          this.checkForUserWish();
        })
    } else {
      this.wishService.hideWish(this.offerId)
        .subscribe((result) => {
          this.checkForUserWish();
        })
    }
  }

  getColor() {
    return this.isFavorite ? 'gold' : '';
  }

  makeBid() {
    const dialogRef = this.dialog.open(CreateBidComponent, {
      width: '300px',
      height: '200px',
      data: this.offer.bestBid ? this.offer.bestBid.value : this.offer.minimalBid
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        let bid = new Bid();
        bid.value = result;
        bid.offerId = this.offerId;
        bid.bidderId = this.user.id;
        this.bidService.createBid(bid)
          .subscribe((result) => {
            window.location.reload();
          });
      }
    });
  }
}
