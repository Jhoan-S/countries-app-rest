import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { CountryService } from 'src/app/services/country.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  borders    : any;
  country    : any;
  languages  : any;
  currencies : any;

  constructor( private countryService: CountryService, private route: ActivatedRoute, private tittle: Title, private ruta:Router ) { }

  ngOnInit(): void {
    this.route.params.subscribe( params => this.getCountry( params.code ) );
  }

  async getCountry( code: string ) {

    this.borders = [];

    this.country = await this.countryService.getCountry( code ).toPromise();

    this.tittle.setTitle(this.country.name);
    this.currencies = await this.country.currencies.map( curr => curr.name ).join(', ');
    this.languages  = await this.country.languages.map( lang => lang.name ).join(', ');

    this.country.borders.forEach( async alphaCode => {
      const pais = await this.countryService.getBordersByCountry( alphaCode ).toPromise();
      this.borders.push(pais);
    });
  }

  detail( code: string ) {
    this.ruta.navigate([`detail/${ code }`]);
  }

}
