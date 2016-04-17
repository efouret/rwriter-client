import { Component }       from 'angular2/core';
import { HTTP_PROVIDERS }    from 'angular2/http';
import { ProjectService } from '../../services/project.service';
import { CharacterService } from '../../services/character.service';
import { ProjectsComponent } from '../projects/projects.component';
import { ProjectComponent } from '../project/project.component';
import { CharactersComponent } from '../characters/characters.component';
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
    CharacterService
  ]
})
@RouteConfig([
  { path: '/projects', name: 'Projects', component: ProjectsComponent },
  { path: '/project/...', name: 'Project', component: ProjectComponent }
])
export class AppComponent {
  title = 'RWriter';
}
