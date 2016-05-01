import {Injectable}     from 'angular2/core';
import {Http, Response, Headers, RequestOptions} from 'angular2/http';
import {Observable}     from 'rxjs/Observable';

import {Chapter} from './chapter';

import {Config} from '../config';

@Injectable()
export class ChapterService {
    constructor(private http: Http) { }

    private _chaptersUrl = Config.backBaseUrl + '/chapters';

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

    createChapter(chapter: Chapter) {
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers});
        return this.http.post(`${this._chaptersUrl}`, JSON.stringify(chapter), options)
            .map(this.extractLocation)
            .catch(this.handleError);
    }

    saveChapter(chapter: Chapter) {
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers});
        return this.http.put(`${this._chaptersUrl}/${chapter._id}`, JSON.stringify(chapter), options)
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

