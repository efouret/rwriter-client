import { Component, EventEmitter, OnInit, Input, Output } from 'angular2/core';
import { Scene } from '../../services/scene';

@Component({
    selector: 'scene-add',
    templateUrl: 'src/components/scene-add/scene-add.component.html',
    styleUrls: ['src/components/scene-add/scene-add.component.css'],
    directives: [],
})
export class SceneAddComponent implements OnInit {
    @Input() pos: string;
    @Output() added = new EventEmitter();
    errorMessage: string;

    constructor() { }

    ngOnInit() {

    }

    addScene() {
        this.added.next(this.pos);
    }
}
