import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-plan-edit',
  templateUrl: './plan-edit.component.html',
  styleUrls: ['./plan-edit.component.scss']
})


export class PlanEditComponent implements OnInit, OnDestroy {
  private routeSub: Subscription;
  form: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private snackbar: MatSnackBar
  ) { }



  ngOnInit() {
    this.init();
  }

  init() {

  }

  ngOnDestroy(): void { // quando viene cancellato cancelliamo la sottoscrizione e non siamo + in ascolto
    this.routeSub.unsubscribe();
  }

}
