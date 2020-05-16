import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoDosComponent } from './tipo-dos.component';

describe('TipoDosComponent', () => {
  let component: TipoDosComponent;
  let fixture: ComponentFixture<TipoDosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipoDosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoDosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
