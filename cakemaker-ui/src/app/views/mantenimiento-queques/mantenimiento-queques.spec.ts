import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MantenimientoQueques } from './mantenimiento-queques';

describe('MantenimientoQueques', () => {
  let component: MantenimientoQueques;
  let fixture: ComponentFixture<MantenimientoQueques>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MantenimientoQueques]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MantenimientoQueques);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
