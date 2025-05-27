import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModashboardComponent } from './modashboard.component';

describe('ModashboardComponent', () => {
  let component: ModashboardComponent;
  let fixture: ComponentFixture<ModashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
