import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoProgrammesComponent } from './mo-programmes.component';

describe('MoProgrammesComponent', () => {
  let component: MoProgrammesComponent;
  let fixture: ComponentFixture<MoProgrammesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoProgrammesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoProgrammesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
