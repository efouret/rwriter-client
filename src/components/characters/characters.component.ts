import {Component, Input, OnInit} from 'angular2/core';
import {Character} from '../../services/character';
import { RouteParams, Router, ROUTER_DIRECTIVES } from 'angular2/router';
import { CharacterService } from '../../services/character.service';

@Component({
    selector: 'characters',
    templateUrl: 'src/components/characters/characters.component.html',
    styleUrls: ['src/components/characters/characters.component.css'],
    directives: [ROUTER_DIRECTIVES]
})
export class CharactersComponent implements OnInit {
    @Input()
    characters: Character[];
    errorMessage: string;

    constructor(
        private _router: Router,
        private _characterService: CharacterService,
        private _routeParams: RouteParams) {
    }

    ngOnInit() {
        let id = this._routeParams.get('id');
        this._characterService.getCharacters(id)
            .subscribe(
            characters => this.characters = characters,
            error => this.errorMessage = <any>error);
    }

    goBack() {
        window.history.back();
    }
}
