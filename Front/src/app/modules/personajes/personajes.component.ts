import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Headers, Http, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { TranslateService } from 'ng2-translate';
import { apiUrl, environment } from '../../../environments/environment';
import { ApiService } from '../../_services/index';

import { DataSource } from '@angular/cdk';
import { MdPaginator } from '@angular/material';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';


@Component({
  selector: 'app-personajes',
  templateUrl: './personajes.component.html',
  styleUrls: ['./personajes.component.css'],
  providers: [ApiService]
})
export class PersonajesComponent implements OnInit {
  private translations: any;

  private viewData: any = {};
  dataSource: any= [];


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
    self.loadData();
   }


  loadData() {
    const self = this;
    self.viewData = self.apiService
      .get(apiUrl.personajes)
      .subscribe(x => {
        self.dataSource = x['result'];
        console.log(x);
      });
  }

}
