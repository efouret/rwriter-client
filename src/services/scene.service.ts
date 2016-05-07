import {Injectable}     from 'angular2/core';
import {Http, Response, Headers, RequestOptions} from 'angular2/http';
import {Observable}     from 'rxjs/Observable';

import {Scene} from './scene';

import {Config} from '../config';

@Injectable()
export class SceneService {
    constructor(private http: Http) { }

    private _scenesUrl = Config.backBaseUrl + '/scenes';

    getScenes(chapterId: string): Observable<Scene[]> {
        return this.http.get(`${this._scenesUrl}?chapter=${chapterId}`)
            .map(this.extractData)
            .catch(this.handleError);
    }

    getScene(id: string) {
        return this.http.get(`${this._scenesUrl}/${id}`)
            .map(this.extractData)
            .catch(this.handleError);
    }

    createScene(scene: Scene) {
        console.log('Creating new scene');
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers});
        return this.http.post(`${this._scenesUrl}`, JSON.stringify(scene), options)
            .map(this.extractLocation)
            .catch(this.handleError);
    }

    saveScene(scene: Scene) {
        if (scene._id) {
            console.log('Saving existing scene');
            let headers = new Headers({'Content-Type': 'application/json'});
            let options = new RequestOptions({headers});
            return this.http.put(`${this._scenesUrl}/${scene._id}`, JSON.stringify(scene), options)
                .map(this.checkError)
                .catch(this.handleError);
        } else {
            return this.createScene(scene);
        }
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

