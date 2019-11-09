import { MatSnackBar } from '@angular/material';
import { Plan } from './../models/plan';
import { PouchdbService } from './../services/pouchdb.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';


@Component({
    selector: 'app-plan-runner',
    templateUrl: './plan-runner.component.html',
    styleUrls: ['./plan-runner.component.scss'],
})
export class PlanRunnerComponent implements OnInit {
    isRunning: boolean;
    currentTaskIndex = 0; // indice del task partito dal tasto play
    intervalID; // ogni secondo incrementa il tempo (tempotrascorso ) di 1
    plan: Plan;
    checked = false;
    private routeSub: Subscription;

    constructor(
        private route: ActivatedRoute,
        private db: PouchdbService,
        private snackbar: MatSnackBar
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params: Params) => {
            this.db
                .getPlan(params.id) // prendiamo piano dal db e guarda html con for per mostrare plan
                .then(plan => {
                    this.plan = plan;
                    console.log(this.plan);

                })
                .catch(error => {
                    console.log(error);
                    this.snackbar.open('Errore nel caricamento dei dati', 'Error', {
                        duration: 2000
                    });
                });
        });
    }
    //init() {
    // this.intervalID = null;
    // }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }

    runTask() {
        const task = this.plan.tasks[this.currentTaskIndex]; //currentTaskIndex è a 0
        this.intervalID = setInterval(() => {
            task.tempotrascorso++;
            console.log(task.tempotrascorso);
        }, 1000);
    }

    play() {
        this.runTask();
        this.isRunning = true;
    }

    pause() {
        clearInterval(this.intervalID);
        this.isRunning = false;
    }

    stop() {
        this.pause();
    }
    // ccione iniziale per iniziare
    togglePlayStop() {
        if (this.isRunning) {
            // se è gia partito / pausa
            this.pause();
        } else {
            this.play();
        }
    }

    check() {
        const task = this.plan.tasks[this.currentTaskIndex];
        if (this.checked) {
            // checked prop [ng module], quando check il checked va a true con bana
            task.isDone = true;
            this.currentTaskIndex++;
            this.runTask();
        }
    }
}
