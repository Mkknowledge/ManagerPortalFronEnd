import { Component, OnInit } from '@angular/core';
import { HttpClientService } from './../service/http-client.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-stripe',
  templateUrl: './stripe.component.html',
  styleUrls: ['./stripe.component.css']
})
export class StripeComponent implements OnInit {

  constructor(private httpClientService:HttpClientService) { }

  loadStripe() {
     
    if(!window.document.getElementById('stripe-script')) {
      var s = window.document.createElement("script");
      s.id = "stripe-script";
      s.type = "text/javascript";
      s.src = "https://checkout.stripe.com/checkout.js";
      window.document.body.appendChild(s);
    }
}

  ngOnInit(): void{
    this.loadStripe();
  }
   headers;

   
  pay(amount) {    
    let token:any;
    let subscriptionType;
    if(amount < 649){
      subscriptionType = "BASIC";
    } else if(amount < 799){
      subscriptionType = "STANDARD";
    } else {
      subscriptionType = "PREMIUM";
    }

    let emailID;
    

    var handler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_51IaUAYSIYukUv1v2JQQFZE3R4yi4Gq7yX7djVz5PGZZ7972Bj1mveMwrUdcESLHdjmUsnVK4afRnaLC1zJPaLxwY00SuQcLe27',
      locale: 'auto',
      token: function (token: any) {
        emailID = token.email;
        console.log(emailID)
        //alert('Token Created!!');
        const headers = new Headers({'token': token, 'amount': amount, 'subscriptionType': subscriptionType, 'email': emailID});
    
       return this.httpClientService.storeSubscription(headers).subscribe( data => {
          Swal.fire({
            text:'Successfully Subscribed.',
            confirmButtonText: 'OK'})
        });
        
      }
    });
 
    handler.open({
      name: 'Enter Details',
      description: 'Subscription Payment',
      amount: amount * 100
    });


}

storeInfo(headers){
  this.httpClientService.storeSubscription(headers).subscribe( data => {
  Swal.fire({
    text:'Successfully Subscribed.',
    confirmButtonText: 'OK'})
});

}



}


