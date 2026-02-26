import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import * as actions from '../todo.action';
import { Todo } from '../models/todo.model';

@Component({
  selector: 'app-todo-page',
  standalone: false,
  templateUrl: './todo-page.html'
})
export class TodoPage implements OnInit {

  completado: boolean = false;
  todos: Todo[] = [];

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    // Cargar todos desde el backend al iniciar el componente
    this.store.dispatch(actions.cargarTodos());

    // Suscribirse a los cambios de todos
    this.store.subscribe( state => {
      this.todos = state.todos;
    });
  }

  toggleAll(){
    this.completado = !this.completado;
    const todosToUpdate = this.todos.map( todo => ({
      todoId: todo.todoId,
      isCompleted: this.completado
    }));
    this.store.dispatch( actions.toggleAll({ todos: todosToUpdate }) );
  }
}
