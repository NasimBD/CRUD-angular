//THESE STEPS ARE NECESSARY TO ACCESS DATA AND API: https://www.npmjs.com/package/json-server for fake server (1: npm i -g json-server  2: json-server --watch db.json )

import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Employee} from "./Employee";
import {ApiService} from "./shared/api.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: []
})
export class AppComponent implements OnInit{
  formValue: FormGroup;
  employeeModelObj: Employee = new Employee();
  employeeData : any;
  showAddBtn: boolean;
  showUpdateBtn: boolean;

  constructor(private formBuilder: FormBuilder, private api: ApiService) {
  }

  ngOnInit():void{
    this.formValue = this.formBuilder.group({
      firstName : [''],
      lastName : [''],
      email : [''],
      mobile : [''],
      salary : ['']
    })
    this.getAllEmployee();
  };

  clickAddEmployee(){
    this.formValue.reset();
    this.showAddBtn = true;
    this.showUpdateBtn =false;
  }

  postEmployeeDetails(){
    this.employeeModelObj.firstName = this.formValue.value.firstName;
    this.employeeModelObj.lastName = this.formValue.value.lastName;
    this.employeeModelObj.email = this.formValue.value.email;
    this.employeeModelObj.mobile = this.formValue.value.mobile;
    this.employeeModelObj.salary = this.formValue.value.salary;

    this.api.postEmployee(this.employeeModelObj).subscribe((res) =>{
      console.log(res);
      alert("Employee Added Successfully");
      let ref = document.getElementById('cancel');
      ref?.click();
      this.formValue.reset();
      this.getAllEmployee();
    },
      (err) => {
      alert("Somrthing went wrong");
      })
  }

  getAllEmployee(){
    this.api.getEmployee().subscribe((res) => {
      this.employeeData = res;
    })
  }

  deleteEmployee(id: number){
    this.api.deleteEmployee(id).subscribe((res) => {
      alert("Employee Deleted Successfully");
      this.getAllEmployee();
    },
      (err) => {
        console.log(err);
      })
  }

  editEmployee(data: Employee){
    this.showAddBtn = false;
    this.showUpdateBtn =true;
    this.employeeModelObj.id = data.id;
    this.formValue.controls['firstName'].setValue(data.firstName);
    this.formValue.controls['lastName'].setValue(data.lastName);
    this.formValue.controls['email'].setValue(data.email);
    this.formValue.controls['mobile'].setValue(data.mobile);
    this.formValue.controls['salary'].setValue(data.salary);
  }

  updateEmployee(){
    this.employeeModelObj.firstName = this.formValue.value.firstName;
    this.employeeModelObj.lastName = this.formValue.value.lastName;
    this.employeeModelObj.email = this.formValue.value.email;
    this.employeeModelObj.mobile = this.formValue.value.mobile;
    this.employeeModelObj.salary = this.formValue.value.salary;

    this.api.updateEmployee(this.employeeModelObj, this.employeeModelObj.id).subscribe((res) => {
      alert("Employee Updated Successfully");
      let ref = document.getElementById('cancel');
      ref?.click();
      this.formValue.reset();
      this.getAllEmployee();
    })
  }
}
