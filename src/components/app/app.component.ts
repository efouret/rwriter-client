import { Component }       from 'angular2/core';
import { HTTP_PROVIDERS }    from 'angular2/http';

import { ProjectService } from '../../services/project.service';
import { CharacterService } from '../../services/character.service';
import { LocationService } from '../../services/location.service';
import { ChapterService } from '../../services/chapter.service';
import { SceneService } from '../../services/scene.service';

import { ProjectsComponent } from '../projects/projects.component';
import { ProjectDetailComponent } from '../project-detail/project-detail.component';
import { CharactersComponent } from '../characters/characters.component';
import { LocationsComponent } from '../locations/locations.component';
import { ChaptersComponent } from '../chapters/chapters.component';
import { ChapterDetailComponent } from '../chapter-detail/chapter-detail.component';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from 'angular2/router';

@Component({
  selector: 'app',
  templateUrl: 'src/components/app/app.component.html',
  styleUrls: ['src/components/app/app.component.css'],
  directives: [ROUTER_DIRECTIVES],
  providers: [
    ROUTER_PROVIDERS,
    HTTP_PROVIDERS,
    ProjectService,
    CharacterService,
    LocationService,
    ChapterService,
    SceneService
  ]
})
@RouteConfig([
  { path: '/projects', name: 'Projects', component: ProjectsComponent, useAsDefault: true },
  { path: '/projects/:id', name: 'ProjectDetail', component: ProjectDetailComponent },
  { path: '/projects/:id/characters', name: 'Characters', component: CharactersComponent },
  { path: '/projects/:id/locations', name: 'Locations', component: LocationsComponent },
  { path: '/projects/:id/chapters', name: 'Chapters', component: ChaptersComponent },
  { path: '/projects/:projectId/chapters/:id', name: 'ChapterDetail', component: ChapterDetailComponent }
])
export class AppComponent {
  title = 'RWriter';
}
