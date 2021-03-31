import { Component, OnInit } from '@angular/core';
import { HttpClientService, Employee } from './../service/http-client.service';
import { Router } from '@angular/router';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { AuthenticationService } from '../service/authentication.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  private myModal;
  closeResult = '';

  user: Employee = new Employee(Number(),"","","","","","","");

  constructor(public loginService:AuthenticationService, private httpClientService:HttpClientService, private router: Router, private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  routeToAddnew(){
    const navigationDetails: string[] = ['/addemployee'];
    this.router.navigate(navigationDetails);
  }

  
  open(content) {
    this.modalService.open(content,
   {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = 
         `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  logoutfn(){
    this.router.navigate(["/logout"]);
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
