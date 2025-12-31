import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlatArticle } from './flat-article';

describe('FlatArticle', () => {
  let component: FlatArticle;
  let fixture: ComponentFixture<FlatArticle>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlatArticle]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlatArticle);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
