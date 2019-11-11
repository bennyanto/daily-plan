import { Task } from "./task";
export class Plan {
    _id: string; // riferito all id del db
    _rev: string; // serve per contrllo couch db
    hasFinished: boolean;

    constructor(
        public tasks: Task[] = [new Task()] // array di tasks
    ) {}
}
