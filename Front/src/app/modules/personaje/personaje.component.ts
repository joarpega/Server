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


declare var $: any;

@Component({
  selector: 'app-personaje',
  templateUrl: './personaje.component.html',
  styleUrls: ['./personaje.component.css'],
  providers: [ApiService]
})
export class PersonajeComponent implements OnInit {

  private translations: any = {};

  private viewData: any = {};
  dataPerson: any = [];
  dataHtml = '';
  cssClass = 'default';
  prevClass = 'default';

  selectPerson = [
    {
      value: '0',
      viewValue: 'Luke',
      url: apiUrl.luke,
      css: 'luke',
      img: '../../../assets/img/Luke.jpg'
    },
    {
      value: '1',
      viewValue: 'Han Solo',
      url: apiUrl.han,
      css: 'han',
      img: '../../../assets/img/Han.jpg'
    },
    {
      value: '2',
      viewValue: 'Leia',
      url: apiUrl.leia,
      css: 'leia',
      img: '../../../assets/img/Leia.jpg'
    },
    {
      value: '3',
      viewValue: 'Rey',
      url: apiUrl.rey,
      css: 'rey',
      img: '../../../assets/img/Rey.jpg'
    },
  ];
  selectedValue: string;


  constructor(private http: Http,
    translate: TranslateService,
    public apiService: ApiService) {
    const self = this;
    // Add supported languages
    translate.addLangs(['en', 'es-MX']);

    // Set default language
    const language = environment.language;
    translate.setDefaultLang(language);
    translate.use(language);

    translate.get('select_person').subscribe(label => self.translations.select_person = label);
  }

  ngOnInit() {
    const self = this;
    $(document).ready(function () {
      $('#imgAvatar').addClass(self.cssClass);
    });
  }

  private changeSelect(value: any) {
    const self = this;

    // tslint:disable-next-line:radix
    const indice = parseInt(value['value']);

    const person = self.selectPerson[indice];

    self.viewData = self.apiService
      .get(person.url)
      .subscribe(x => {
        self.dataPerson = x['result'];
        self.cssClass = person.css;
        $(document).ready(function () {
          $('#imgAvatar').removeClass(self.prevClass);
          $('#imgAvatar').addClass(self.cssClass);
          $('#route').html(person.url);
          $('#imgD').removeAttr('src');
          $('#imgD').attr('src', person.img);
        });
      });
  }

}
