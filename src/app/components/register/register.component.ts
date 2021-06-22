import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserRole } from 'src/app/enums/user-role';
import { MustMatch } from 'src/app/helpers/mustMatchValidator';
import { CreateUser } from 'src/app/models/createUser';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  form: FormGroup = this.fb.group({    
    username: ['', Validators.required],
    password: ['', Validators.required],
    passwordConfirmation: [''],
    email: ['',Validators.required],
    name: ['', Validators.required],
    surname: ['', Validators.required],
  }, { validator: MustMatch('password', 'passwordConfirmation')});

  returnUrl: string;
  email: string | boolean;

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router) { 
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';
  }

  ngOnInit(): void {
  }

  get f() { return this.form.controls; }

  onSubmit(){
    if(this.form.invalid){
      return;
    }
    
    var newUser = new CreateUser();
    newUser.email = this.f.email.value;
    newUser.name = this.f.name.value;
    newUser.surname = this.f.surname.value;
    newUser.username = this.f.username.value;
    newUser.password = this.f.password.value;
    newUser.role = UserRole.Customer;
    
    this.userService.createUser(newUser).subscribe();
    this.router.navigateByUrl(this.returnUrl);
  }
}

