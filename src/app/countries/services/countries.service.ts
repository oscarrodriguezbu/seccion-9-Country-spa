import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of, map } from 'rxjs';

import { Country } from '../interfaces/country';

@Injectable({ providedIn: 'root' })
export class CountriesService {

  private apiUrl: string = 'https://restcountries.com/v3.1'

  constructor(private http: HttpClient ) { } //Inyeccion

  searchCountryByAlphaCode( code: string ): Observable<Country | null> {

    const url = `${ this.apiUrl }/alpha/${ code }`;

    return this.http.get<Country[]>( url )
      .pipe( //recibir un arreglo vacio si no se cumple la condicion
        map( countries => countries.length > 0 ? countries[0]: null ), //el map transforma
        catchError( () => of(null) ) //si hay error, regresa un arreglo vacio
      );
  }


  searchCapital( term: string ): Observable<Country[]> {

    const url = `${ this.apiUrl }/capital/${ term }`;
    return this.http.get<Country[]>( url )
      .pipe(
        catchError( () => of([]) )
      );
  }

  searchCountry( term: string ): Observable<Country[]> {

    const url = `${ this.apiUrl }/name/${ term }`;
    return this.http.get<Country[]>( url )
      .pipe(
        catchError( () => of([]) )
      );
  }

  searchRegion( region: string ): Observable<Country[]> {

    const url = `${ this.apiUrl }/region/${ region }`;
    return this.http.get<Country[]>( url )
      .pipe(
        catchError( () => of([]) )
      );
  }


}
