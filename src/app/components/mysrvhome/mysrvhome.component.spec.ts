import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MysrvhomeComponent } from './mysrvhome.component';

describe('MysrvhomeComponent', () => {
  let component: MysrvhomeComponent;
  let fixture: ComponentFixture<MysrvhomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MysrvhomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MysrvhomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
