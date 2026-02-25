import { todoReducer, estadoInicial } from './todo.reducer';
import { 
  cargarTodosSuccess, 
  crearSuccess, 
  borrarSuccess, 
  toggleSuccess,
  editarSuccess,
  buscarTodosSuccess,
  toggleAll
} from './todo.action';
import { Todo } from './models/todo.model';

describe('Todo Reducer', () => {
  
  it('debería retornar el estado inicial', () => {
    const action = { type: 'Unknown' };
    const result = todoReducer(undefined, action as any);
    
    expect(result).toEqual(estadoInicial);
  });

  it('debería cargar los todos con cargarTodosSuccess', () => {
    const todos: Todo[] = [
      { todoId: 1, content: 'Tarea 1', isCompleted: false },
      { todoId: 2, content: 'Tarea 2', isCompleted: true }
    ];
    
    const action = cargarTodosSuccess({ todos });
    const result = todoReducer(estadoInicial, action);
    
    expect(result.length).toBe(2);
    expect(result).toEqual(todos);
  });

  it('debería agregar un nuevo todo con crearSuccess', () => {
    const estadoActual: Todo[] = [
      { todoId: 1, content: 'Tarea 1', isCompleted: false }
    ];
    
    const nuevoTodo: Todo = { todoId: 2, content: 'Tarea 2', isCompleted: false };
    const action = crearSuccess({ todo: nuevoTodo });
    const result = todoReducer(estadoActual, action);
    
    expect(result.length).toBe(2);
    expect(result[1]).toEqual(nuevoTodo);
  });

  it('debería eliminar un todo con borrarSuccess', () => {
    const estadoActual: Todo[] = [
      { todoId: 1, content: 'Tarea 1', isCompleted: false },
      { todoId: 2, content: 'Tarea 2', isCompleted: false },
      { todoId: 3, content: 'Tarea 3', isCompleted: false }
    ];
    
    const action = borrarSuccess({ todoId: 2 });
    const result = todoReducer(estadoActual, action);
    
    expect(result.length).toBe(2);
    expect(result.find(t => t.todoId === 2)).toBeUndefined();
  });

  it('debería actualizar el estado de completado con toggleSuccess', () => {
    const estadoActual: Todo[] = [
      { todoId: 1, content: 'Tarea 1', isCompleted: false }
    ];
    
    const todoActualizado: Todo = { todoId: 1, content: 'Tarea 1', isCompleted: true };
    const action = toggleSuccess({ todo: todoActualizado });
    const result = todoReducer(estadoActual, action);
    
    expect(result[0].isCompleted).toBe(true);
  });

  it('debería actualizar el contenido con editarSuccess', () => {
    const estadoActual: Todo[] = [
      { todoId: 1, content: 'Tarea 1', isCompleted: false }
    ];
    
    const todoEditado: Todo = { todoId: 1, content: 'Tarea Editada', isCompleted: false };
    const action = editarSuccess({ todo: todoEditado });
    const result = todoReducer(estadoActual, action);
    
    expect(result[0].content).toBe('Tarea Editada');
  });

  it('debería marcar todos como completados con toggleAll', () => {
    const estadoActual: Todo[] = [
      { todoId: 1, content: 'Tarea 1', isCompleted: false },
      { todoId: 2, content: 'Tarea 2', isCompleted: false }
    ];
    
    const action = toggleAll({ isCompleted: true });
    const result = todoReducer(estadoActual, action);
    
    expect(result.every(t => t.isCompleted)).toBe(true);
  });

  it('debería actualizar los todos con buscarTodosSuccess', () => {
    const estadoActual: Todo[] = [
      { todoId: 1, content: 'Tarea 1', isCompleted: false },
      { todoId: 2, content: 'Tarea 2', isCompleted: false }
    ];
    
    const todosEncontrados: Todo[] = [
      { todoId: 1, content: 'Tarea 1', isCompleted: false }
    ];
    
    const action = buscarTodosSuccess({ todos: todosEncontrados });
    const result = todoReducer(estadoActual, action);
    
    expect(result.length).toBe(1);
    expect(result).toEqual(todosEncontrados);
  });
});
