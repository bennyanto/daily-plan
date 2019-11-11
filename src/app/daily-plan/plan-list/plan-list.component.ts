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
    plan2: Plan;
    selectedDate = new Date();
    currentDateString = `${this.setDate(new Date())}`;
    compareDate;
    @ViewChild('calendar', null) calendar: MatCalendar<Date>;

    constructor(private db: PouchdbService, private snackbar: MatSnackBar) { }

    ngOnInit() {
        this.init();
    }
    init() {
        //console.log("selectdate",this.selectedDate);

        this.db
            .getPlan(this.currentDateString)
            .then(plan => {
                this.plan = plan;
                // console.log(this.plan);
            }).catch((error) => {
                this.plan = null;
            })
    }

    setDate(date) {
        const dataValue = date.toString().substring(0, 15);
        const data = new Date(dataValue).getTime();
        return data;
    }


    clicked() {
        let tmp = this.setDate(this.selectedDate).toString();
        this.compareDate = tmp;
        this.fetchPlanDate();
        console.log("tmp",tmp);
        return;
    }
    fetchPlanDate() {
        this.db
        .getPlan(this.compareDate)
        .then(plan => {
            this.plan2 = plan;

        });
    }

    eliminaPiano() {
        this.db.deletePlan(this.plan).then(() => {
            console.log(" piano rimosso con successo");
            this.init();
        }).catch(() => {
            console.log("piano non rimosso");
        });
    }
}
