import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { BanInfoDialogComponent } from 'src/app/dialogs/ban-info-dialog/ban-info-dialog.component';
import { AuthenticationService } from '../../services/authentication/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  returnUrl: string;

  loginError: boolean = false; 

  form: FormGroup = this.fb.group({    
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  constructor(
    private authenticationService: AuthenticationService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog) { 
      this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';
    }

  ngOnInit(): void {
    
  }

  get f() { return this.form.controls; }

  onSubmit() {
    this.authenticationService.login(this.f.username.value.trim(), this.f.password.value.trim())
      .subscribe((user) => {
        this.loginError = false;
        if(!user.isActive) {
          const dialogRef = this.dialog.open(BanInfoDialogComponent, {
            width: "400px",
            height: 'auto',
            data: user.banInfo
          });
        }
        else {
          this.router.navigate([this.returnUrl]);
        }}, () => { 
            this.loginError = true;
      })
  }

}
