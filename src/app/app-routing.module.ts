import { PlanListComponent } from './daily-plan/plan-list/plan-list.component';
import { PlanRunnerComponent } from './daily-plan/plan-runner/plan-runner.component';
import { PlanEditComponent } from './daily-plan/plan-edit/plan-edit.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: 'plan', component: PlanListComponent}, // dailyplancompoentn è la home
  { path: 'plan/edit/:id', component: PlanEditComponent},
  { path: 'plan/:id', component: PlanRunnerComponent },
  { path: '', redirectTo: '/plan', pathMatch: 'full'} // ritorna alla homr
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
