export class Task {
  isDone: boolean;
  isEnabled: boolean;
  constructor(
    public title: string = '',
    public tempotrascorso: number = 0
  ) {}
}
