import {Injectable}     from 'angular2/core';
import {Http, Response} from 'angular2/http';
import {Observable}     from 'rxjs/Observable';

import {Character} from './character';

@Injectable()
export class CharacterService {
    constructor(private http: Http) { }

    private _charactersUrl = 'http://localhost:8090/characters';

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

