import { MatSnackBar } from '@angular/material';
import { Plan } from './../models/plan';
import { PouchdbService } from './../services/pouchdb.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-plan-runner',
  templateUrl: './plan-runner.component.html',
  styleUrls: ['./plan-runner.component.scss']
})
export class PlanRunnerComponent implements OnInit {
  isRunning: boolean;
  plan: Plan;
  hasFinished: boolean;



  constructor(
    private route: ActivatedRoute,
    private db: PouchdbService,
    private snackBar: MatSnackBar)
    {}

  ngOnInit() {
  }

}

// checked = false;
// indeterminate = false;
// labelPosition = 'after';
// disabled = false;

//  step = 0;

//  setStep(index: number) {
//        this.step = index;
//    }

//    nextStep() {
//        this.step++;
//    }

//    prevStep() {
//        this.step--;
//    }
