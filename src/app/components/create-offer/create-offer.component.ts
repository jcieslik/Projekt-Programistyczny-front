import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brand/brand.service';

@Component({
  selector: 'app-create-offer',
  templateUrl: './create-offer.component.html',
  styleUrls: ['./create-offer.component.scss']
})
export class CreateOfferComponent implements OnInit {

  brands: Brand[] = null;

  images = [];
   myForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    file: new FormControl('', [Validators.required]),
    fileSource: new FormControl('', [Validators.required])
  });
   
  constructor(private http: HttpClient, private brandService: BrandService) { }
  
  ngOnInit(): void {
    this.brandService.getBrands()
      .subscribe((response) => {
        this.brands = response;
      });
  }
   
  get f(){
    return this.myForm.controls;
  }
   
  onFileChange(event: any) {
    if (event.target.files && event.target.files[0]) {
        var filesAmount = event.target.files.length;
        for (let i = 0; i < filesAmount; i++) {
          var reader = new FileReader();
   
          reader.onload = (event:any) => {
            this.images.push(event.target.result); 
   
            this.myForm.patchValue({
              fileSource: this.images
            });
          }
          reader.readAsDataURL(event.target.files[i]);
        }
    }
  }
    
  submit(){
    console.log(this.myForm.value);
  }
}
