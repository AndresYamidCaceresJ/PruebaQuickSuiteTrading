import { Injectable, Output } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
 // import { Observable } from "rxjs/Observable";

@Injectable({
  providedIn: 'root'
})
export class ServiciosService {
  
  url: string = 'https://jsonplaceholder.typicode.com/posts';

  constructor(
    private http: HttpClient) { }

  getConsumirApi(dato:any): Observable<any> {
    return this.http.get<any>(this.url + '/' +  dato);
  }

  postConsumirApi(title: any, body: any, superId: any): Observable<any>{
    return this.http.post<any>(this.url,{
      title: title,
      body: body,
      superId: superId
    });
  }

  putConsumirApi(id: any, title: any, body: any): Observable<any>{
    return this.http.put<any>(this.url + '/' + id,{
      title: title,
      body: body
    });
  }

  deleteConsumirApi(id: any): Observable<any>{
    return this.http.delete<any>(this.url + '/' + id);
  }

}
