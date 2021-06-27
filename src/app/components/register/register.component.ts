import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserRole } from 'src/app/enums/user-role';
import { MustMatch } from 'src/app/helpers/mustMatchValidator';
import { CreateUser } from 'src/app/models/createUser';
import { UserService } from 'src/app/services/user/user.service';
import { Province } from 'src/app/models/province';
import { ProvinceService } from 'src/app/services/province/province.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  isLinear = false;

  accountForm: FormGroup = this.fb.group({    
    username: ['', Validators.required],
    password: ['', Validators.required],
    passwordConfirmation: [''],
    email: ['',Validators.required],
    name: ['', Validators.required],
    surname: ['', Validators.required],
  }, { validator: MustMatch('password', 'passwordConfirmation')});

  addressForm: FormGroup = this.fb.group({
    province: [Province, Validators.required],
    city: ['', Validators.required],
    street: ['', Validators.required],
    postCode: ['', Validators.required]
  })

  returnUrl: string;
  email: string | boolean;

  provinces: Province[] = [];
  selectedProvince: Province;

  constructor(
    private userService: UserService,
    private provinceService: ProvinceService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router) { 
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';
  }

  ngOnInit(): void {
    this.provinceService.getProvinces().subscribe(e => this.provinces = e);
  }

  get account() { return this.accountForm.controls; }
  get address() { return this.addressForm.controls; }
  
  onSubmit(){
    if(this.accountForm.invalid || this.addressForm.invalid){
      return;
    }
    
    var newUser = new CreateUser();
    newUser.email = this.account.email.value;
    newUser.name = this.account.name.value;
    newUser.surname = this.account.surname.value;
    newUser.username = this.account.username.value;
    newUser.password = this.account.password.value;
    newUser.role = UserRole.Customer;
    newUser.provinceId = this.address.province.value.id;
    newUser.street = this.address.street.value;
    newUser.postCode = this.address.postCode.value;
    newUser.city = this.address.city.value;
    
    
    this.userService.createUser(newUser).subscribe();
    this.router.navigateByUrl(this.returnUrl);
  }
}

