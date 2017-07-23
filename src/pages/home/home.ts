import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PokemonserviceProvider } from '../../providers/pokemonservice/pokemonservice';
import { ViewPokemonDetailsPage } from '../view-pokemon-details/view-pokemon-details'
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private pokemonList: any;
  private splittedUrl: string[];
  private pokemonId: string;
  private next: string;
  private previous: string;

  constructor(public navCtrl: NavController, public pokemonService: PokemonserviceProvider) {
    this.populatePokemon();
  }

  populatePokemon() {
    this.pokemonService.getPokemonList().subscribe(res => {
      this.pokemonList = res.results;
      this.next = res.next;
      this.previous = res.previous;
    });
  }

  getPokemonImageUrl(pokemon: any) {
    this.pokemonId = pokemon.url;
    this.splittedUrl = this.pokemonId.split("/");
    this.pokemonId = this.splittedUrl[this.splittedUrl.length - 2];
    return "assets/images/PokemonAsset/thumbnails/" + this.pokemonId + ".png";
  }

  viewPokemonDetails(pokemon: any) {
    this.navCtrl.push(ViewPokemonDetailsPage, pokemon);
  }

  previousPressed() {
    console.log("Previous Prssed with url: " + this.previous);
    this.pokemonService.getPaginatedPokemonList(this.previous).subscribe(res => {
      this.pokemonList = res.results;
      this.next = res.next;
      this.previous = res.previous;
    });
  }

  nextPressed() {
    console.log("Next Prssed with url: " + this.next);
    this.pokemonService.getPaginatedPokemonList(this.next).subscribe(res => {
      this.pokemonList = res.results;
      this.next = res.next;
      this.previous = res.previous;
    });
  }

  isPreviousDisabled(){
    return this.previous;
  }
  isNextDisabled() {
    return this.next;
  }

}
