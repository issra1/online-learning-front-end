import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MaterialModule } from '../../../material.module';
import { User } from '../../../models/user';
import { NotificationService } from '../../../services/user-services/notification.service';
import { DialogService } from '../../../services/user-services/dialog.service';
import { UserService } from '../../../services/user-services/user.service';

@Component({
  selector: 'app-list-user',
  standalone: true,
  imports: [FormsModule, CommonModule, MaterialModule],
  templateUrl: './list-user.component.html',
  styleUrl: './list-user.component.css'
})
export class ListUserComponent {
  displayedColumns = ['fullName', 'email', 'phoneNumber', 'status', 'valid'];
  dataSource: MatTableDataSource<User>;

  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor(private notification : NotificationService,private dialogService: DialogService, private userService: UserService, private dialog: MatDialog, private cdf: ChangeDetectorRef) {
    // Create 100 users
    const users: User[] = [];

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(users);
  }
  ngOnInit(): void {
    this.getAllUser();
  }

  getAllUser() {
    let resp = this.userService.getAllUsersExceptAdminByRoles('ADMIN');
    resp.subscribe(data => {
      this.dataSource.data = data;
    },
      error => {
        console.log(error);
      }
    )
  }

  /**
   * Set the paginator and sort after the view init since this component will
   * be able to query its view for the initialized paginator and sort.
   */
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    let filterValue = (event.target as HTMLInputElement).value;
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }


  acceptUser(row: any) {
    const user = {
      email: row.email
    };
    this.dialogService.openConfirmDialog('Vous étes sur de confirmer ce demande ?')
      .afterClosed().subscribe(res => {
        if (res) {
          let resp = this.userService.acceptUser(row.email, user);
          resp.subscribe(() => {
            this.notification.success("Opertaion effectué avec succés!")
           // window.location.reload();
          },
            error => {
              this.notification.warn("Opertaion echoué!")
            // window.location.reload();
            }
          )
        }
        window.location.reload();
      }
    );
  }


  cancelUser(row: any) {
    const user = {
      email: row.email
    };
    this.dialogService.openConfirmDialog('Vous étes sur de désactiver cette demande ?')
      .afterClosed().subscribe(res => {
        if (res) {
          let resp = this.userService.refuseUser(row.email, user);
          resp.subscribe(() => {
            this.notification.success("Opertaion effectué avec succés!")
            window.location.reload();
          },
            error => {
              this.notification.warn("Opertaion echoué!")
              window.location.reload();
            }
          )
        }
      });
  }

  deletelUser(row: any) {
    const user = {
      email: row.email
    };
    this.dialogService.openConfirmDialog('Vous étes sur de supprimer cette utilisateur ?')
      .afterClosed().subscribe(res => {
        if (res) {
          let resp = this.userService.deleteUser(row.email, user);
          resp.subscribe(() => {
            this.notification.success("Opertaion effectué avec succés!")
            window.location.reload();
          },
            error => {
              this.notification.warn("Opertaion echoué!")
              window.location.reload();
            }
          )
        }
      });
  }

}


