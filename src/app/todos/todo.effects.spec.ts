import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of, throwError } from 'rxjs';
import { TodoEffects } from './todo.effects';
import { TodoService } from './services/todo.service';
import * as TodoActions from './todo.action';
import { Todo } from './models/todo.model';

describe('TodoEffects', () => {
  let actions$: Observable<any>;
  let effects: TodoEffects;
  let todoService: jasmine.SpyObj<TodoService>;

  const mockTodos: Todo[] = [
    { todoId: 1, content: 'Tarea 1', isCompleted: false },
    { todoId: 2, content: 'Tarea 2', isCompleted: true }
  ];

  beforeEach(() => {
    const todoServiceSpy = jasmine.createSpyObj('TodoService', [
      'getTodos',
      'createTodo',
      'updateTodo',
      'deleteTodo',
      'searchTodos'
    ]);

    TestBed.configureTestingModule({
      providers: [
        TodoEffects,
        provideMockActions(() => actions$),
        { provide: TodoService, useValue: todoServiceSpy }
      ]
    });

    effects = TestBed.inject(TodoEffects);
    todoService = TestBed.inject(TodoService) as jasmine.SpyObj<TodoService>;
  });

  describe('loadTodos$', () => {
    it('debería retornar cargarTodosSuccess cuando la carga es exitosa', (done) => {
      const action = TodoActions.cargarTodos();

      todoService.getTodos.and.returnValue(of(mockTodos));
      actions$ = of(action);

      effects.loadTodos$.subscribe(result => {
        expect(result).toEqual(TodoActions.cargarTodosSuccess({ todos: mockTodos }));
        expect(todoService.getTodos).toHaveBeenCalled();
        done();
      });
    });

    it('debería retornar cargarTodosError cuando la carga falla', (done) => {
      const action = TodoActions.cargarTodos();
      const error = { message: 'Error al cargar' };

      todoService.getTodos.and.returnValue(throwError(() => error));
      actions$ = of(action);

      effects.loadTodos$.subscribe(result => {
        expect(result).toEqual(TodoActions.cargarTodosError({ error }));
        done();
      });
    });
  });

  describe('createTodo$', () => {
    it('debería retornar crearSuccess cuando se crea un todo exitosamente', (done) => {
      const nuevoTodo: Todo = { todoId: 3, content: 'Nueva Tarea', isCompleted: false };
      const action = TodoActions.crear({ content: 'Nueva Tarea' });

      todoService.createTodo.and.returnValue(of(nuevoTodo));
      actions$ = of(action);

      effects.createTodo$.subscribe(result => {
        expect(result).toEqual(TodoActions.crearSuccess({ todo: nuevoTodo }));
        expect(todoService.createTodo).toHaveBeenCalledWith('Nueva Tarea');
        done();
      });
    });

    it('debería retornar crearError cuando falla la creación', (done) => {
      const action = TodoActions.crear({ content: 'Nueva Tarea' });
      const error = { message: 'Error al crear' };

      todoService.createTodo.and.returnValue(throwError(() => error));
      actions$ = of(action);

      effects.createTodo$.subscribe(result => {
        expect(result).toEqual(TodoActions.crearError({ error }));
        done();
      });
    });
  });

  describe('deleteTodo$', () => {
    it('debería retornar borrarSuccess cuando se elimina un todo exitosamente', (done) => {
      const action = TodoActions.borrar({ todoId: 1 });

      todoService.deleteTodo.and.returnValue(of(undefined as any));
      actions$ = of(action);

      effects.deleteTodo$.subscribe(result => {
        expect(result).toEqual(TodoActions.borrarSuccess({ todoId: 1 }));
        expect(todoService.deleteTodo).toHaveBeenCalledWith(1);
        done();
      });
    });

    it('debería retornar borrarError cuando falla la eliminación', (done) => {
      const action = TodoActions.borrar({ todoId: 1 });
      const error = { message: 'Error al borrar' };

      todoService.deleteTodo.and.returnValue(throwError(() => error));
      actions$ = of(action);

      effects.deleteTodo$.subscribe(result => {
        expect(result).toEqual(TodoActions.borrarError({ error }));
        done();
      });
    });
  });

  describe('searchTodos$', () => {
    it('debería retornar buscarTodosSuccess cuando la búsqueda es exitosa', (done) => {
      const todosEncontrados: Todo[] = [mockTodos[0]];
      const action = TodoActions.buscarTodos({ content: 'Tarea 1' });

      todoService.searchTodos.and.returnValue(of(todosEncontrados));
      actions$ = of(action);

      effects.searchTodos$.subscribe(result => {
        expect(result).toEqual(TodoActions.buscarTodosSuccess({ todos: todosEncontrados }));
        expect(todoService.searchTodos).toHaveBeenCalledWith('Tarea 1');
        done();
      });
    });

    it('debería retornar buscarTodosError cuando la búsqueda falla', (done) => {
      const action = TodoActions.buscarTodos({ content: 'test' });
      const error = { message: 'Error en búsqueda' };

      todoService.searchTodos.and.returnValue(throwError(() => error));
      actions$ = of(action);

      effects.searchTodos$.subscribe(result => {
        expect(result).toEqual(TodoActions.buscarTodosError({ error }));
        done();
      });
    });
  });

  describe('toggleTodo$', () => {
    it('debería retornar toggleSuccess cuando se actualiza el estado', (done) => {
      const todoActualizado: Todo = { todoId: 1, content: 'Tarea 1', isCompleted: true };
      const action = TodoActions.toggle({ todoId: 1, isCompleted: true });

      todoService.updateTodo.and.returnValue(of(todoActualizado));
      actions$ = of(action);

      effects.toggleTodo$.subscribe(result => {
        expect(result).toEqual(TodoActions.toggleSuccess({ todo: todoActualizado }));
        expect(todoService.updateTodo).toHaveBeenCalledWith(1, { isCompleted: true });
        done();
      });
    });
  });

  describe('editTodo$', () => {
    it('debería retornar editarSuccess cuando se edita correctamente', (done) => {
      const todoEditado: Todo = { todoId: 1, content: 'Tarea Editada', isCompleted: false };
      const action = TodoActions.editar({ todoId: 1, content: 'Tarea Editada' });

      todoService.updateTodo.and.returnValue(of(todoEditado));
      actions$ = of(action);

      effects.editTodo$.subscribe(result => {
        expect(result).toEqual(TodoActions.editarSuccess({ todo: todoEditado }));
        expect(todoService.updateTodo).toHaveBeenCalledWith(1, { content: 'Tarea Editada' });
        done();
      });
    });
  });
});
