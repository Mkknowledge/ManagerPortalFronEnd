import { HttpClientService, Employee } from './../service/http-client.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  employees:Employee[];
  constructor(private httpClientService:HttpClientService, private router: Router) { }

  ngOnInit() {
    this.httpClientService.getEmployees().subscribe(
     response =>{this.employees = response;}
    );
  }

  editUser(emp: Employee): void {
    window.localStorage.removeItem("editUserId");
    window.localStorage.setItem("editUserId", emp.empId.toString());
    this.router.navigate(['/updateemployee']);
  };

  deleteEmployee(employee: Employee): void {
    this.httpClientService.deleteEmployee(employee)
      .subscribe( data => {
        this.employees = this.employees.filter(u => u !== employee);
      })
  };

}
