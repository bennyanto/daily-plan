import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanRunnerComponent } from './plan-runner.component';

describe('PlanRunnerComponent', () => {
  let component: PlanRunnerComponent;
  let fixture: ComponentFixture<PlanRunnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanRunnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanRunnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
