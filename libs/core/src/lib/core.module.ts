import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, Optional, SkipSelf } from '@angular/core';


@NgModule({
  exports: [BrowserModule, BrowserAnimationsModule],
  imports: [BrowserModule, BrowserAnimationsModule]
})
export class CoreModule {
  // Prevent from importing CoreModule more than once.
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        `CoreModule has already been loaded. Import Core modules in the AppModule only.`
      );
    }
  }
}

