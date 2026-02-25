export class Todo {
  public todoId: number;
  public content: string;
  public isCompleted: boolean;

  constructor( content: string ) {
    this.todoId = Math.random();
    this.content = content;
    this.isCompleted = false;
  }
}
