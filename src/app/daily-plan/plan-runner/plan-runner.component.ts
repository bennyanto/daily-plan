import { MatSnackBar } from '@angular/material';
import { Plan } from './../models/plan';
import { PouchdbService } from './../services/pouchdb.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-plan-runner',
  templateUrl: './plan-runner.component.html',
  styleUrls: ['./plan-runner.component.scss']
})
export class PlanRunnerComponent implements OnInit {
  isRunning: boolean;

  intervallID: null;
  plan: Plan;
  private routeSub: Subscription;



  constructor(
    private route: ActivatedRoute,
    private db: PouchdbService,
    private snackbar: MatSnackBar)
    {}

ngOnInit() {
      this.routeSub = this.route.params.subscribe((
        params: Params) => {
          this.db
          .getPlan(params.id)
          .then(plan => {
            this.plan = plan;

          })
          .catch(error =>  {
            console.log(error);
            this.snackbar.open('erorr nel car dei dati', 'eroor', {
              duration: 2000
            });
          });

        });
}


ngOnDestroy() {
this.routeSub.unsubscribe();
}
runTask() {

}
play() {
  this.runTask();
  this.isRunning = true;
}

pause() {

}

stop() {

}

togglePlayStop() {
  if(this.isRunning) {
    this.pause();
  } else {
    this.play();
  }
}

uncheckTask() {

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
//

}
