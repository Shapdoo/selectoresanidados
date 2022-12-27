import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { combineLatest, Observable, of } from 'rxjs';
import { PaisCC3, PaisSmall } from '../interfaces/paises.interfaces';

@Injectable({
  providedIn: 'root'
})
export class PaisesService {
  
  private _baseUrl = "https://restcountries.com/v3.1"

  private _regions: string[] = [
    'Africa',
    'Americas',
    'Asia',
    'Europe',
    'Oceania',
  ];

  constructor(private _http: HttpClient) {}

  get regiones() {
    return [...this._regions];
  }

  getPaisesPorRegion(region: string): Observable<PaisSmall[]>{

    const URL =  `${ this._baseUrl }/region/${ region }?fields=name,cca3`
    return this._http.get<PaisSmall[]>(URL)
  }

  getPaisesPorCCA3(codigo: string): Observable<PaisCC3[] | null>{

    if(!codigo) return of(null)

    const URL = `${ this._baseUrl }/alpha/${ codigo }`
    return this._http.get<PaisCC3[]>(URL)
  }

  getPaisPorCodigoSmall( codigo: string ): Observable<PaisSmall>{
    const URL = `${ this._baseUrl }/alpha/${ codigo }?fields=cca3,name`
    return this._http.get<PaisSmall>(URL)
  } 

  getPaisesPorCodigos( borders: string[]): Observable<PaisSmall[]>{
    if(!borders) return of([])
    const peticiones: Observable<PaisSmall>[] = []

    borders.forEach(codigo => {
      const peticion = this.getPaisPorCodigoSmall(codigo)
      peticiones.push(peticion)
    })

    return combineLatest(peticiones)
  }
}
