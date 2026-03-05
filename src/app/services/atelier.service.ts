import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Atelier } from '../models/atelier';

@Injectable({
  providedIn: 'root'
})
export class AtelierService {
  url = "http://localhost:3000/ateliers/";

  constructor(private http: HttpClient) {}

  createAtelier(atelier: Atelier): Observable<any> {
    return this.http.post<any>(this.url, atelier);
  }

  readAllAteliers(): Observable<any> {
    return this.http.get<any>(this.url);
  }

  readOneAtelier(id: string): Observable<any> {
    return this.http.get<any>(this.url + id);
  }

  updateAtelier(id: string, atelier: Atelier): Observable<any> {
    return this.http.put<any>(this.url + id, atelier);
  }

  deleteAtelier(id: string): Observable<void> {
    return this.http.delete<void>(this.url + id);
  }
}
