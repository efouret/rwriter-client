import { Component, OnInit } from 'angular2/core';
import { Router } from 'angular2/router';
import { Project } from '../../services/project';
import { ProjectService } from '../../services/project.service';

@Component({
    selector: 'projects',
    templateUrl: 'src/components/projects/projects.component.html',
    styleUrls: ['src/components/projects/projects.component.css'],
    directives: [],
})
export class ProjectsComponent implements OnInit {
    projects: Project[];
    errorMessage: string;

    constructor(
        private _router: Router,
        private _projectService: ProjectService) { }

    ngOnInit() {
        console.log('INIT Projects')
        this.getProjects();
    }

    getProjects() {
        this._projectService.getProjects()
            .subscribe(
            projects => this.projects = projects,
            error => this.errorMessage = <any>error);
    }

    onSelect(project: Project) {
        this._router.navigate(['ProjectDetail', {id: project._id}]);
    }

    createNewProject() {
        this._router.navigate(['ProjectDetail', {id: 'new'}]);
    }
}
