import {Injectable}     from 'angular2/core';
import {Http, Response} from 'angular2/http';
import {Observable}     from 'rxjs/Observable';

import {Location} from './location';

import {Config} from '../config';

@Injectable()
export class LocationService {
    constructor(private http: Http) { }

    private _locationsUrl = Config.backBaseUrl+'/locations';

    getLocations(projectId: string): Observable<Location[]> {
        return this.http.get(`${this._locationsUrl}?project=${projectId}`)
            .map(this.extractData)
            .catch(this.handleError);
    }

    getLocation(id: string) {
        return this.http.get(`${this._locationsUrl}/${id}`)
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

