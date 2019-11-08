import { Plan } from './../models/plan';
import { MatSnackBar } from '@angular/material';
import { PouchdbService } from './../services/pouchdb.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-plan-list',
  templateUrl: './plan-list.component.html',
  styleUrls: ['./plan-list.component.scss']
})
export class PlanListComponent implements OnInit {
  plans: Plan[];
  constructor(private db: PouchdbService, private snackbar: MatSnackBar) { }

  ngOnInit() {

    // this.db.setPlan(new Plan());

    this.db.fetchPlans().then(plans => {
      this.plans = plans;
    }).catch(error => {
      console.log(error);
      this.snackbar.open("Errore nel caricamento dal dataBase", "Errore", {duration: 2000})

    })
  }

}
