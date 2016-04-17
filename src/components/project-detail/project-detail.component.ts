import {Component, Input, OnInit} from 'angular2/core';
import {Project} from '../../services/project';
import { RouteParams, Router, ROUTER_DIRECTIVES, OnActivate, ComponentInstruction } from 'angular2/router';
import { ProjectService } from '../../services/project.service';

@Component({
    selector: 'project-detail',
    templateUrl: 'src/components/project-detail/project-detail.component.html',
    styleUrls: ['src/components/project-detail/project-detail.component.css'],
    directives: [ROUTER_DIRECTIVES]
})
export class ProjectDetailComponent implements OnInit, OnActivate {
    @Input()
    project: Project;
    errorMessage: string;

    constructor(
        private _router: Router,
        private _projectService: ProjectService,
        private _routeParams: RouteParams) {
    }

    ngOnInit() {
        console.log('INIT ProjectDetailComponent');
        console.log(this._routeParams.params);
        let id = this._routeParams.get('id');
        console.log(`id=${id}`);
        this._projectService.getProject(id)
            .subscribe(
            project => this.project= project,
            error => this.errorMessage = <any>error);
    }

    routerOnActivate(next: ComponentInstruction, prev: ComponentInstruction) {
        console.log(next);
        console.log(prev);
        return new Promise((resolve) => {
            resolve(true);
        });
    }

    goBack() {
        window.history.back();
    }
}
