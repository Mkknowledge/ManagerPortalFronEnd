import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClientService } from '../service/http-client.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username:string;
  password:string;
  message:any


  constructor(private service: HttpClientService, private router:Router) { }

  ngOnInit(): void {
  }

  // doLogin() {
  //   let resp = this.service.login(this.username,this.password);
  //   alert(resp);
  //   resp.subscribe(data=>{
  //     this.router.navigate(["/viewemployee"]);
  //   })
  // }

  
  doLogin() {
 
      this.router.navigate(["/viewemployee"]);
  }

  signup() {
    this.router.navigate(["/signup"]);
  }

}
