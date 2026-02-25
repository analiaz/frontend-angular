import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Todo } from '../models/todo.model';
import { AppState } from '../../app.reducer';
import { filtrosValidos } from '../../filtro/filtro.actions';

@Component({
  selector: 'app-todo-list',
  standalone: false,
  templateUrl: './todo-list.html',
})
export class TodoList implements OnInit {

  todos: Todo[] = [];
  filtroActual!: filtrosValidos;

  constructor( private store: Store<AppState>) { }

  ngOnInit(): void {

    this.store.subscribe( state => {
      this.todos = state.todos;
      this.filtroActual = state.filtro;
    });
  }
}
