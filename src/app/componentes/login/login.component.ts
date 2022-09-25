import { Component, OnInit } from '@angular/core';
import {FormGroup, Validators, FormBuilder} from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ServiciosService } from '../../service/servicios.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formLogin: FormGroup;
  userDefault = // USER DEFAULT
  {
   "email":"andres@gmail.com",
   "password":"1234"
  }
  
  constructor(
    private _formBuilder: FormBuilder,
    public userService: ServiciosService,
    public router: Router ) {

      this.formLogin = this._formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]],
      })
      

     }

  ngOnInit(): void {
    localStorage.clear()
  }

  buscar(email: any, password: any) {
    if(email == this.userDefault.email && password == this.userDefault.password) {
      localStorage.setItem("usuario",email)
      this.router.navigateByUrl('inicio');
    }else{

    }
  }

}
