import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlanEditComponent } from './plan-edit/plan-edit.component';
import { PlanRunnerComponent } from './plan-runner/plan-runner.component';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';



@NgModule({
  declarations: [PlanEditComponent, PlanRunnerComponent, FooterComponent, NavbarComponent],
  imports: [
    CommonModule
  ]
})
export class DailyPlanModule { }
