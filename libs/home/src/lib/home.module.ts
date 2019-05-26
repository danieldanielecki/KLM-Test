import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { SharedModule } from '@libs/shared/src/index';
import { FilterPipe } from './home/filter.pipe';

@NgModule({
  declarations: [HomeComponent, FilterPipe],
  exports: [],
  imports: [SharedModule]
})
export class HomeModule {}
