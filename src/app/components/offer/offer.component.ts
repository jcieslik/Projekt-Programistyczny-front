import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
import { SummarizeOrderService } from 'src/app/services/summarize-order/summarize-order.service';
import { CartOfferDTO } from 'src/app/models/cart-offer';
import { OrderService } from 'src/app/services/order/order.service';
import { Order } from 'src/app/models/order';
import { OrderStatus } from 'src/app/enums/order-status';
import { ConfirmationDialogComponent } from 'src/app/dialogs/dialog-confirmation/confirmation-dialog.component';
import { ConfirmationDialog } from 'src/app/enums/confirmation-dialog';
import { BanOfferComponent } from 'src/app/dialogs/ban-offer/ban-offer.component';
import { Ban } from 'src/app/models/ban';
import { isObject } from 'rxjs/internal-compatibility';

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

  isAdmin = false;

  productCount = 1;

  constructor(
    private offerService: OfferService,
    private cartService: CartService,
    private route: ActivatedRoute,
    private wishService: WishService,
    private bidService: BidService,
    private orderService: OrderService,
    private summarOrderService: SummarizeOrderService,
    private router: Router,
    public dialog: MatDialog) { }

  isFavorite: boolean = true;

  ngOnInit(): void {
    this.isAdmin = this.user.role === 1 ? true : false;
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
    if(!this.isAdmin){
    this.wishService.checkForUserWish(this.offerId)
      .subscribe((result) => {
        this.isFavorite = result;
      })
    }
  }
  addToCart() {
    this.cartService.addOfferToCart(this.offerId).subscribe(() => {
      const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
        width: '360px',
        height: '200px',
        data: ConfirmationDialog.AddToCart
      });
  
      dialogRef.afterClosed().subscribe((result) => {
        if(result) {
          this.router.navigateByUrl('/cart');
        }
      });
    });
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

  incrementProductCount() {
    if(this.productCount < this.offer.productCount) {
      this.productCount += 1;
    }
  }

  decrementProductCount() {
    if(this.productCount > 1) {
      this.productCount -= 1;
    }
  }

  validateQuantity(){ 
    return (this.productCount > 0 && this.productCount <= this.offer.productCount)
  }

  buyNow() {
    if(this.productCount < 1 || this.productCount > this.offer.productCount) {
      alert("Zła ilość produktów!");
      return;
    }
    let cartOffer = new CartOfferDTO();
    cartOffer.title = this.offer.title;
    cartOffer.priceForOneProduct = this.offer.priceForOneProduct;
    cartOffer.availableProducts = this.offer.productCount;
    cartOffer.deliveryMethods = this.offer.deliveryMethods;
    cartOffer.productsCount = this.productCount;
    cartOffer.offerId = this.offerId;
    
    this.summarOrderService.setOrderOffers([cartOffer]);
    this.router.navigateByUrl('/checkout');
  }

  banOffer(){
    const dialogRef = this.dialog.open(BanOfferComponent, {
      width: "600px",
      height: 'auto',
      data: this.offer
    })

    dialogRef.afterClosed().subscribe(result => {

      if(result){
        var resultMessage: string = result;
        var ban: Ban = {
          id: this.offerId,
          banInfo: resultMessage
        }
        this.offerService.banOffer(ban).subscribe(result => {
            if(result){
              this.offer.state = OfferState.Banned;
            }
          }
        );
      }
    })
  }

  unbanOffer() {
    this.offerService.unbanOffer(this.offerId).subscribe(result => {
      if(result) {
        this.offer.state = OfferState.Awaiting;
      }
    })
  }
}
