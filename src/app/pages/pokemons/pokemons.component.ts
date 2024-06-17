import { Component, OnInit } from '@angular/core';
import { NzContentComponent } from 'ng-zorro-antd/layout';
import { NzModalService } from 'ng-zorro-antd/modal';
import { detail, pokemonDetail, pokemonItem } from 'src/app/model/pokemons';
import { ServicesService } from 'src/app/services.service';

@Component({
  selector: 'app-pokemons',
  templateUrl: './pokemons.component.html',
  styleUrls: ['./pokemons.component.css']
})

export class PokemonsComponent implements OnInit{

  constructor(private service: ServicesService, private modalService: NzModalService) { }

  listOfData: pokemonItem[] = [] 
  listOfDetails: pokemonDetail = {} as pokemonDetail
  isVisible = false;
  title = ""

  ngOnInit(): void {
    this.service.getPokemons().subscribe(r => {
      if (r.status == 200){
        this.listOfData =  r.body!
      }
    })
  }

  details(url: string, name: string){
    this.title = `Detalle de ${name}`
    this.isVisible = true;

    this.service.getPokemon({
      url: url,
    } as detail).subscribe(r => {
      this.listOfDetails = r.body!
    })

  }

  
  handleOk(): void {
    this.isVisible = false;
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  

}
