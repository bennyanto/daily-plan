import { Plan } from './../models/plan';
import { MatSnackBar, MatCalendar } from '@angular/material';
import { PouchdbService } from './../services/pouchdb.service';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
    selector: 'app-plan-list',
    templateUrl: './plan-list.component.html',
    styleUrls: ['./plan-list.component.scss']
})
export class PlanListComponent implements OnInit {
    plan: Plan;
    selectedDate;
    currentDateString = `${this.setDate(new Date())}`;
    @ViewChild('calendar', null) calendar: MatCalendar<Date>;

    constructor(private db: PouchdbService, private snackbar: MatSnackBar) {}

    ngOnInit() {
        this.db
            .getPlan(this.currentDateString)
            .then(plan => {
                this.plan = plan;
                console.log(this.plan);
            })
            .catch(error => {
                console.log(error);
                this.snackbar.open(
                    'Errore nel caricamento dal dataBase',
                    'Errore',
                    { duration: 2000 }
                );
            });
    }

    setDate(date) {
        const dataValue = date.toString().substring(0, 15);
        const data = new Date(dataValue).getTime();
        return data;
    }
}
