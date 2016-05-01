import {Component, Input, OnInit} from 'angular2/core';
import {Chapter} from '../../services/chapter';
import {Link} from '../../services/link';
import { RouteParams, Router, ROUTER_DIRECTIVES } from 'angular2/router';
import { ChapterService } from '../../services/chapter.service';
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
    errorMessage: string;
    creating: boolean;

    constructor(
        private _router: Router,
        private _chapterService: ChapterService,
        private _routeParams: RouteParams) {
    }

    ngOnInit() {
        this.projectId = this._routeParams.get('projectId');
        this.id = this._routeParams.get('id');

        if (this.id !== 'new') {
            this.creating = false;
            this._chapterService.getChapter(this.id)
            .subscribe(
                chapter => this.chapter = chapter,
                error => this.errorMessage = <any>error);
        } else {
            this.chapter = new Chapter();
            this.chapter.project = new Link();
            this.chapter.project.id = this.projectId;
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
                },
                error => this.errorMessage = <any>error);
        } else {
            this._chapterService.saveChapter(this.chapter)
            .subscribe(
                () => {},
                error => this.errorMessage = <any>error);
        }
    }
}
