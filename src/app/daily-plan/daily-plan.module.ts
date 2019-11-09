import { AppRoutingModule } from "./../app-routing.module";
import { DailyPlanComponent } from "./daily-plan.component";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PlanEditComponent } from "./plan-edit/plan-edit.component";
import { PlanRunnerComponent } from "./plan-runner/plan-runner.component";
import { FooterComponent } from "./footer/footer.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import {
    MatToolbarModule,
    MatStepperModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatSnackBarModule,
    MatExpansionModule,
    MatTooltipModule,
    MatNativeDateModule,
    MatMenuModule,
    MatCheckboxModule
} from "@angular/material";
import { PlanListComponent } from "./plan-list/plan-list.component";

@NgModule({
    declarations: [
        PlanEditComponent,
        PlanRunnerComponent,
        FooterComponent,
        NavbarComponent,
        DailyPlanComponent,
        PlanListComponent
    ],
    imports: [
        CommonModule,
        MatDatepickerModule,
        MatToolbarModule,
        MatStepperModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatListModule,
        MatSnackBarModule,
        MatExpansionModule,
        MatTooltipModule,
        ReactiveFormsModule,
        AppRoutingModule,
        MatFormFieldModule,
        MatNativeDateModule,
        MatMenuModule,
        MatCheckboxModule
    ],
    exports: [DailyPlanComponent]
})
export class DailyPlanModule {}
