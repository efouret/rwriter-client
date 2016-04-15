import { Component, OnInit } from 'angular2/core';
import { Router } from 'angular2/router';
import { Project } from './project';
import { ProjectService } from './project.service';

@Component({
    selector: 'projects',
    templateUrl: 'app/projects.component.html',
    styleUrls: ['app/projects.component.css'],
    directives: [],
})
export class ProjectsComponent implements OnInit { 
    projects: Project[];
    selectedProject: Project;

    constructor(
        private _router: Router,
        private _projectService: ProjectService) { }

    ngOnInit() {
        this.getProjects();
    }

    getProjects() {
        this._projectService.getProjects().then(projects => this.projects = projects);
    }

    gotoDetail() {
        this._router.navigate(['ProjectDetail', { id: this.selectedProject.id }]);
    }
}
