import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamenFormularioComponent } from './examen-formulario.component';

describe('ExamenFormularioComponent', () => {
  let component: ExamenFormularioComponent;
  let fixture: ComponentFixture<ExamenFormularioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ExamenFormularioComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamenFormularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
