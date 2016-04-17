import { Component, OnInit } from 'angular2/core';
import { RouteConfig, RouteParams, ROUTER_DIRECTIVES } from 'angular2/router';

import { ProjectDetailComponent } from '../project-detail/project-detail.component';
import { CharactersComponent } from '../characters/characters.component';
import {Project} from '../../services/project';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'project',
  templateUrl: 'src/components/project/project.component.html',
  styleUrls: ['src/components/project/project.component.css'],
  directives: [ROUTER_DIRECTIVES]
})
@RouteConfig([
  { path: '/:id', name: 'ProjectDetail', component: ProjectDetailComponent, useAsDefault: true },
  { path: '/:id/characters', name: 'Characters', component: CharactersComponent },
  { path: '/:id/locations', name: 'Locations', component: CharactersComponent },
  { path: '/:id/chapters', name: 'Chapters', component: CharactersComponent },
])
export class ProjectComponent implements OnInit {
  id: string;
  project: Project;
  errorMessage: string;

  constructor(
    private _projectService: ProjectService,
    private _routeParams: RouteParams) { }

  ngOnInit() {
    console.log('INIT ProjectComponent');
    this.id = this._routeParams.get('id');
  }
}
