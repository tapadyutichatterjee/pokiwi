import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the PokemonserviceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class PokemonserviceProvider {

  uri:string = "http://pokeapi.co/api/v2/pokemon";
  constructor(public http: Http) {
    console.log('Hello PokemonserviceProvider Provider');
  }

  getPokemonList(){
    return this.http.get(this.uri).map(res => res.json());
  }

}
