import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  router: any;
  constructor(
    private builder: FormBuilder,
    private service: AuthService,
    router: Router,
    private toastr: ToastrService
  ) {
    sessionStorage.clear();
  }
  userdata: any;

  loginform = this.builder.group({
    username: this.builder.control('', Validators.required),
    password: this.builder.control('', Validators.required),
  });

  proceedLogin() {
    if (this.loginform.valid) {
      this.service.Getbycode(this.loginform.value.username).subscribe((res) => {
        this.userdata = res;
        console.log(this.userdata);
        if (this.userdata.password === this.loginform.value.password) {
          if (this.userdata.isActive) {
            sessionStorage.setItem('username', this.userdata.id);
            sessionStorage.setItem('userrole', this.userdata.role);
            this.router.nagivate(['']);
          } else {
            this.toastr.error('Please contact Admin', 'InActive User');
          }
        } else {
          this.toastr.error('Invalid credentials');
        }
      });
    }
  }
}
