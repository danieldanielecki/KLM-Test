import { async, TestBed } from '@angular/core/testing';
import { HomeComponent } from '@libs/home/src/index';
import { RoutingModule } from './app-routing.module';
import { RouterTestingModule } from '@angular/router/testing';

describe('RoutingModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [RouterTestingModule, RoutingModule]
    }).compileComponents();
  }));

  it('should create routing module', () => {
    expect(RoutingModule).toBeDefined();
  });
});
