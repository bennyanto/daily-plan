import { PouchdbService } from './../services/pouchdb.service';
// importiamo interf
import { Plan } from './../models/plan';
import {Task} from './../models/task';


import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';


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

  insertTask(index: number) {
    this.tasks.insert(index, this.buildGroup());
  }
  removeTask(index: number) {
    this.tasks.removeAt(index);
  }
  submitForm() {
    if (!this.form.valid) {
      return;
    }
    this.db.setPlan(this.form.value)
    .then( response => {
      this.snackbar.open('salvataggio avv con succ', null, {
        duration: 2000
      });

      this.init(); // controlare

      if(!this.form.value.id) {
        this.form.value._id = response.id;
        this.router.navigate([`/plan/edit/${response.id}`]); // contrllare
      }

    }).catch(error => {
      this.snackbar.open('salvataggio avv con succ', null, {
        duration: 2000
      });
      console.log(error);
    });

  }










}
