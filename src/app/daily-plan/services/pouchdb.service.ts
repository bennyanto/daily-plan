import { PlanQL } from './../models/plan-ql';
import { Plan } from './../models/plan';
import { Injectable } from '@angular/core';
import PouchDB from 'pouchdb';
/////////////////////// FINITO

@Injectable({
    providedIn: 'root'
})
export class PouchdbService implements PlanQL {
    localDB: PouchDB;

    constructor() {
        this.localDB = new PouchDB('progetto');
    }
    getPlan(id: string): Promise<Plan> {
        return this.localDB.get(id);
    }
    fetchPlans(): Promise<Plan[]> {
        // recupera tutti i piani giornaliri e vecchi
        return this.localDB
            .allDocs({ include_docs: true })
            .then(response => response.rows.map(item => item.doc));
    }
    // modifica o crea il piano
    // salviamo => se l id è uguale a quello del db fa modificeh, altrimenti crea nuovo
    setPlan(plan: Plan): Promise<any> {
        if (plan._id) {
            return this.updatePlan(plan);
        } else {
            return this.createPlan(plan);
        }
    }

    deletePlan(plan: Plan): Promise<any> {
        // cancella dal db
        return this.localDB.remove(plan);
    }

    private updatePlan(plan: Plan): Promise<any> {
        // aggiorna il piano del db
        return this.localDB.put(plan);
    }
    private createPlan(plan: Plan): Promise<any> {
        // creo nuovo piano nel db
        return this.localDB.post(plan);
    }

    // get plan prende il singolo piano per id. quando clicchiamo su quell index
}
