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
      city: ['', Validators.required]
    });
     this.httpClientService.getEmployee(+userId)
      .subscribe( data => {
        alert(data);
        this.editForm.setValue(data);
      });

}

updateEmployee(employee: Employee): void {
  this.httpClientService.updateEmployee(employee)
  .subscribe(  response => {
    console.log(response);
    this.submitted = true;
  })
};

// private updateUser(id) {
//   this.httpClientService.updateEmployee(this.id)
//       .pipe(first())
//       .subscribe({
//           next: () => {
//             Swal.fire({
//               text:'Employee Updated successfully.',
//               confirmButtonText: 'OK'})
//               this.router.navigate(['../../'], { relativeTo: this.route });
//           },
//           error: error => {
//             Swal.fire({
//               text:'Employee Failed to Updated.',
//               confirmButtonText: 'OK'})
//           }
//       });
// }

}