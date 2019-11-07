import { Plan } from './../models/plan';

export interface PlanQL {
  getPlan(id: string): Promise<Plan>;
  fetchPlans(): Promise<Plan[]>;
  setPlan(plan: Plan): Promise<any>;
  deletePlan(plan: Plan): Promise<any>;
}
