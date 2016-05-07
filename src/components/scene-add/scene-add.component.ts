import { Component, EventEmitter, OnInit, Input, Output } from 'angular2/core';
import { Scene } from '../../services/scene';

@Component({
    selector: 'scene-add',
    templateUrl: 'src/components/scene-add/scene-add.component.html',
    styleUrls: ['src/components/scene-add/scene-add.component.css'],
    directives: [],
})
export class SceneAddComponent {
    @Output() added = new EventEmitter();
    errorMessage: string;

    constructor() { }

    addScene() {
        this.added.next('add');
    }
}
