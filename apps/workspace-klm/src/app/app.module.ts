import { AppComponent } from './app.component';
import { CoreModule } from '@libs/core/src/index';
import { HomeModule } from '@libs/home/src/index';
import { NgModule } from '@angular/core';
import { NxModule } from '@nrwl/nx';
import { RoutingModule } from './routing/app-routing.module';
import { SharedModule } from '@libs/shared/src/index';

@NgModule({
  bootstrap: [AppComponent],
  declarations: [AppComponent],
  imports: [
    CoreModule,
    HomeModule,
    NxModule.forRoot(),
    RoutingModule,
    SharedModule
  ]
})
export class AppModule {}
