import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectedPageComponent } from './connected-page.component';

describe('ConnectedPageComponent', () => {
  let component: ConnectedPageComponent;
  let fixture: ComponentFixture<ConnectedPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConnectedPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConnectedPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
