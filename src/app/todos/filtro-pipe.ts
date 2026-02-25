import { Pipe, PipeTransform } from '@angular/core';
import { Todo } from './models/todo.model';
import { filtrosValidos } from '../filtro/filtro.actions';

@Pipe({
  name: 'filtrTodo',
  standalone: false
})
export class FiltroPipe implements PipeTransform {

  transform(todos: Todo[], filtro: filtrosValidos): Todo[] {

    switch (filtro) {
      case 'completados':
        return todos.filter( todo => todo.isCompleted );
      case 'pendientes':
        return todos.filter( todo => !todo.isCompleted );
      default:
        return todos;
    }
  }
}
