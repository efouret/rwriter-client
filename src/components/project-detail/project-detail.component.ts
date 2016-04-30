import {Component, Input, OnInit} from 'angular2/core';
import {Project} from '../../services/project';
import { RouteParams, Router, ROUTER_DIRECTIVES, OnActivate, ComponentInstruction } from 'angular2/router';
import { ProjectService } from '../../services/project.service';
import { ProjectNavComponent } from '../project-nav/project-nav.component';

@Component({
    selector: 'project-detail',
    templateUrl: 'src/components/project-detail/project-detail.component.html',
    styleUrls: ['src/components/project-detail/project-detail.component.css'],
    directives: [ROUTER_DIRECTIVES, ProjectNavComponent]
})
export class ProjectDetailComponent implements OnInit, OnActivate {
    project: Project;
    errorMessage: string;
    creating: boolean;

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
        if (id !== 'new') {
            this.creating = false;
            this._projectService.getProject(id)
                .subscribe(
                project => this.project= project,
                error => this.errorMessage = <any>error);
        } else {
            this.project = new Project();
            this.creating = true;
        }
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

    saveProject() {
        console.log('will save project');
        if (this.creating) {
            console.log('will create new project');
            this._projectService.createProject(this.project)
            .subscribe(
                id => {
                    this.project._id = id;
                    this.creating = false;
                },
                error => this.errorMessage = <any>error);
        } else {
            console.log('will save existing project');
            console.log(this.project);
            this._projectService.saveProject(this.project)
            .subscribe(
                () => {},
                error => this.errorMessage = <any>error);
        }
    }
}
