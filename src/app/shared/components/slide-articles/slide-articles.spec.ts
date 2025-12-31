import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlideArticles } from './slide-articles';

describe('SlideArticles', () => {
  let component: SlideArticles;
  let fixture: ComponentFixture<SlideArticles>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SlideArticles]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SlideArticles);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
