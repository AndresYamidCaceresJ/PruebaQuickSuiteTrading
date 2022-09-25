import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiciosService } from 'src/app/service/servicios.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  
  formEdit: FormGroup;
  id: any = ''

  constructor(
    private _formBuilder: FormBuilder,
    private userService: ServiciosService,
    private router: Router,
    private route: ActivatedRoute) {
      this.formEdit = this._formBuilder.group({
        title: ['', [Validators.required]],
        body: ['', [Validators.required]],
      })  }

  ngOnInit(): void {
    const token = localStorage.getItem("usuario");
    this.validarSesion(token);
    this.id = this.route.snapshot.paramMap.get('id')
    this.userService.getConsumirApi(this.id).subscribe((response: any) => {
      this.formEdit.get('title')!.setValue(response.title);
      this.formEdit.get('body')!.setValue(response.body);
    })
  }

  validarSesion(token: any) {
    if (token != null) {
    }else{
      this.router.navigateByUrl('login');
    }
  }
  
  edit(title: any, body: any) {
    this.userService.putConsumirApi(this.id, title, body).subscribe((response: any) => {
        if(response.id > 0) {
         this.router.navigateByUrl('inicio');
        }
    })
  }

}
