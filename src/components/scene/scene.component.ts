import { Component, OnInit, Input } from 'angular2/core';
import { Router } from 'angular2/router';

import { SceneAddComponent } from '../scene-add/scene-add.component';

import { Scene } from '../../services/scene';

@Component({
    selector: 'scene',
    templateUrl: 'src/components/scene/scene.component.html',
    styleUrls: ['src/components/scene/scene.component.css'],
    directives: [SceneAddComponent],
})
export class SceneComponent implements OnInit {
    @Input() scene: Scene;
    errorMessage: string;

    constructor(
        private _router: Router) { }

    ngOnInit() {

    }
}
