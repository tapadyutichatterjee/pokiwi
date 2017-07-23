import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Pokemon } from '../../interface/pokemon';
import { PokemonserviceProvider } from '../../providers/pokemonservice/pokemonservice';
/**
 * Generated class for the ViewPokemonDetailsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-view-pokemon-details',
  templateUrl: 'view-pokemon-details.html',
})
export class ViewPokemonDetailsPage {

  pokemonName: any;
  pokemonUrl: string;
  pokemon: Pokemon;

  constructor(public navCtrl: NavController, public navParams: NavParams, public pokemonService: PokemonserviceProvider) {
    //get the pokemon details
    this.pokemonUrl = navParams.get("url");
    var splittedUrl:string[] = this.pokemonUrl.split("/");
    var pokemonId = splittedUrl[splittedUrl.length-2];
    this.pokemonService.getPokemonDetails(pokemonId).subscribe(res => {
      console.log("Tring to get response: ");
      console.log(res)
      this.populatePokemon(res);
    });
  }

  ionViewDidLoad() {
    
  }

  private populatePokemon(response:any){
    this.pokemon = new PokemonDetails();
    this.pokemon.name = response.name;
    this.pokemon.baseExperience = response.base_experience;
    this.pokemon.height = response.height;
    this.pokemon.id = response.id;
    this.pokemon.url = this.navParams.get("url");
    this.pokemon.weight = response.weight;
    console.log("Populating pokemon Details: "+JSON.stringify(this.pokemon));
  }

   getPokemonImageUrl(pokemon:Pokemon){
    return "../../assets/images/PokemonAsset/high-resolution/"+pokemon.id+".svg";
  }
}
class PokemonDetails implements Pokemon{
  id:number;
  url:string;
  name:string;
  height:number;
  weight:number;
  baseExperience:number;
}
