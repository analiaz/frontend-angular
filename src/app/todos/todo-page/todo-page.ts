import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import * as actions from '../todo.action';

@Component({
  selector: 'app-todo-page',
  standalone: false,
  templateUrl: './todo-page.html'
})
export class TodoPage implements OnInit {

  completado: boolean = false;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    // Cargar todos desde el backend al iniciar el componente
    this.store.dispatch(actions.cargarTodos());
  }

  toggleAll(){
    this.completado = !this.completado;
    this.store.dispatch( actions.toggleAll({ isCompleted: this.completado }) );
  }
}
