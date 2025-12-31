import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardArticle } from './card-article';

describe('CardArticle', () => {
  let component: CardArticle;
  let fixture: ComponentFixture<CardArticle>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardArticle]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardArticle);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
