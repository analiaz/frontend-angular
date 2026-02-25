import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import * as actions from '../../filtro/filtro.actions';
import { limpiarTodos } from '../todo.action';
import { Todo } from '../models/todo.model';

@Component({
  selector: 'app-todo-footer',
  standalone: false,
  templateUrl: './todo-footer.html'
})
export class TodoFooter implements OnInit {

  filtroActual: actions.filtrosValidos = 'todos';
  filtros: actions.filtrosValidos[] = ['todos', 'completados', 'pendientes'];

  pendientes = 0;
  todosCompletados: Todo[] = [];


  constructor( private store: Store<AppState>) { }

  ngOnInit(): void {

    this.store.subscribe( state => {
      this.filtroActual = state.filtro;
      this.pendientes = state.todos.filter( todo => !todo.isCompleted).length;
      this.todosCompletados = state.todos.filter( todo => todo.isCompleted);
    });
  }

  cambiarFiltro(filtro: actions.filtrosValidos) {
    this.store.dispatch( actions.setFiltro({ filtro: filtro }) );
  }

  limpiarCompletados() {
    const todoIds = this.todosCompletados.map( todo => todo.todoId );
    this.store.dispatch( limpiarTodos({ todoIds }) );
  }
}
