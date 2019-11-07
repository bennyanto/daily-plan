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
    private snackbar: MatSnackBar
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









}
