import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  returnUrl: string;

  form: FormGroup = this.fb.group({    
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  constructor(
    private authenticationService: AuthenticationService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router) { 
      this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';
    }

  ngOnInit(): void {
    
  }

  get f() { return this.form.controls; }

  onSubmit() {
    this.authenticationService.login(this.f.username.value.trim(), this.f.password.value.trim())
      .subscribe((response) => {
        this.router.navigate([this.returnUrl]);
      })
  }

}
