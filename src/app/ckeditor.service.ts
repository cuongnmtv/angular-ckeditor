import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';

import { Observable } from 'rxjs';
import { Hero } from './hero';

@Injectable({
  providedIn: 'root'
})
export class CkeditorService {
  private url = "http://localhost:8080/api/heroes";

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  getHeroes(): Observable<ReponseHeroes> {
    return this.http.get<ReponseHeroes>(this.url);
  }
}
interface ReponseHeroes {
  success: boolean;
  errorCode: number;
  message: string;
  data: Hero[];
}
