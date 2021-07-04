import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UpdateUser } from 'src/app/models/updateUser';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-change-user-info',
  templateUrl: './change-user-info.component.html',
  styleUrls: ['./change-user-info.component.scss']
})
export class ChangeUserInfoComponent implements OnInit {

  constructor(
    private userService: UserService,
    private fb: FormBuilder) { }

  form: FormGroup = this.fb.group({    
    username: ['', Validators.required],

    email: ['',Validators.required],
    name: ['', Validators.required],
    surname: ['', Validators.required],
  });
  
  get f() { return this.form.controls; }

  user: User = JSON.parse(localStorage.getItem('user'));

  ngOnInit(): void {
    this.getAccountDetails();
  }
  
  getAccountDetails(): void {
    this.userService.getUserInfo(this.user.id).subscribe(details => {
      this.f.username.setValue(details.username);
      this.f.name.setValue(details.name);
      this.f.surname.setValue(details.surname);
      this.f.email.setValue(details.email);
    });


  }

  updateUser(){
    var updateDto: UpdateUser;
    
    updateDto.username = this.f.username.value;
    updateDto.surname = this.f.surname.value;
    updateDto.email = this.f.email.value;
    updateDto.name = this.f.name.value;
    updateDto.isActive = true;
    updateDto.id = this.user.id;
    updateDto.password = "";
    //this.userService.updateUser(this.user);
  }

  onSubmit(){}

}
