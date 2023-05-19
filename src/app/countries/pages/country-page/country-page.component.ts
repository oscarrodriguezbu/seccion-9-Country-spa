import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CountriesService } from '../../services/countries.service';
import { switchMap } from 'rxjs';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-country-page',
  templateUrl: './country-page.component.html',
  styles: [
  ]
})
export class CountryPageComponent implements OnInit {

  public country?: Country;

  // inyecciones
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private countriesService: CountriesService,
  ) {}

  ngOnInit(): void {
    // observable dentro de un observable
    this.activatedRoute.params
      .pipe(
        //recibe el valor anterior y regresa un nuevo observable, el id viene de los params
        switchMap( ({ id }) => this.countriesService.searchCountryByAlphaCode( id )),
      )
      //suscribirse al resultado del anterior observable
      .subscribe( country => {
        if ( !country ) return this.router.navigateByUrl('');
        return this.country = country;
      });
  }




}
