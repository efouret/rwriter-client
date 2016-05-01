import { Component, OnInit, Input } from 'angular2/core';
import { Scene } from '../../services/scene';

@Component({
    selector: 'scene-add',
    templateUrl: 'src/components/scene-add/scene-add.component.html',
    styleUrls: ['src/components/scene-add/scene-add.component.css'],
    directives: [],
})
export class SceneAddComponent implements OnInit {
    @Input() chapterId: string;
    errorMessage: string;

    constructor() { }

    ngOnInit() {

    }
}
