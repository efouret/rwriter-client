import {Injectable}     from 'angular2/core';
import {Http, Response} from 'angular2/http';
import {Observable}     from 'rxjs/Observable';

import {Chapter} from './chapter';

@Injectable()
export class ChapterService {
    constructor(private http: Http) { }

    private _chaptersUrl = 'http://localhost:8090/chapters';

    getChapters(projectId: string): Observable<Chapter[]> {
        return this.http.get(`${this._chaptersUrl}?project=${projectId}`)
            .map(this.extractData)
            .catch(this.handleError);
    }

    getChapter(id: string) {
        return this.http.get(`${this._chaptersUrl}/${id}`)
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

