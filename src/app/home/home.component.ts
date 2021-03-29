import { Component, OnInit } from '@angular/core';
import { HttpClientService } from '../service/http-client.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  users:any;
  constructor(private httpClientService:HttpClientService) { }

  ngOnInit(): void {
  }

  getUsers(){
    let resp = this.httpClientService.getUsers();
    resp.subscribe(data=>
      this.users=data
    );
  }

}
