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

@Component({
    selector: 'chapters',
    templateUrl: 'src/components/chapter-detail/chapter-detail.component.html',
    styleUrls: ['src/components/chapter-detail/chapter-detail.component.css'],
    directives: [ROUTER_DIRECTIVES, ProjectNavComponent, SceneComponent, SceneAddComponent]
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
                        scenes => this.scenes = scenes,
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
                    this.scenes.forEach(scene => {
                        scene.chapter.id = this.chapter._id;
                        this._sceneService.saveScene(scene).subscribe(() => {}, error => this.errorMessage = <any>error);
                    });
                },
                error => this.errorMessage = <any>error);
        } else {
            this._chapterService.saveChapter(this.chapter)
            .subscribe(
                () => {
                    this.scenes.forEach(scene => {
                        console.log(`Will save scene ${scene}`);
                        this._sceneService.saveScene(scene).subscribe(() => {}, error => this.errorMessage = <any>error);
                    });
                },
                error => this.errorMessage = <any>error);
        }
    }

    addScene(pos: string) {
        console.log(`Will add scene at pos ${pos}`);
        if (pos === 'last') {
            let newScene = new Scene();
            newScene.chapter = new Link();
            newScene.chapter.id = this.chapter._id;
            this.scenes.push(newScene);
        }
    }
}
