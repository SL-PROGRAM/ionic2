import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FilmsProvider} from '../providers/film.provider';
import {Film} from '../models/film';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  private id: string;
  private film: Film;

  constructor(private route : ActivatedRoute, private  filmsProvider : FilmsProvider) {
    this.route.params.subscribe((params) =>{
      this.id = params['id'];
      console.log(this.id);
      this.chargerDetailsFilms()
    });
  }

  async chargerDetailsFilms(){
    this.film = await this.filmsProvider.details(this.id);
  }

  ngOnInit() {

  }

}
