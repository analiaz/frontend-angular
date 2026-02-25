import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { buscarTodos, cargarTodos } from '../todo.action';

@Component({
  selector: 'app-todo-search',
  standalone: false,
  templateUrl: './todo-search.html',
  styleUrl: './todo-search.css',
})
export class TodoSearch implements OnInit, OnDestroy {
  searchControl = new FormControl('');
  private searchSubscription?: Subscription;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.searchSubscription = this.searchControl.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        filter(text => text !== null)
      )
      .subscribe(searchText => {
        if (searchText && searchText.length >= 3) {
          // Buscar cuando hay 3 o más caracteres
          this.store.dispatch(buscarTodos({ content: searchText }));
        } else if (searchText?.length === 0) {
          // Recargar todos cuando se limpia el buscador
          this.store.dispatch(cargarTodos());
        }
      });
  }

  ngOnDestroy(): void {
    this.searchSubscription?.unsubscribe();
  }
}
