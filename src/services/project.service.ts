import {Injectable}     from 'angular2/core';
import {Http, Response} from 'angular2/http';
import {Observable}     from 'rxjs/Observable';

import {Project} from './project';

@Injectable()
export class ProjectService {
    constructor(private http: Http) { }

    private _projectsUrl = 'http://localhost:8090/projects';

    getProjects(): Observable<Project[]> {
        return this.http.get(this._projectsUrl)
            .map(this.extractData)
            .catch(this.handleError);
    }

    getProject(id: string) {
        return this.http.get(`${this._projectsUrl}/${id}`)
            .map(this.extractData)
            .catch(this.handleError);
    }

    extractData(res: Response) {
        if (res.status < 200 || res.status >= 300) {
            throw new Error('Bad response status: ' + res.status);
        }
        let body = res.json();

        return body || {};
    }

    handleError(error: any) {
        let errMsg = error.message || 'Server error';
        console.error(errMsg);
        return Observable.throw(errMsg);
    }
}

