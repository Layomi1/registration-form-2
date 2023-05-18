import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  constructor(
    private builder: FormBuilder,
    private toastr: ToastrService,
    private service: AuthService,
    private router: Router
  ) {}

  registerform = this.builder.group({
    id: this.builder.control(
      '',
      Validators.compose([Validators.required, Validators.minLength(5)])
    ),
    name: this.builder.control('', Validators.required),
    email: this.builder.control(
      '',
      Validators.compose([Validators.required, Validators.email])
    ),
    password: this.builder.control(
      ''
      // Validators.compose([
      //   Validators.required,
      //   Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      // ])
    ),
    gender: this.builder.control(''),
    role: this.builder.control(''),
    isActive: this.builder.control(false),
  });

  proceedRegistration() {
    if (this.registerform.valid) {
      this.service.proceedRegister(this.registerform.value).subscribe((res) => {
        this.toastr.success(
          'Please,contact Admin for enabled access',
          'Registered successfully'
        );
        this.router.navigate(['login']);
      });
    } else {
      this.toastr.warning('Please,enter valid data ');
    }
  }
}
