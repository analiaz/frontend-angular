import { createReducer, on} from '@ngrx/store';
import { Todo } from './models/todo.model';
import {
  borrarSuccess,
  buscarTodosSuccess,
  cargarTodosSuccess,
  crearSuccess,
  editarSuccess,
  toggleSuccess
} from './todo.action';

// Estado inicial vacío - los datos se cargan desde el backend
export const estadoInicial: Todo[] = [];

export const todoReducer = createReducer(estadoInicial,
  // Cargar todos desde backend
  on( cargarTodosSuccess, (state, { todos }) => todos ),

  // Buscar todos
  on( buscarTodosSuccess, (state, { todos }) => todos ),

  // Crear todo (actualiza con la respuesta del backend)
  on( crearSuccess, (state, { todo }) => [ ...state, todo ] ),

  // Borrar todo (usa el id retornado del backend)
  on( borrarSuccess, (state, {todoId}) => state.filter( todo => todo.todoId !== todoId )),

  // Toggle (actualiza con la respuesta del backend)
  on( toggleSuccess, (state, { todo }) => {
    return state.map( t => t.todoId === todo.todoId ? todo : t );
  }),

  // Editar (actualiza con la respuesta del backend)
  on( editarSuccess, (state, { todo }) => {
    return state.map( t => t.todoId === todo.todoId ? todo : t );
  }),
);
