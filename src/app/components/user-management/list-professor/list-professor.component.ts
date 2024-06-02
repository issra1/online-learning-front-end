import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MaterialModule } from '../../../material.module';
import { Professor } from '../../../models/professor';
import { NotificationService } from '../../../services/user-services/notification.service';
import { DialogService } from '../../../services/user-services/dialog.service';
import { UserService } from '../../../services/user-services/user.service';

@Component({
  selector: 'app-list-professor',
  standalone: true,
  imports: [FormsModule, CommonModule, MaterialModule],
  templateUrl: './list-professor.component.html',
  styleUrl: './list-professor.component.css'
})
export class ListProfessorComponent implements OnInit {
  displayedColumns = ['fullName', 'email', 'department','phoneNumber', 'status', 'valid'];
  dataSource: MatTableDataSource<Professor>;

  professors: Professor = new Professor();

  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor(private notification : NotificationService,private dialogService: DialogService, private userService: UserService) {
    // Create 100 users
    const users: Professor[] = [];

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(users);
  }
  ngOnInit(): void {
    this.getAllUser();
  }

  getAllUser() {
    let resp = this.userService.getAllUsersByRoles('TRAINER');
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


  acceptProfessor(row: any) {
    const user = {
      email: row.email
    };
    this.dialogService.openConfirmDialog('Vous étes sur de confirmer ce demande ?')
      .afterClosed().subscribe(res => {
        if (res) {
          let resp = this.userService.acceptUser(row.email, user);
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

  cancelUser(row: any) {
    const user = {
      email: row.email
    };
    this.dialogService.openConfirmDialog('Vous étes sur de désactiver cet utilisateur ?')
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
/** Builds and returns a new User. */


