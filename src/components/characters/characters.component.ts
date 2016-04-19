import { Component, Input, OnInit } from 'angular2/core';
import { Character } from '../../services/character';
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

    goBack() {
        window.history.back();
    }
}
