import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable , BehaviorSubject} from 'rxjs'
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _HttpClient:HttpClient) {
    this.getsAllEmployees()
   }
  employees:any[]=[]
  getsAllEmployees(){
    this.getAllEmployee().subscribe((data)=>{

    this.employees=data
      // console.log(this.employees);
    })
      
   
  }

  addEmployee(addFormValue:any):Observable<any>
{
  return this._HttpClient.post('http://task.soft-zone.net/api/Employees/addEmployee',addFormValue )
}
getAllEmployee():Observable<any>
{
  return this._HttpClient.get('http://task.soft-zone.net/api/Employees/getAllEmployees' )
}

deleteEmployee(id:any):Observable<any>
{
  return this._HttpClient.get(`http://task.soft-zone.net/api/Employees/deleteEmpByID/${id}` )
}

editEmployee(editForm:any):Observable<any>
{
  return this._HttpClient.post(`http://task.soft-zone.net/api/Employees/editEmployee`,editForm )
}



}
