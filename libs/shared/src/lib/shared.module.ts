import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import {
  MatButtonModule,
  MatListModule,
  MatSidenavModule,
  MatToolbarModule,
  MatTooltipModule
} from '@angular/material';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [FooterComponent, HeaderComponent],
  exports: [
    CommonModule,
    FlexLayoutModule,
    FontAwesomeModule,
    FooterComponent,
    HeaderComponent,
    MatButtonModule,
    MatListModule,
    MatSidenavModule,
    MatToolbarModule,
    MatTooltipModule,
    RouterModule
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    FontAwesomeModule,
    MatButtonModule,
    MatListModule,
    MatSidenavModule,
    MatToolbarModule,
    MatTooltipModule,
    RouterModule
  ],
})
export class SharedModule { }
