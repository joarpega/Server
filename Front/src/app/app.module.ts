import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { FormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule, Http } from '@angular/http';
import { ROUTING } from './app-routing.module';
import { TranslateModule, TranslateLoader, TranslateStaticLoader } from 'ng2-translate';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';


import { AppComponent } from './app.component';
import { PanelComponent } from './modules/panel/panel.component';
import { PersonajeComponent } from './modules/personaje/personaje.component';

// AoT requires an exported function for factories
export function HttpLoaderFactory(httpClient: Http) { return new TranslateStaticLoader(httpClient, '/assets/i18n/', '.json'); }

@NgModule({
  declarations: [
    AppComponent,
    PanelComponent,
    PersonajeComponent
  ],
  imports: [
    BrowserModule,
    ROUTING,
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: HttpLoaderFactory,
      deps: [Http]
    }),
    FormsModule,
    MaterialModule,
    BrowserAnimationsModule,
    SlimLoadingBarModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
