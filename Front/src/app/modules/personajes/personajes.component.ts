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
import {Sort} from '@angular/material';
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
  sortedData;


  constructor(private http: Http,
    translate: TranslateService,
    public apiService: ApiService) {
    // Add supported languages
    translate.addLangs(['en', 'es-MX']);

    // Set default language
    const language = environment.language;
    translate.setDefaultLang(language);
    translate.use(language);


    this.loadData();
  }

  ngOnInit() {
    const self = this;
    // self.loadData();

  }


  loadData() {
    const self = this;
    self.viewData = self.apiService
      .get(apiUrl.personajes)
      .subscribe(x => {
        self.dataSource = { data: x['result'] };
        console.log(self.dataSource);
      });
  }

  sortData(sort: Sort) {
    const self = this;

      switch (sort.active) {
        case 'name': return self.apiService
        .get(apiUrl.personajes)
        .subscribe(x => {
          self.dataSource = { data: x['result'] };
          console.log(self.dataSource);
        });
        default: return 0;
      }
  }


}

