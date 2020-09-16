import { Component, ElementRef, EventEmitter, OnInit, Output, Renderer2, ViewChild } from '@angular/core';
// import { map } from 'rxjs/operators/map';
import { CountryService } from 'src/app/services/country.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {

  @ViewChild('combo') combo: ElementRef;
  @Output() selectRegion = new EventEmitter<any>();
  regiones: any;

  constructor( private renderer: Renderer2, private countryService: CountryService ) { }

  ngOnInit(): void {
    this.getRegions();
  }

  abrirRegiones() {
    const active = this.combo.nativeElement.classList.contains('active');

    this.renderer[ active ? 'removeClass' : 'addClass' ]( this.combo.nativeElement, 'active' );
  }

  getRegions() {
    this.countryService.getRegions().subscribe( (data: any) => {
      const region = data.map( reg => reg.region );
      this.regiones = Array.from(new Set(region));
    });
  }

  async buscarPorCategoria( region: string ) {
    this.selectRegion.emit(region);
    this.renderer['removeClass'](this.combo.nativeElement, 'active');
  }

}
