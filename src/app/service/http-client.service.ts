import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

export class Employee{
  constructor(
    public empId:number,
    public firstname:string,
    public lastname:string,
    public email:string,
    public address:string,
    public dob: string,
    public mobile:string,
    public city:string
  ) {}
}

export class Manager{
  constructor(
    public email:string,
    public username:string,
    public firstname:string,
    public lastname:string,
    public password:string,
    public address:string,
    public dob: string,
    public company:string
  ) {}
}

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  constructor(private httpClient:HttpClient) { }

  public login(username:string, password:string){
    const headers = new HttpHeaders({Authentication : 'Basic '+btoa(username+":"+password)});
    return this.httpClient.get('http://localhost:8080/login',{headers, responseType: 'text'});
  }

  public getUsers(){
    let username="kmayur7777";
    let password:"123123123";
    const headers = new HttpHeaders({Authentication : 'Basic '+btoa(username+":"+password)});
    return this.httpClient.get('http://localhost:8080/',{headers});
  }

  public createManager(manager) {
    return this.httpClient.post<Manager>("http://localhost:8080/secure/manager/add", manager);
  }

  public getEmployees() {
    return this.httpClient.get<Employee[]>('http://localhost:8080/employees');
  }

  public getEmployee(employee) {
    return this.httpClient.get<Employee>("http://localhost:8080/employees/employee" + "/"+ employee.id);
  }

  public updateEmployee(employee) {
    return this.httpClient.put<Employee>("http://localhost:8080/employees" + "/"+ employee.id, {});
  } 

  public deleteEmployee(employee) {
    return this.httpClient.delete<Employee>("http://localhost:8080/employees" + "/"+ employee.id);
  }

  public createEmployee(employee) {
    return this.httpClient.post<Employee>("http://localhost:8080/employees", employee);
  }
}
