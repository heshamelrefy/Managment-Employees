import { Component, OnInit,Input } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormControl , FormGroup } from '@angular/forms';
import { AuthService } from './../auth.service';


declare var $:any
@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  
  constructor(private _AuthService:AuthService) { }

  addForm = new FormGroup({
    'empName':new FormControl('',[Validators.required,Validators.minLength(3),Validators.maxLength(10)]),
    'empEmail':new FormControl('',[Validators.required,Validators.email]),
    'empAddress':new FormControl('',[Validators.required,Validators.minLength(3),Validators.maxLength(10)]),
    'empPhone':new FormControl('',[Validators.required,Validators.minLength(11),Validators.maxLength(11),Validators.pattern(/01[0125][0-9]{8}/)]) 
  })

  get f(){
    return this.addForm.controls;
  }
  getAddInfo(){
    console.log("hesham");

    console.log(this.addForm.value);
     if (this.addForm.valid == true) {
      this._AuthService.addEmployee(this.addForm.value).subscribe((data)=>{
        console.log(data);
        
        if (data === 1) {
          console.log(data);
          $("#Add").modal("hide")
          this.addForm.reset()
          this._AuthService.getsAllEmployees()
         
          
          
        }
       
        
      })
    }
    
 
  }

  ngOnInit(): void {
  }

}
