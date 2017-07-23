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

  pokemonListUri:string = "http://pokeapi.co/api/v2/pokemon";
  pokemonDetailsUri:string = "http://pokeapi.co/api/v2/pokemon/";


  constructor(public http: Http) {
    console.log('Hello PokemonserviceProvider Provider');
  }

  getPokemonList(){
    return this.http.get(this.pokemonListUri).map(res => res.json());
  }

  getPokemonDetails(pokemonId:string){
    console.log("getPokemonDetails called with param: "+pokemonId)
    var pokemonDetailsUrlFinal:string = this.pokemonDetailsUri+pokemonId+"/";
    console.log("finalUrl: "+pokemonDetailsUrlFinal);
    return this.http.get(this.pokemonDetailsUri+pokemonId+"/").map(res => res.json());
  }


}
