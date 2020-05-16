import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreguntaFormularioComponent } from './pregunta-formulario.component';

describe('PreguntaFormularioComponent', () => {
  let component: PreguntaFormularioComponent;
  let fixture: ComponentFixture<PreguntaFormularioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PreguntaFormularioComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreguntaFormularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
