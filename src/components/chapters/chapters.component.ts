import {Component, Input, OnInit} from 'angular2/core';
import {Chapter} from '../../services/chapter';
import { RouteParams, Router, ROUTER_DIRECTIVES } from 'angular2/router';
import { ChapterService } from '../../services/chapter.service';
import { ProjectNavComponent } from '../project-nav/project-nav.component';

@Component({
    selector: 'chapters',
    templateUrl: 'src/components/chapters/chapters.component.html',
    styleUrls: ['src/components/chapters/chapters.component.css'],
    directives: [ROUTER_DIRECTIVES, ProjectNavComponent]
})
export class ChaptersComponent implements OnInit {
    id: string;
    chapters: Chapter[];
    errorMessage: string;

    constructor(
        private _router: Router,
        private _characterService: ChapterService,
        private _routeParams: RouteParams) {
    }

    ngOnInit() {
        this.id = this._routeParams.get('id');
        this._characterService.getChapters(this.id)
            .subscribe(
            chapters => this.chapters = chapters,
            error => this.errorMessage = <any>error);
    }

    goBack() {
        window.history.back();
    }
}
