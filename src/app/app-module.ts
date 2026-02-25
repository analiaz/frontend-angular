import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { TodoModule } from './todos/todo-module';
import { Footer } from './footer/footer';

import { ReactiveFormsModule } from '@angular/forms';

//NgRx
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { environment } from '../enviroments/environment';
import { appReducers } from './app.reducer';
import { TodoEffects } from './todos/todo.effects';

@NgModule({
  declarations: [
    App,
    Footer
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    TodoModule,
    StoreModule.forRoot(appReducers),
    EffectsModule.forRoot([TodoEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
  ],
  providers: [provideHttpClient(withInterceptorsFromDi())],
  bootstrap: [App]
})
export class AppModule { }
