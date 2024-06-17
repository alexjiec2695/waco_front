import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { users } from './model/users';
import { Observable } from 'rxjs';
import { detail, pokemonDetail, pokemonItem } from './model/pokemons';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  private env = environment;
  private urlBase = this.env.URL;

  httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  httpOptionsUpload = {
    headers: new HttpHeaders({
      'Content-Type': 'multipart/form-data',
      Accept: 'application/json'
    })
  };


  constructor(private http: HttpClient) { }


  login(datos: users): Observable<HttpResponse<any>> {
    return this.http.post<any>(`${this.urlBase}/Login`, datos,
      { headers: this.httpOptions.headers, observe: 'response' }
    )
  }

  updateUsers(datos: users): Observable<HttpResponse<any>> {
    return this.http.put<any>(`${this.urlBase}/Users`, datos,
      { headers: this.httpOptions.headers, observe: 'response' }
    )
  }

  getUser(id: string): Observable<HttpResponse<users>> {
    return this.http.get<users>(`${this.urlBase}/User/${id}`,
      { observe: 'response' }
    )
  }
  
  createUser(user: users): Observable<HttpResponse<any>> {
    return this.http.post<any>(`${this.urlBase}/Users`, user,
      { headers: this.httpOptions.headers, observe: 'response' }
    )
  }

  getPokemons(): Observable<HttpResponse<pokemonItem[]>> {
    return this.http.get<pokemonItem[]>(`${this.urlBase}/pokemons`,
      { observe: 'response' }
    )
  }

  getPokemon(data: detail): Observable<HttpResponse<pokemonDetail>> {
    return this.http.post<pokemonDetail>(`${this.urlBase}/pokemon`, data,
      { headers: this.httpOptions.headers, observe: 'response' }
    )
  }


}
