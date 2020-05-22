import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RealizarExamenComponent } from './realizar-examen.component';

describe('RealizarExamenComponent', () => {
  let component: RealizarExamenComponent;
  let fixture: ComponentFixture<RealizarExamenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RealizarExamenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RealizarExamenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
