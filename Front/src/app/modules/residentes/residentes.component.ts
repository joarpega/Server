import { Component, OnInit } from '@angular/core';
import { Headers, Http, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/finally';
import 'rxjs/add/observable/throw';
import { Router } from '@angular/router';
import { TranslateService } from 'ng2-translate';
import { apiUrl, environment } from '../../../environments/environment';
import { ApiService } from '../../_services/index';


import { ElementRef, ViewChild } from '@angular/core';
import { DataSource } from '@angular/cdk';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/fromEvent';

@Component({
  selector: 'app-residentes',
  templateUrl: './residentes.component.html',
  styleUrls: ['./residentes.component.css'],
  providers: [ApiService]
})
export class ResidentesComponent implements OnInit {
  private translations: any;
  private viewData: any = {};
  dataPerson: any = [];
  dataHtml = '';


  constructor(private http: Http,
    translate: TranslateService,
    public apiService: ApiService) {
    // Add supported languages
    translate.addLangs(['en', 'es-MX']);

    // Set default language
    const language = environment.language;
    translate.setDefaultLang(language);
    translate.use(language);
  }

  ngOnInit() {
    const self = this;

    const sendData = [{ name: 'pr', value: '1' },
    { name: 'op', value: 6 }];

    self.viewData = self.apiService
      .get(apiUrl.residentes)
      .subscribe(x => {
        console.log('algo------------');
        console.log(x);
        self.dataPerson = x['result'];
        // self.dataHtml = x['html'];
        // console.log(self.dataHtml);
      });
    console.log(self.viewData);
  }

}
