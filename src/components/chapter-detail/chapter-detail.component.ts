import {Component, Input, OnInit} from 'angular2/core';
import {Chapter} from '../../services/chapter';
import {Scene} from '../../services/scene';
import {Link} from '../../services/link';
import { RouteParams, Router, ROUTER_DIRECTIVES } from 'angular2/router';
import { ChapterService } from '../../services/chapter.service';
import { SceneService } from '../../services/scene.service';
import { ProjectNavComponent } from '../project-nav/project-nav.component';
import { SceneComponent } from '../scene/scene.component';
import { SceneAddComponent } from '../scene-add/scene-add.component';
import { SceneDelComponent } from '../scene-del/scene-del.component';

@Component({
    selector: 'chapters',
    templateUrl: 'src/components/chapter-detail/chapter-detail.component.html',
    styleUrls: ['src/components/chapter-detail/chapter-detail.component.css'],
    directives: [ROUTER_DIRECTIVES, ProjectNavComponent, SceneComponent, SceneAddComponent, SceneDelComponent]
})
export class ChapterDetailComponent implements OnInit {
    projectId: string;
    id: string;
    chapter: Chapter;
    scenes: Scene[];
    errorMessage: string;
    creating: boolean;

    constructor(
        private _router: Router,
        private _chapterService: ChapterService,
        private _sceneService: SceneService,
        private _routeParams: RouteParams) {
    }

    ngOnInit() {
        this.projectId = this._routeParams.get('projectId');
        this.id = this._routeParams.get('id');

        if (this.id !== 'new') {
            this.creating = false;
            this._chapterService.getChapter(this.id)
            .subscribe(
                chapter => {
                    this.chapter = chapter;
                    this._sceneService.getScenes(this.id)
                    .subscribe(
                        scenes => this.scenes = scenes.sort((s1, s2) => (s1.number - s2.number)),
                        error => this.errorMessage = <any>error);
                },
                error => this.errorMessage = <any>error);

        } else {
            this.chapter = new Chapter();
            this.chapter.project = new Link();
            this.chapter.project.id = this.projectId;

            this.scenes = [];

            this.creating = true;
        }
    }

    saveChapter() {
        if (this.creating) {
            this._chapterService.createChapter(this.chapter)
            .subscribe(
                id => {
                    this.chapter._id = id;
                    this.creating = false;
                    this.scenes.forEach((scene, idx) => {
                        scene.chapter.id = this.chapter._id;
                        scene.number = idx;
                        this._sceneService.saveScene(scene).subscribe(() => {}, error => this.errorMessage = <any>error);
                    });
                },
                error => this.errorMessage = <any>error);
        } else {
            this._chapterService.saveChapter(this.chapter)
            .subscribe(
                () => {
                    this.scenes.forEach((scene, idx) => {
                        scene.number = idx;
                        console.log(scene);
                        this._sceneService.saveScene(scene).subscribe(() => {}, error => this.errorMessage = <any>error);
                    });
                },
                error => this.errorMessage = <any>error);
        }
    }

    addSceneAfter(scene: Scene) {
        let newScene = new Scene();
        newScene.chapter = new Link();
        newScene.chapter.id = this.chapter._id;

        if (!scene) {
            this.scenes.unshift(newScene);

        } else {
            this.scenes.splice(this.scenes.indexOf(scene) + 1, 0, newScene);
        }
    }

    deleteScene(scene: Scene) {
        this.scenes.splice(this.scenes.indexOf(scene), 1);
    }

    onDragStart(scene: Scene, event: any) {
        event.dataTransfer.setData('application/json', JSON.stringify(scene));
        event.dataTransfer.effectAllowed = "move";
    }

    onDragOver(scene: Scene, event: any) {
        event.preventDefault();
    }

    onDrop(scene: Scene, event: any) {
        console.log('Dropped');
        let droppedScene = JSON.parse(event.dataTransfer.getData('application/json'));

        console.log(`idxOf(dropped) = ${this.scenes.findIndex(s => s._id === droppedScene._id)}`);
        this.scenes.splice(this.scenes.findIndex(s => s._id === droppedScene._id), 1);
        console.log(`idxOf(scene) = ${this.scenes.indexOf(scene)}`);
        this.scenes.splice(this.scenes.indexOf(scene)+1, 0, droppedScene);

        event.preventDefault();
    }
}
