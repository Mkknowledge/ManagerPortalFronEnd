import { Component, OnInit } from '@angular/core';
import { Employee, HttpClientService } from './../service/http-client.service';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css']
})
export class UpdateEmployeeComponent implements OnInit {

  user: Employee;
  editForm: FormGroup;
  submitted = false;

  role = [
    { id: 1, name: 'Manager' },
    { id: 2, name: 'Employee' }
 ];

 selectedRole: number = 0;

  constructor(private httpClientService:HttpClientService,private router: Router, public fb: FormBuilder) { }

  ngOnInit(): void {

    let userId = window.localStorage.getItem("editUserId");
    if(!userId) {
      alert("Invalid action.")
      this.router.navigate(['']);
      return;
    }
    this.editForm = this.fb.group({
      empId: [''],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', Validators.required],
      address: ['', Validators.required],
      dob: ['', Validators.required],
      mobile: ['', Validators.required],
      city: ['', Validators.required],
      role: ['', Validators.required]
    });
     this.httpClientService.getEmployee(+userId)
      .subscribe( data => {
        alert(data);
        this.editForm.setValue(data);
      });

}

selectRole = this.fb.group({
  role: ['']
})

onChangeRole(roleId: number) {
 this.selectedRole = roleId;
}

updateEmployee(employee: Employee): void {
  this.httpClientService.updateEmployee(employee)
  .subscribe(  response => {
    console.log(response);
    this.submitted = true;
  })
};

}