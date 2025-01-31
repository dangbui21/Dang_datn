import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TradingChartsComponent } from './trading-charts.component';

describe('TradingChartsComponent', () => {
  let component: TradingChartsComponent;
  let fixture: ComponentFixture<TradingChartsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TradingChartsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TradingChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
