import { ApiFlightsService } from './api-flights.service';
import { HttpClientModule } from '@angular/common/http';
import { TestBed, async } from '@angular/core/testing';

global.API_KEY_KLM = jest.fn(); // Mock global variable.

describe('ApiFlightsService', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    }).compileComponents();
  }));

  it('should be created', () => {
    const service: ApiFlightsService = TestBed.get(ApiFlightsService);
    expect(service).toBeTruthy();
  });
});
