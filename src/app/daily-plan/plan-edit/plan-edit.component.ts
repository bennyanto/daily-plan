import { PouchdbService } from './../services/pouchdb.service';
// importiamo interf
import { Plan } from './../models/plan';
import { Task } from './../models/task';

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import {
    FormGroup,
    FormBuilder,
    Validators,
    FormArray,
    FormControl
} from '@angular/forms';

@Component({
    selector: 'app-plan-edit',
    templateUrl: './plan-edit.component.html',
    styleUrls: ['./plan-edit.component.scss']
})
export class PlanEditComponent implements OnInit, OnDestroy {

  private routeSub: Subscription;
  form: FormGroup;

  currentDate = new FormControl(new Date());
  serializedDate = new FormControl((new Date()).toISOString());
  private plan: Plan = new Plan('piano1');

  currentDate = new Date(); // odierna
  private plan: Plan = new Plan();




  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private snackbar: MatSnackBar,
    private db: PouchdbService
  ) { }


  ngOnInit() {
    this.init();
  }
  ngOnDestroy(): void { // quando viene cancellato cancelliamo la sottoscrizione e non siamo + in ascolto
    this.routeSub.unsubscribe();
  }

  init() {

    console.log(this.plan);
  }

  addTask() {
    this.tasks.push(this.buildGroup());
  }

  fetchData() {

  }
  createForm(plan: Plan) {
    const tasks = plan.tasks.map(task => this.buildGroup(task));
  }

  buildGroup(task: Task = new Task()) {
    return this.formBuilder.group({
      title: [task.title || null, Validators.required],
      isDone: [task.isDone || false],
      tempotrascorso: [task.tempotrascorso || 0]
    });
  }

  // manca comment
  createForm(plan: Plan) {
    const tasks = plan.tasks.map(task => this.buildGroup(task));
    this.form = this.formBuilder.group({ //crea form //crea gruppo con qst prorp
      _id: this.trueID, // genra id al giorno di oggi
      _rev: [plan._rev],
      tasks: this.formBuilder.array(tasks) // tuttitasks

    });
  }
  get tasks() {
    return this.form.get('tasks') as FormArray;
  }
  addTask() {
    this.tasks.push(this.buildGroup());
  }



  insertTask(index: number) {
    this.tasks.insert(index, this.buildGroup());
  }
  removeTask(index: number) {
    this.tasks.removeAt(index);
  }
  submitForm() {
    if (!this.form.valid) {
      return;

    private routeSub: Subscription;
    form: FormGroup;
    currentDate = this.setDate(new Date()); // odierna

    date = new FormControl(new Date());
    serializedDate = new FormControl(new Date().toISOString());

    compareDate = this.setDate(this.date.value);
    trueID: string = `${this.compareDate}`; // id del piano gironalieor

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private formBuilder: FormBuilder,
        private snackbar: MatSnackBar,
        private db: PouchdbService
    ) {}

    ngOnInit() {
        this.init();
    }
    ngOnDestroy(): void {
        // quando viene cancellato cancelliamo la sottoscrizione e non siamo + in ascolto
        this.routeSub.unsubscribe();
    }
    setDate(date) {
        const dataValue = date.toString().substring(0, 15);
        const data = new Date(dataValue).getTime();
        return data;

    }

    init() {
        if (this.routeSub) {
            // comm
            this.routeSub.unsubscribe();
        }
        this.routeSub = this.route.params.subscribe((params: Params) => {
            console.log('params.id', params.id);

            // controlliamo dal db
            if (params.id == 0) {
                this.createForm(new Plan());
            } else if (params.id == this.currentDate) {
                this.db.getPlan(params.id).then((plan: Plan) => {
                    this.createForm(plan);
                });
            } else if (this.currentDate < this.compareDate) {
                // deu ogg data //coonto secodni
                this.trueID = this.date.toString();
                this.createForm(new Plan());
            }
            // else if (this.currentDate > this.compareDate) {
            //     // deu ogg data //coonto secodni
            //     this.snackbar.open(
            //         'non inserire un piano con data precedente ad oggi',
            //         null,
            //         { duration: 2000 }
            //     );
            // }
        });
    }

    buildGroup(task: Task = new Task()) {
        return this.formBuilder.group({
            title: [task.title || null, Validators.required],
            isDone: [task.isDone || false],
            tempotrascorso: [task.tempotrascorso || 0]
        });
    }
    // manca comment
    createForm(plan: Plan) {
        const id = this.trueID;
        const tasks = plan.tasks.map(task => this.buildGroup(task));
        this.form = this.formBuilder.group({
            // crea form //crea gruppo con qst prorp
            _id: id, // genra id al giorno di oggi
            _rev: [plan._rev],
            tasks: this.formBuilder.array(tasks) // tuttitasks
        });
    }
    get tasks() {
        return this.form.get('tasks') as FormArray;
    }
    addTask() {
        this.tasks.push(this.buildGroup());
    }

    insertTask(index: number) {
        this.tasks.insert(index, this.buildGroup());
    }
    removeTask(index: number) {
        this.tasks.removeAt(index);
    }
    submitForm() {
        console.log('submit ', this.compareDate);
        console.log('submit ',this.currentDate);
        if (!this.form.valid) {
            return;
        }
        console.log(this.form.value);

        this.db
            .setPlan(this.form.value)
            .then(response => {
                this.snackbar.open('salvataggio avv con succ', null, {
                    duration: 2000
                });

                this.init(); // fa resettare il form

                if (!this.form.value.id) {
                    this.form.value._id = response.id;
                    this.router.navigate([`/plan/edit/${response.id}`]); // una volta salvato il form ci porta in edit del plan id
                }
            })
            .catch(error => {
                this.snackbar.open('Errore nel salvataggio sul DB', "Errore", {
                    duration: 2000
                });
                console.log(error);
            });
    }
}
