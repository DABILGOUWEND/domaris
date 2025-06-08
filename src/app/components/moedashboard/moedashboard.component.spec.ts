import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoedashboardComponent } from './moedashboard.component';

describe('MoedashboardComponent', () => {
  let component: MoedashboardComponent;
  let fixture: ComponentFixture<MoedashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoedashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoedashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
