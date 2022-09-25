import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ServiciosService } from 'src/app/service/servicios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  email = ''
  userDefault = // USER DEFAULT
  {
   "email":"andres@gmail.com",
   "password":"1234"
  }
  correo: string
  url: string = 'https://jsonplaceholder.typicode.com/posts';
  error:any;
  displayedColumns: string[] = ['id', 'title', 'body', 'BOTON'];
  dataSource: MatTableDataSource<any>;
  datos: any [] = []; 
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(
    public userService: ServiciosService,
    public router: Router,
    private http: HttpClient
    ) {
      
      this.correo = this.userDefault.email

     }

  ngOnInit(): void {
    const token = localStorage.getItem("usuario");
    this.validarSesion(token);
    this.datosTabla();
  }

  datosTabla() {
    this.userService.getConsumirApi('').subscribe((response: any) => {
       this.datos = response;
       this.dataSource = new MatTableDataSource<any>(this.datos);
       this.dataSource.paginator = this.paginator
     
   })
  }

  editElemento(id: string) {
    this.router.navigate(['edit',id]);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  validarSesion(token: any) {
    if (token != null) {
    }else{
      this.router.navigateByUrl('login');
    }
  }

  cerrarSesion() {
    localStorage.clear();
    this.router.navigateByUrl('login');
  }

  agregar() {
    this.router.navigateByUrl('add');
  }

  eliminar(elemento: any) {
    Swal.fire({
      title: 'Desea eliminar el elemento con el Id ' + elemento.id,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'No, cancelar'
    }).then(result => {
      if (result.value) {
        this.userService.deleteConsumirApi(elemento).subscribe((response: any) => {
            this.datosTabla();
       })
      }
    });
  }

}
