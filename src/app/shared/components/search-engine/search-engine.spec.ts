import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchEngineComponent } from './search-engine';

describe('SearchEngineComponent', () => {
  let component: SearchEngineComponent;
  let fixture: ComponentFixture<SearchEngineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchEngineComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchEngineComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
