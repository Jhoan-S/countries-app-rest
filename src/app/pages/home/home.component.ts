import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CountryService } from 'src/app/services/country.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  countries : any = [];
  filtro    : Observable<string[]>;

  constructor( private countryService: CountryService, private router: Router, private tittle: Title ) { 
    this.tittle.setTitle('Where in the World?');
  }

  ngOnInit(): void {
    this.getCountries();
  }

  async getCountries(){
    this.countries = await this.countryService.getCountries().toPromise();
  }

  details( id: string ) {
    this.router.navigate([`detail/${ id.toLowerCase() }`]);
  }

  searchCountry( termino: string ) {
    const paises   = this.countries;
    this.filtro    = paises.filter( item => item.name.toLocaleLowerCase().indexOf(termino.toLocaleLowerCase()) !== -1 );
    this.countries = this.filtro;
  }

  filterByRegion( event ) {
    if (event === 'zero') {
      this.countryService.getCountries().subscribe( countries => this.countries = countries );
    } else {
      this.countryService.getCountriesByRegion(event).subscribe( filteredCountries => this.countries = filteredCountries );
    }
  }

}
