import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PokemonserviceProvider } from '../../providers/pokemonservice/pokemonservice';
import {ViewPokemonDetailsPage} from '../view-pokemon-details/view-pokemon-details'
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

   private pokemonList: any;
   private splittedUrl: string[];
   private pokemonId: string;

  constructor(public navCtrl: NavController, public pokemonService: PokemonserviceProvider) {
    this.populatePokemon();
  }

  populatePokemon() {
    console.log("Populate Pokemon method called");
    this.pokemonService.getPokemonList().subscribe(res => {
      console.log(res);
      this.pokemonList = res.results;
    });
  }

  getPokemonImageUrl(pokemon:any){
    console.log("Pokemon Url:"+pokemon.url);
    this.pokemonId = pokemon.url;
    this.splittedUrl = this.pokemonId.split("/");
    console.log(this.splittedUrl);
    this.pokemonId = this.splittedUrl[this.splittedUrl.length-2];
    console.log("Pokemon URL returned is:"+this.splittedUrl+" Pokemon id "+this.pokemonId);
    return "../../assets/images/PokemonAsset/thumbnails/"+this.pokemonId+".png";
  }

  viewPokemonDetails(pokemon:any){
    this.navCtrl.push(ViewPokemonDetailsPage,pokemon);
  }

}
