import {createAction, props} from '@ngrx/store';
import { Todo } from './models/todo.model';

export const cargarTodos = createAction(
  '[TODO] Cargar Todos'
);

export const cargarTodosSuccess = createAction(
  '[TODO] Cargar Todos Success',
  props<{ todos: Todo[] }>()
);

export const cargarTodosError = createAction(
  '[TODO] Cargar Todos Error',
  props<{ error: any }>()
);

// Crear Todo
export const crear = createAction(
  '[TODO] Crear Todo',
  props<{ content: string }>()
);

export const crearSuccess = createAction(
  '[TODO] Crear Todo Success',
  props<{ todo: Todo }>()
);

export const crearError = createAction(
  '[TODO] Crear Todo Error',
  props<{ error: any }>()
);

// Toggle Todo
export const toggle = createAction(
  '[TODO] Toggle Todo',
  props<{ todoId: number, isCompleted: boolean }>()
);

export const toggleSuccess = createAction(
  '[TODO] Toggle Todo Success',
  props<{ todo: Todo }>()
);

export const toggleError = createAction(
  '[TODO] Toggle Todo Error',
  props<{ error: any }>()
);

// Editar Todo
export const editar = createAction(
  '[TODO] Editar Todo',
  props<{ todoId: number, content: string }>()
);

export const editarSuccess = createAction(
  '[TODO] Editar Todo Success',
  props<{ todo: Todo }>()
);

export const editarError = createAction(
  '[TODO] Editar Todo Error',
  props<{ error: any }>()
);

// Borrar Todo
export const borrar = createAction(
  '[TODO] Borrar Todo',
  props<{ todoId: number }>()
);

export const borrarSuccess = createAction(
  '[TODO] Borrar Todo Success',
  props<{ todoId: number }>()
);

export const borrarError = createAction(
  '[TODO] Borrar Todo Error',
  props<{ error: any }>()
);

// Toggle All
export const toggleAll = createAction(
  '[TODO] Toggle All Todo',
  props<{ isCompleted: boolean }>()
);

// Limpiar Todos Completados
export const limpiarTodos = createAction(
  '[TODO] Limpiar Todos Completados',
  props<{ todoIds: number[] }>()
);

// Buscar Todos
export const buscarTodos = createAction(
  '[TODO] Buscar Todos',
  props<{ content: string }>()
);

export const buscarTodosSuccess = createAction(
  '[TODO] Buscar Todos Success',
  props<{ todos: Todo[] }>()
);

export const buscarTodosError = createAction(
  '[TODO] Buscar Todos Error',
  props<{ error: any }>()
);
