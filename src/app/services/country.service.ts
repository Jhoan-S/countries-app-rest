import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  constructor( private httpClient: HttpClient ) { }

  getQuery( query: string ) {
    const urlBase = `https://restcountries.eu/rest/v2/${ query }`;

    return this.httpClient.get(urlBase);
  }

  getCountries() {
    return this.getQuery('all');
  }

  getCountry( code: string ) {
    return this.getQuery(`alpha/${ code }?fields=name;capital;flag;nativeName;population;region;subregion;topLevelDomain;currencies;languages;borders`);
  }

  getBordersByCountry( code: string ) {
    return this.getQuery(`alpha/${ code }?fields=name;alpha3Code;`).pipe( map( (response: any) => ({ name: response.name, code: response.alpha3Code.toLowerCase() }) ) );
  }

  getRegions() {
    return this.getQuery(`all?fields=region`);
  }

  getCountriesByRegion( region: string ) {
    return this.getQuery(`region/${ region }`);
  }
}
