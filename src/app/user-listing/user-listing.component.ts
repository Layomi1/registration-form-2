import { UpdatepopupComponent } from './../updatepopup/updatepopup.component';
// import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from './../service/auth.service';
import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-user-listing',
  templateUrl: './user-listing.component.html',
  styleUrls: ['./user-listing.component.css'],
})
export class UserListingComponent {
  constructor(private service: AuthService, private dialog: MatDialog) {
    this.loadUser();
  }
  UpdatepopupComponent: string[] = [];
  userlist: any;
  dataSource: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  loadUser() {
    this.service.GetAll().subscribe((res) => {
      this.userlist = res;
      this.dataSource = new MatTableDataSource(this.userlist);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  displayedColumns: string[] = [
    'username',
    'name',
    'email',
    'role',
    'status',
    'action',
  ];

  updateUser(code: any) {
    const popUp = this.dialog.open(UpdatepopupComponent, {
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '500ms',
      width: '50%',
      data: {
        usercode: code,
      },
    });
    popUp.afterClosed().subscribe((res) => {
      this.loadUser();
    });
  }
  openDialog() {}
}
