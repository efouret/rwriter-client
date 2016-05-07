import { Component, EventEmitter, OnInit, Input, Output } from 'angular2/core';
import { Scene } from '../../services/scene';

@Component({
    selector: 'scene-del',
    templateUrl: 'src/components/scene-del/scene-del.component.html',
    styleUrls: ['src/components/scene-del/scene-del.component.css'],
    directives: [],
})
export class SceneDelComponent {
    @Output() deleted = new EventEmitter();
    errorMessage: string;

    constructor() { }

    delScene() {
        this.deleted.next('del');
    }
}
