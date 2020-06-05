import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarExamenComponent } from './listar-examen.component';

describe('ListarExamenComponent', () => {
  let component: ListarExamenComponent;
  let fixture: ComponentFixture<ListarExamenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListarExamenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarExamenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
