import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrimButtonComponent } from './prim-button.component';

describe('PrimButtonComponent', () => {
  let component: PrimButtonComponent;
  let fixture: ComponentFixture<PrimButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrimButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrimButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
