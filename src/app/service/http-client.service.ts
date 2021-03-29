import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export class Employee{
  constructor(
    public empId:number,
    public firstname:string,
    public lastname:string,
    public email:string,
    public address:string,
    public dob: string,
    public mobile:string,
    public city:string,
    public role:string
  ) {}
}

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  constructor(private httpClient:HttpClient) { }

  getEmployees()
  {
    console.log("test call");
    return this.httpClient.get<Employee[]>('http://localhost:8080/employees');
  }

  public getEmployee(employee) {
    return this.httpClient.get<Employee>("http://localhost:8080/employees/employee" + "/"+ employee.empId);
  }

  public updateEmployee(employee) {
    return this.httpClient.put<Employee>("http://localhost:8080/employees" + "/"+ employee.empId, {});
  } 

  public deleteEmployee(employee) {
    return this.httpClient.delete<Employee>("http://localhost:8080/employees" + "/"+ employee.empId);
  }

  public createEmployee(employee) {
    return this.httpClient.post<Employee>("http://localhost:8080/employees", employee);
  }
}
