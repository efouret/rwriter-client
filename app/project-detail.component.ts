import {Component, Input, OnInit} from 'angular2/core';
import {Project} from './project';
import { RouteParams } from 'angular2/router';
import { ProjectService } from './project.service';

@Component({
    selector: 'project-detail',
    templateUrl: 'app/project-detail.component.html',
    styleUrls: ['app/project-detail.component.css']
})
export class ProjectDetailComponent implements OnInit {
    @Input()
    project: Project;

    constructor(
        private _projectService: ProjectService,
        private _routeParams: RouteParams) {
    }

    ngOnInit() {
        let id = +this._routeParams.get('id');
        this._projectService.getProject(id)
            .then(project => this.project = project);
    }

    goBack() {
        window.history.back();
    }
}
