import { Plan } from './models/plan';
import { MatSnackBar } from '@angular/material';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-daily-plan',
  templateUrl: './daily-plan.component.html',
  styleUrls: ['./daily-plan.component.scss']
})
export class DailyPlanComponent implements OnInit {

  plans: Plan[];
  constructor() { }

  ngOnInit() {

  }

}
