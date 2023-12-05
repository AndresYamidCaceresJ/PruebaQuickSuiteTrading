import { Injectable, Output } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ServiciosService {

  constructor(
    private http: HttpClient) { }

}
