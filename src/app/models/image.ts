export class Image {
  offerId: number;
  imageData: string;
  isMainProductImage: boolean;

  constructor(imageData: string) 
  {
    this.offerId = 0;
    this.imageData = imageData;
  }
}