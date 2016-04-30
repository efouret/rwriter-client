import {Injectable}     from 'angular2/core';
import {Http, Response, Headers, RequestOptions} from 'angular2/http';
import {Observable}     from 'rxjs/Observable';

import {Project} from './project';

import { Config } from '../config';

@Injectable()
export class ProjectService {
    constructor(private http: Http) { }

    private _projectsUrl = Config.backBaseUrl + '/projects';

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

    createProject(project: Project) {
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers});
        return this.http.post(`${this._projectsUrl}`, JSON.stringify(project), options)
            .map(this.extractLocation)
            .catch(this.handleError);
    }

    saveProject(project: Project) {
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers});
        return this.http.put(`${this._projectsUrl}/${project._id}`, JSON.stringify(project), options)
            .map(this.checkError)
            .catch(this.handleError);
    }

    extractData(res: Response) {
        if (res.status < 200 || res.status >= 300) {
            throw new Error('Bad response status: ' + res.status);
        }
        let body = res.json();

        return body || {};
    }

    extractLocation(res: Response) {
        if (res.status < 200 || res.status >= 300) {
            throw new Error('Bad response status: ' + res.status);
        }

        return res.headers.get('Location');
    }

    checkError(res: Response) {
        if (res.status < 200 || res.status >= 300) {
            throw new Error('Bad response status: ' + res.status);
        }

        return {};
    }

    handleError(error: any) {
        let errMsg = error.message || 'Server error';
        console.error(errMsg);
        return Observable.throw(errMsg);
    }
}

