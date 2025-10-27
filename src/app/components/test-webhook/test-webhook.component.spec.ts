import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestWebhookComponent } from './test-webhook.component';

describe('TestWebhookComponent', () => {
  let component: TestWebhookComponent;
  let fixture: ComponentFixture<TestWebhookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestWebhookComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestWebhookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
