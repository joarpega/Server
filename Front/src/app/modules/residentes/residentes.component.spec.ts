import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResidentesComponent } from './residentes.component';

describe('ResidentesComponent', () => {
  let component: ResidentesComponent;
  let fixture: ComponentFixture<ResidentesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResidentesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResidentesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
