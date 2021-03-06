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
    private routeSub: Subscription;
    isRunning: boolean;
    currentTaskIndex = 0; // indice del task partito dal tasto play
    intervalID; // ogni secondo incrementa il tempo (tempotrascorso ) di 1
    plan: Plan;
    checked = false;
    disabled = false; // prpp checkbox



    constructor(
        private route: ActivatedRoute,
        private db: PouchdbService,
        private snackbar: MatSnackBar
    ) { }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params: Params) => {
            this.db
                .getPlan(params.id) // prendiamo piano dal db e guarda html con for per mostrare plan
                .then(plan => {
                    this.plan = plan;
                    console.log(this.plan);

                    this.init();
                })
                .catch(error => {
                    console.log(error);
                    this.snackbar.open('Errore nel caricamento dei dati', 'Error', {
                        duration: 2000
                    });
                });
        });
    }

    init() {
        this.currentTaskIndex = 0;
        this.isRunning = false;
        this.plan.tasks.forEach(task => {

            task.tempotrascorso = 0;
            task.isDone = false;
            task.isEnabled = true;

        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }

    runTask() {
        const task = this.plan.tasks[this.currentTaskIndex]; // currentTaskIndex è a 0
        this.intervalID = setInterval(() => {
            task.tempotrascorso++;
            task.isCheckEnable = true;

            console.log(task.tempotrascorso);
        }, 1000);
    }

    play() {
        this.runTask();
        this.checked = false;
        this.isRunning = true;
    }

    pause() {
        clearInterval(this.intervalID);
        this.isRunning = false;
    }

    stop() {
        this.pause();
        this.checked = false;
    }
    // ccione iniziale per iniziare
    togglePlayStop() {
        const task = this.plan.tasks[this.currentTaskIndex];
        if (this.isRunning) {
            // se è gia partito / pausa
            this.pause();
            task.isCheckEnable = false;


        } else {
            this.play();
            task.isCheckEnable = true;


        }
    }

    check() {
        console.log("this.checked", this.checked);
        const task = this.plan.tasks[this.currentTaskIndex];


        if (!this.checked) {
            this.checked = true;
            task.isEnabled = false;
        } else if (this.checked) {
            this.snackbar.open('hai già finito questo task!');
        }

        if (this.checked && this.isRunning) {
            // checked prop [ng module], quando check il checked va a true con bana
            task.isEnabled = false;
            this.stop();
            task.isDone = true;

            this.currentTaskIndex++;
            if (this.currentTaskIndex < this.plan.tasks.length) {
                this.play();

            } else {
                setTimeout(() => {
                    this.snackbar.open("Hai finito il programma!", null, { duration: 2000 });
                    this.disabled = true;
                    this.plan.hasFinished = true;
                    console.log(this);
                }, 500);

            }
        }
    }
}
