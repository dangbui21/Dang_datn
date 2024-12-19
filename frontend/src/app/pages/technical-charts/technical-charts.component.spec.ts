import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechnicalChartsComponent } from './technical-charts.component';

describe('TechnicalChartsComponent', () => {
  let component: TechnicalChartsComponent;
  let fixture: ComponentFixture<TechnicalChartsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TechnicalChartsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TechnicalChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
