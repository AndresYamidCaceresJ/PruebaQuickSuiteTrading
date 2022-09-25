import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiciosService } from 'src/app/service/servicios.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  
  formAdd: FormGroup;
  id: any = ''

  constructor(
    private _formBuilder: FormBuilder,
    private userService: ServiciosService,
    private router: Router) {
    this.formAdd = this._formBuilder.group({
      title: ['', [Validators.required]],
      body: ['', [Validators.required]],
    }) 
  }

  ngOnInit(): void {
    const token = localStorage.getItem("usuario");
    this.validarSesion(token);
  }

  validarSesion(token: any) {
    if (token != null) {
    }else{
      this.router.navigateByUrl('login');
    }
  }

  add(title: any, body: any) {
    this.userService.postConsumirApi(title, body, 1).subscribe((response: any) => {
        if(response.id > 0) {
          this.router.navigateByUrl('inicio');
        }
  })
  }

}
