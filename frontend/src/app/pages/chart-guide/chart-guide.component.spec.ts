import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartGuideComponent } from './chart-guide.component';

describe('ChartGuideComponent', () => {
  let component: ChartGuideComponent;
  let fixture: ComponentFixture<ChartGuideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartGuideComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChartGuideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
