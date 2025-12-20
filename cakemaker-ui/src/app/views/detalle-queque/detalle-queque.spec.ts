import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleQueque } from './detalle-queque';

describe('DetalleQueque', () => {
  let component: DetalleQueque;
  let fixture: ComponentFixture<DetalleQueque>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalleQueque]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalleQueque);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
