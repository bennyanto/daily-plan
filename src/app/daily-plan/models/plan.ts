import { Task } from './task';
export class Plan {
  _id: string; // riferito all id del db
  _rev: string; // serve per contrllo couch db

  constructor(
    public title: string = '', //
    public tasks: Task[] = [new Task()] // array di tasks
  ) {}
}
