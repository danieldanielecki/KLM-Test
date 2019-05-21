import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [FooterComponent, HeaderComponent],
  exports: [
    CommonModule,
    FooterComponent,
    HeaderComponent,
    RouterModule
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
})
export class SharedModule {}
