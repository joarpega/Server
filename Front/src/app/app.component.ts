import { Component } from '@angular/core';
import { TranslateService } from 'ng2-translate';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(translate: TranslateService) {
    // Add supported languages
    translate.addLangs(['en', 'es-MX']);

    // Set default language
    const language = environment.language;
    translate.setDefaultLang(language);
    translate.use(language);
  }
}
