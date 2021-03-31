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
  }

  update(employee: Employee): void {
    localStorage.removeItem("editUserId");
    localStorage.setItem("editUserId", employee.toString());
    console.log("editUserId" + employee);
    this.router.navigate(['updateemployee']);
  };

  deleteEmployee(employee: Employee): void {
    this.httpClientService.deleteEmployee(employee)
      .subscribe( data => {
        this.employees = this.employees.filter(u => u !== employee);
      })
  };

}
