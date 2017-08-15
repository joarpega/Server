import { Injectable } from '@angular/core';
import { Headers, Http, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/finally';
import 'rxjs/add/observable/throw';
import { Router } from '@angular/router';
import { timeout } from '../../environments/environment';

import { SlimLoadingBarService } from 'ng2-slim-loading-bar';


@Injectable()
export class ApiService {

    private handleErrorBind: any = this.handleError.bind(this);

    constructor(private http: Http,
        private router: Router,
        private loading: SlimLoadingBarService,
        /*,private toastyService: ToastyService*/
    ) { }

    // HTTP Methods
    get(url: string, params: Array<any> = []): Observable<any> {
        this.loading.start();
        const headers = new Headers(
            { 'connection': 'keep-alive' }
        );
        // this.addAuthToken(headers);

        const search: URLSearchParams = new URLSearchParams();
        if (params) {
            params.forEach(function (p) {
                search.set(p.name, p.value);
            });
        }

        return this.http.get(url, {
            headers: headers,
            search: search
        }).map(response => {
            return response.json();
        }).catch(this.handleErrorBind)
            .finally(() => {
                this.loading.complete();
            });
    }

    post(url: string, data: any): Observable<any> {
        this.loading.start();
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const body = JSON.stringify(data);
        // this.addAuthToken(headers);

        return this.http.post(url, body, {
            headers: headers
        }).map(response => {
            // this.toastyService.success({ title: "Acción completada correctamente", theme: "bootstrap", timeout: timeout.seconds });
            return response.json();
        }).catch(this.handleErrorBind)
            .finally(() => {
                this.loading.complete();
            });
    }

    put(url: string, id: number, data: any): Observable<any> {
        this.loading.start();
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const body = JSON.stringify(data);
        // this.addAuthToken(headers);
        return this.http.put(`${url}/${id}`, body, {
            headers: headers
        }).map(response => {
            // this.toastyService.success({ title: "Cambios aplicados correctamente", theme: "bootstrap", timeout: timeout.seconds });
            return response.status === 204;
        }).catch(this.handleErrorBind)
            .finally(() => {
                this.loading.complete();
            });
    }

    delete(url: string, id: number) {
        this.loading.start();
        const headers = new Headers();
        // this.addAuthToken(headers);
        return this.http.delete(`${url}/${id}`, {
            headers: headers
        }).map(response => {
            // this.toastyService.success({ title: "Eliminación completa", theme: "bootstrap", timeout: timeout.seconds });
            return response.status === 204;
        }).catch(this.handleErrorBind)
            .finally(() => {
                this.loading.complete();
            });
    }



    private handleError(error: any) {
        const errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';

        // Validate unauthorize calls
        if (error.status && error.status === 401) {
            // this.authService.logout();
            console.log('salir');
        }

        // this.toastyService.error({ title: errMsg, theme: "bootstrap", timeout: timeout.seconds });
        return Observable.throw({
            status: error.status,
            message: errMsg
        });
    }
}
