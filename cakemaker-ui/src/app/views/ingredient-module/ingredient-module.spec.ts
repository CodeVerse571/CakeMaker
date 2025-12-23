import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngredientModule } from './ingredient-module';

describe('IngredientModule', () => {
  let component: IngredientModule;
  let fixture: ComponentFixture<IngredientModule>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IngredientModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IngredientModule);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
