import {Injectable}     from 'angular2/core';
import {Http, Response, Headers, RequestOptions} from 'angular2/http';
import {Observable}     from 'rxjs/Observable';

import {Character} from './character';

import {Config} from '../config';

@Injectable()
export class CharacterService {
    constructor(private http: Http) { }

    private _charactersUrl = Config.backBaseUrl + '/characters';

    getCharacters(projectId: string): Observable<Character[]> {
        return this.http.get(`${this._charactersUrl}?project=${projectId}`)
            .map(this.extractData)
            .catch(this.handleError);
    }

    getCharacter(id: string) {
        return this.http.get(`${this._charactersUrl}/${id}`)
            .map(this.extractData)
            .catch(this.handleError);
    }

    createCharacter(character: Character) {
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers});
        return this.http.post(`${this._charactersUrl}`, JSON.stringify(character), options)
            .map(this.extractLocation)
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

        console.log(res);

        return res.headers.get('Location');
    }

    handleError(error: any) {
        let errMsg = error.message || 'Server error';
        console.error(errMsg);
        return Observable.throw(errMsg);
    }
}

