import { Component, Input, OnInit } from 'angular2/core';
import { ROUTER_DIRECTIVES } from 'angular2/router';

@Component({
  selector: 'project-nav',
  templateUrl: 'src/components/project-nav/project-nav.component.html',
  styleUrls: ['src/components/project-nav/project-nav.component.css'],
  directives: [ROUTER_DIRECTIVES]
})
export class ProjectNavComponent implements OnInit {
  @Input() id: string;
  @Input() active: string;

  ngOnInit() {
    console.log(`ProjectNavComponent id=${this.id}`);
  }
}
