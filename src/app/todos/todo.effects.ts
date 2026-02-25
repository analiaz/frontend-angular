import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError, concatMap } from 'rxjs/operators';
import { of, from } from 'rxjs';
import { TodoService } from './services/todo.service';
import * as TodoActions from './todo.action';

@Injectable()
export class TodoEffects {
  private actions$ = inject(Actions);
  private todoService = inject(TodoService);
  
  // Cargar todos
  loadTodos$ = createEffect(() => 
    this.actions$.pipe(
      ofType(TodoActions.cargarTodos),
      mergeMap(() =>
        this.todoService.getTodos().pipe(
          map(todos => TodoActions.cargarTodosSuccess({ todos })),
          catchError(error => of(TodoActions.cargarTodosError({ error })))
        )
      )
    )
  );

  // Crear todo
  createTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.crear),
      mergeMap(({ content }) =>
        this.todoService.createTodo(content).pipe(
          map(todo => TodoActions.crearSuccess({ todo })),
          catchError(error => of(TodoActions.crearError({ error })))
        )
      )
    )
  );

  // Toggle todo
  toggleTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.toggle),
      mergeMap(({ todoId, isCompleted }) =>
        this.todoService.updateTodo(todoId, { isCompleted }).pipe(
          map(todo => TodoActions.toggleSuccess({ todo })),
          catchError(error => of(TodoActions.toggleError({ error })))
        )
      )
    )
  );

  // Editar todo
  editTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.editar),
      mergeMap(({ todoId, content }) =>
        this.todoService.updateTodo(todoId, { content }).pipe(
          map(todo => TodoActions.editarSuccess({ todo })),
          catchError(error => of(TodoActions.editarError({ error })))
        )
      )
    )
  );

  // Borrar todo
  deleteTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.borrar),
      mergeMap(({ todoId }) =>
        this.todoService.deleteTodo(todoId).pipe(
          map(() => TodoActions.borrarSuccess({ todoId })),
          catchError(error => of(TodoActions.borrarError({ error })))
        )
      )
    )
  );

  // Limpiar todos completados - envía cada uno al backend
  limpiarTodos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.limpiarTodos),
      mergeMap(({ todoIds }) =>
        from(todoIds).pipe(
          concatMap(todoId =>
            this.todoService.deleteTodo(todoId).pipe(
              map(() => TodoActions.borrarSuccess({ todoId })),
              catchError(error => of(TodoActions.borrarError({ error })))
            )
          )
        )
      )
    )
  );

  // Buscar todos
  searchTodos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.buscarTodos),
      mergeMap(({ content }) =>
        this.todoService.searchTodos(content).pipe(
          map(todos => TodoActions.buscarTodosSuccess({ todos })),
          catchError(error => of(TodoActions.buscarTodosError({ error })))
        )
      )
    )
  );
}