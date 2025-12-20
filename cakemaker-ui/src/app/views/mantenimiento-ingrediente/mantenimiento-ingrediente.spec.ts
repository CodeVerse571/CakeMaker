import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MantenimientoIngrediente } from './mantenimiento-ingrediente';

describe('MantenimientoIngrediente', () => {
  let component: MantenimientoIngrediente;
  let fixture: ComponentFixture<MantenimientoIngrediente>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MantenimientoIngrediente]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MantenimientoIngrediente);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
