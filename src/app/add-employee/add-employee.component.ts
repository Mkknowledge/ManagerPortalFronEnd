import { Component, OnInit } from '@angular/core';
import { HttpClientService, Employee } from './../service/http-client.service';
import { FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {

  user: Employee = new Employee("","","","","","","","","");

  role = [
    { id: 1, name: 'Manager' },
    { id: 2, name: 'Employee' }
 ];

 selectedRole: number = 0;

  constructor(private httpClientService:HttpClientService, public fb: FormBuilder) { }

  ngOnInit(): void {
  }

  selectRole = this.fb.group({
    role: ['']
  })

  onChangeRole(roleId: number) {
   this.selectedRole = roleId;
}

  createEmployee(): void {
    this.httpClientService.createEmployee(this.user)
        .subscribe( data => {
          alert("Employee created successfully.");
        });

  };

}
