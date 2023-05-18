import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogRef } from '@angular/cdk/dialog';

@Component({
  selector: 'app-updatepopup',
  templateUrl: './updatepopup.component.html',
  styleUrls: ['./updatepopup.component.css'],
})
export class UpdatepopupComponent implements OnInit {
  constructor(
    private builder: FormBuilder,
    private service: AuthService,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: DialogRef<UpdatepopupComponent>
  ) {}

  editdata: any;
  ngOnInit(): void {
    this.service.getAllRole().subscribe((res) => {
      this.rolelist = res;
    });
    if (this.data.usercode != null && this.data.usercode != '') {
      this.service.Getbycode(this.data.usercode).subscribe((res) => {
        this.editdata = res;
        this.registerform.setValue({
          id: this.editdata.id,
          name: this.editdata.name,
          email: this.editdata.email,
          password: this.editdata.password,
          gender: this.editdata.gender,
          role: this.editdata.role,
          isActive: this.editdata.isActive,
        });
      });
    }
  }

  rolelist: any;
  registerform = this.builder.group({
    id: this.builder.control(''),
    name: this.builder.control(''),
    email: this.builder.control(''),
    password: this.builder.control(''),
    gender: this.builder.control(''),
    role: this.builder.control('', Validators.required),
    isActive: this.builder.control(false),
  });

  updateUser() {
    if (this.registerform.valid) {
      console.log('====', this.registerform.value.id, this.registerform.value);

      this.service
        .UpdateUser(this.registerform.value.id, this.registerform.value)
        .subscribe((res) => {
          this.toastr.success('Updated Sucessfully!');
          this.dialog.close();
        });
    } else {
      this.toastr.warning('Please, select role.');
    }
  }
}
