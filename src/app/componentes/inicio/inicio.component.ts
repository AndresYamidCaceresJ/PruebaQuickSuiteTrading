import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ServiciosService } from 'src/app/service/servicios.service';
import { default as _rollupMoment, Moment } from 'moment';
import 'moment/locale/es'
import * as _moment from 'moment';
const moment = _rollupMoment || _moment;

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
  peliculas = [
    {
      id: "1",
      Title: 'Tenet',
      Description: 'Armed with only one word, Tenet, and fighting for the survival of the entire world, a Protagonist journeys through a twilight world of international espionage on a mission that will unfold in something beyond real time.',
      Rating: 7.8,
      Duration: '2h 30 min',
      Genre: 'Action, Sci-Fi',
      Released_date: '3 September 2020',
      Trailer_Link: 'https://www.youtube.com/watch?v=LdOM0x0XDMo',
      png: 'assets/Tenet.png'
    },
    {
      id: "2",
      Title: 'Spider-Man: Into the Spider-Verse',
      Description: 'Teen Miles Morales becomes the Spider-Man of his universe, and must join with five spider-powered individuals from other dimensions to stop a threat for all realities.',
      Rating: 8.4,
      Duration: '1h 57min',
      Genre: 'Action, Animation, Adventure',
      Released_date: '14 December 2018',
      Trailer_Link: 'https://www.youtube.com/watch?v=tg52up16eq0',
      png: 'assets/Spider Man.png'
    },
    {
      id: "3",
      Title: 'Knives Out',
      Description: 'A detective investigates the death of a patriarch of an eccentric, combative family.', 
      Rating: 7.9,
      Duration: '2h 10min',
      Genre: 'Comedy, Crime, Drama',
      Released_date: '27 November 2019',
      Trailer_Link: 'https://www.youtube.com/watch?v=qGqiHJTsRkQ',
      png: 'assets/Knives Out.png'
    },
    {
      id: "4",
      Title: 'Guardians of the Galaxy',
      Description: 'A group of intergalactic criminals must pull together to stop a fanatical warrior with plans to purge the universe.',
      Rating: 8.0,
      Duration: '2h 1min',
      Genre: 'Action, Adventure, Comedy',
      Released_date: '1 August 2014',
      Trailer_Link: 'https://www.youtube.com/watch?v=d96cjJhvlMA',
      png: 'assets/Guardians of The Galaxy.png'
    },
    {
      id: "5",
      Title: 'Avengers: Age of Ultron',
      Description: "When Tony Stark and Bruce Banner try to jump-start a dormant peacekeeping program alled Ultron, things go horribly wrong and it's up to Earth's mightiest heroes to stop the villainous Ultron from enacting his terrible plan.",
      Rating: 7.3,
      Duration: '2h 21min',
      Genre: 'Action, Adventure, Sci-Fi',
      Released_date: '1 May 2015',
      Trailer_Link: 'https://www.youtube.com/watch?v=tmeOjFno6Do',
      png: 'assets/Avengers.png'
    }
  ]

  correo: string
  listaObservacion: any[] = [];
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
  }


  editElemento(id: string) {
    this.router.navigate(['edit',id]);
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

ordenarPorTitulo() {
  this.peliculas.sort((a, b) => a.Title.localeCompare(b.Title));
}

ordenarPorFechaLanzamiento() {
  this.peliculas.sort((a, b) => parseInt(moment(a.Released_date).format('yyyyMMDD'))  - parseInt(moment(b.Released_date).format('yyyyMMDD')));
}

  agregarAListaObservacion(pelicula: any) {
    if (!this.listaObservacion.some(p => p.Title === pelicula.Title)) {
      this.listaObservacion.push(pelicula);
      localStorage.setItem('listaObservacion', JSON.stringify(this.listaObservacion));
    }
  }

  quitarDeListaObservacion(pelicula: any) {
    this.listaObservacion = this.listaObservacion.filter(p => p.Title !== pelicula.Title);
    localStorage.setItem('listaObservacion', JSON.stringify(this.listaObservacion));
  }

  estaEnListaObservacion(pelicula: any): boolean {
    const listaObservacionStr = localStorage.getItem('listaObservacion');

    if (!listaObservacionStr) {
      return false;
    }

    const listaObservacion: any[] = JSON.parse(listaObservacionStr);
    return listaObservacion.some(p => p.id === pelicula.id);
  }

  irADetallesPelicula(id: string) {
    this.router.navigate(['/detalles', id]);
  }

}
