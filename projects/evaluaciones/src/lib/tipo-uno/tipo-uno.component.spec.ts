import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoUnoComponent } from './tipo-uno.component';

describe('TipoUnoComponent', () => {
  let component: TipoUnoComponent;
  let fixture: ComponentFixture<TipoUnoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TipoUnoComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoUnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
