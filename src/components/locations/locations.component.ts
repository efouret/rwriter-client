import { Component, Input, OnInit } from 'angular2/core';
import { Location } from '../../services/location';
import { RouteParams, Router, ROUTER_DIRECTIVES } from 'angular2/router';
import { LocationService } from '../../services/location.service';
import { ProjectNavComponent } from '../project-nav/project-nav.component';

@Component({
    selector: 'locations',
    templateUrl: 'src/components/locations/locations.component.html',
    styleUrls: ['src/components/locations/locations.component.css'],
    directives: [ROUTER_DIRECTIVES, ProjectNavComponent]
})
export class LocationsComponent implements OnInit {
    id: string;
    locations: Location[];
    errorMessage: string;

    constructor(
        private _router: Router,
        private _locationService: LocationService,
        private _routeParams: RouteParams) {
    }

    ngOnInit() {
        this.id = this._routeParams.get('id');
        this._locationService.getLocations(this.id)
            .subscribe(
            locations => this.locations = locations,
            error => this.errorMessage = <any>error);
    }

    goBack() {
        window.history.back();
    }
}
