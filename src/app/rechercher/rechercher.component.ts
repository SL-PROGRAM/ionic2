import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Button } from 'protractor';
import { FilmsProvider } from '../providers/film.provider';

@Component( {
    selector: 'app-rechercher',
    templateUrl: './rechercher.Component.html',
    styleUrls: [ './rechercher.component.scss'],
})
export class RechercherComponent implements OnInit          {
    public binding : string = 'Bonjour CDA';
    public type : string = '';
    public title : string = '';
    public year : number;
    public error : string = '';
    public films = [];

    
    constructor(private alertCtrl : AlertController,
         private rechercherFilm : FilmsProvider,
         ){
            }

    ngOnInit(){}

    clicBouton(){
        this.binding = 'clic !!!';
    }




    //Vérification des champs
    public async rechercher(){
        this.error = '';
        if(!this.title || this.title.length < 3){
            const alert  = await this.alertCtrl.create({
                header : 'In formation manquante',
                message : "Veuillez saisir un titre de 3 caractères"
            });
            alert.present();
            this.error="Veuillez saisir un titre de 3 caractères";
            return;
        }
        if(this.year !== undefined && this.year !== null && (this.year > 2050 || this.year < 1900)){
            this.error="Veuillez saisir une année entre 1900 et 2050";
            return;
        }
        if(!this.type === undefined){
            this.error="Veuillez choisir un type de média";
            return;
        }
        this.lancerRecherche();
    }

    private lancerRecherche(){
        this.rechercherFilm.search(this.title, this.year, this.type)
        .then((resultat) => {
            this.films = resultat;
        })
        .catch(async (err) =>{
            const alert = await this.alertCtrl.create({
                header : 'Erreur appel Service',
                message : "Impossible de recupérer les films",
                buttons:['OK']
            });
            alert.present();
        });
    }
}
