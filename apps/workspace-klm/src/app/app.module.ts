declare const API_KEY_AGASTYA: string;

import Agastya from 'agastya';
import { AppComponent } from './app.component';
import { CoreModule } from '@libs/core/src/index';
import { environment } from '../environments/environment';
import { HomeModule } from '@libs/home/src/index';
import { NgModule } from '@angular/core';
import { NxModule } from '@nrwl/nx';
import { RoutingModule } from './routing/app-routing.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { SharedModule } from '@libs/shared/src/index';

const agastya = new Agastya(API_KEY_AGASTYA);

@NgModule({
  bootstrap: [AppComponent],
  declarations: [AppComponent],
  imports: [
    CoreModule,
    HomeModule,
    NxModule.forRoot(),
    RoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production
    }),
    SharedModule
  ]
})
export class AppModule {}
