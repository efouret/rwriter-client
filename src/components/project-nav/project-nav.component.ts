import { Component, Input } from 'angular2/core';
import { ROUTER_DIRECTIVES } from 'angular2/router';

@Component({
  selector: 'project-nav',
  templateUrl: 'src/components/project-nav/project-nav.component.html',
  styleUrls: ['src/components/project-nav/project-nav.component.css'],
  directives: [ROUTER_DIRECTIVES]
})
export class ProjectNavComponent {
  @Input()
  id: string;
}
