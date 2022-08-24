import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormControl , FormGroup } from '@angular/forms';
import { AuthService } from './../auth.service';
declare var $:any
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {


  employees:any[]=[]

  constructor(public _AuthService:AuthService) { 
    
    this._AuthService.getsAllEmployees()
   
    
  }


  cp: number = 1;


  // --------------------------------------------------------------------------delete-----------------------------------------------------------------
  id:any
  getId(id:any){
    this.id = id
    
  }

  deleteEmployee(){
    this._AuthService.deleteEmployee(this.id).subscribe((res)=>{
      if (res ===1) {
        $("#Delete").modal("hide")
        this._AuthService.getsAllEmployees()
      }
    })
  }
  // -------------------------------------------------------------------------------------------------------------------------------------------

  // -----------------------------------------------------------------------Edit ----------------------------------------------------------------------
  editEmployee=new FormGroup({
    'empName':new FormControl('',[Validators.required,Validators.minLength(3),Validators.maxLength(10)]),
    'empEmail':new FormControl('',[Validators.required,Validators.email]),
    'empAddress':new FormControl('',[Validators.required,Validators.minLength(3),Validators.maxLength(10)]),
    'empPhone':new FormControl('',[Validators.required,Validators.minLength(11),Validators.maxLength(11)]) //,Validators.pattern(/^{0}[0-9]/)
  })

  get E(){
    return this.editEmployee.controls;
  }

  setValue(){
    for (let index = 0; index < this._AuthService.employees.length; index++) {
      if (this._AuthService.employees[index].empId==this.id) {
        console.log(this._AuthService.employees[index]);
        this.editEmployee.controls.empName.setValue(this._AuthService.employees[index].empName)
        this.editEmployee.controls.empEmail.setValue(this._AuthService.employees[index].empEmail)
        this.editEmployee.controls.empAddress.setValue(this._AuthService.employees[index].empAddress)
        this.editEmployee.controls.empPhone.setValue(this._AuthService.employees[index].empPhone)
        
      }
     
      
    }
  }

  editEmp(){
    let data ={
      empId:this.id,
      empName:this.editEmployee.value.empName,
      empEmail:this.editEmployee.value.empEmail,
      empAddress:this.editEmployee.value.empAddress,
      empPhone:this.editEmployee.value.empPhone,
      
    }
    this._AuthService.editEmployee(data).subscribe((res)=>{
      console.log(res);
      if (res === 1) {
        $("#Edit").modal("hide");
       
        this._AuthService.getsAllEmployees()
        
      }
      
    })
  }

  // --------------------------------------------------------------------------------------------------------------------------------------------------

  ngOnInit(): void {
   
  }

}


  
