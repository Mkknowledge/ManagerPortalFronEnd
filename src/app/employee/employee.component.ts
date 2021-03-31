import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClientService, Employee } from './../service/http-client.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  id: string;
  employees:Employee[];
  form: FormGroup;
  closeResult = '';
  constructor(private httpClientService:HttpClientService, private router: Router,  private route: ActivatedRoute,private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.httpClientService.getEmployees().subscribe(
     response =>{this.employees = response;}
    );
    this.id = this.route.snapshot.params['id'];

    
  this.form = this.formBuilder.group({
    title: ['', Validators.required],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    role: ['', Validators.required],
    password: ['', [Validators.minLength(6), Validators.required]]
    });

    this.httpClientService.getEmployee(this.id)
                .pipe(first())
                .subscribe(x => this.form.patchValue(x));
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




  private updateUser(id) {
    this.httpClientService.updateEmployee(this.id)
        .pipe(first())
        .subscribe({
            next: () => {
              Swal.fire({
                text:'Employee Updated successfully.',
                confirmButtonText: 'OK'})
                this.router.navigate(['../../'], { relativeTo: this.route });
            },
            error: error => {
              Swal.fire({
                text:'Employee Failed to Updated.',
                confirmButtonText: 'OK'})
            }
        });
}

  deleteEmployee(employee: Employee): void {
    this.httpClientService.deleteEmployee(employee)
      .subscribe( data => {
        this.employees = this.employees.filter(u => u !== employee);
      })
  };

}
