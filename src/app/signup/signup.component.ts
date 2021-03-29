import { Component, OnInit } from '@angular/core';
import { HttpClientService, Manager } from '../service/http-client.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  
  password_test:string;
  manager: Manager = new Manager("","","","","","","","");


  constructor(private httpClientService:HttpClientService, private router: Router) { }

  ngOnInit(): void {
  }

  createManager(): void {
    this.httpClientService.createManager(this.manager)
        .subscribe( data => {
          Swal.fire({
            text:'Manager created successfully.',
            confirmButtonText: 'OK'})

            this.router.navigate(['/login']);   
        });

  };

}
