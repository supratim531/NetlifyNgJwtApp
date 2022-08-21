import { Component, OnInit } from '@angular/core';

import { NavbarComponent } from '../navbar/navbar.component';
import { UserService } from 'src/app/service/user/user.service';
import { Employee } from 'src/app/model/employee/employee.model';
import { EmployeeService } from 'src/app/service/employee/employee.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  employees: Employee[] = [];
  isSuperuser: boolean = false;

  constructor(
    private _userService: UserService,
    private _employeeService: EmployeeService,
    private _navbarComponent: NavbarComponent
  ) {
  }

  ngOnInit(): void {
    this.setUserDetails();
    this.refreshEmployeesList();
  }

  setUserDetails(): void {
    const username = this._navbarComponent.currentUsername;
    if (username !== null) {
      this._userService.getUserByUsername(username).subscribe(
        response => {
          console.log('response', response);
          this.isSuperuser = (response.role.roleName === 'ROLE_ADMIN') ? true : false;
        },
        error => {
          console.log('error', error);
        }
      );
    }
  }

  refreshEmployeesList(): void {
    this._employeeService.getAllEmployees().subscribe(
      response => {
        console.log('response', response);
        this.employees = response;
      },
      error => {
        console.log('error', error);
      }
    );
  }

  deleteOnClick(employeeId: number): void {
    console.log('delete button works');
    alert(`'employee-delete button works' (but not implemented yet)`);
  }

  updateOnClick(employeeId: number): void {
    console.log('update button works');
    alert(`'employee-update button works' (but not implemented yet)`);
  }

  registerOnClick(): void {
    console.log('register button works');
    alert(`'employee-register button works' (but not implemented yet)`);
  }

}
