export class Task {
  isDone: boolean;
  isEnabled: boolean;
  isCheckEnable: boolean;
  constructor(
    public title: string = '',
    public tempotrascorso: number = 0
  ) {}
}
