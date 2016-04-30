import { Component, Input, OnInit } from 'angular2/core';
import { Character } from '../../services/character';
import { Link } from '../../services/link';
import { RouteParams, Router, ROUTER_DIRECTIVES } from 'angular2/router';
import { CharacterService } from '../../services/character.service';
import { ProjectNavComponent } from '../project-nav/project-nav.component';

@Component({
    selector: 'characters',
    templateUrl: 'src/components/characters/characters.component.html',
    styleUrls: ['src/components/characters/characters.component.css'],
    directives: [ROUTER_DIRECTIVES, ProjectNavComponent]
})
export class CharactersComponent implements OnInit {
    characters: Character[];
    errorMessage: string;
    id: string;
    creatingNew: boolean = false;
    character: Character;

    constructor(
        private _router: Router,
        private _characterService: CharacterService,
        private _routeParams: RouteParams) {
    }

    ngOnInit() {
        this.id = this._routeParams.get('id');
        this._characterService.getCharacters(this.id)
            .subscribe(
            characters => this.characters = characters,
            error => this.errorMessage = <any>error);
    }

    createNewCharacter() {
        this.creatingNew = true;
        this.character = new Character();
        this.character.project = new Link();
        this.character.project.id = this.id;
    }

    saveCharacter() {
        console.log('will create...');
        console.log(this.character);

        this._characterService.createCharacter(this.character)
            .subscribe(characterId => {
                this._characterService.getCharacter(characterId.substr(characterId.lastIndexOf('/') + 1))
                .subscribe(character => {
                    this.characters.push(character);
                    this.creatingNew = false;
                },
                error => this.errorMessage = <any>error);
            },
            error => this.errorMessage = <any>error);
    }
}
