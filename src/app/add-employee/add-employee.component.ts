import { Component, OnInit } from '@angular/core';
import { HttpClientService, Employee } from './../service/http-client.service';
import { FormBuilder, Validators } from "@angular/forms";
import Swal from 'sweetalert2'
import { Router } from '@angular/router';
import {NgbModal, ModalDismissReasons} 
      from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {

  user: Employee = new Employee(Number(),"","","","","","","");

  role = [
    { id: 1, name: 'Manager' },
    { id: 2, name: 'Employee' }
 ];

 selectedRole: number = 0;
 closeResult = '';

  constructor(private httpClientService:HttpClientService, public fb: FormBuilder, private router: Router, private modalService: NgbModal) { }

  open(content) {
    this.modalService.open(content,
   {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = 
         `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

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
          Swal.fire({
            text:'Employee created successfully.',
            confirmButtonText: 'OK'})

            this.router.navigate(['/viewemployee']);   
        });

  };

}
