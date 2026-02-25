import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { TodoSearch } from './todo-search';
import { buscarTodos, cargarTodos } from '../todo.action';

describe('TodoSearch', () => {
  let component: TodoSearch;
  let fixture: ComponentFixture<TodoSearch>;
  let store: MockStore;

  const initialState = {
    todos: [],
    filtro: 'todos'
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TodoSearch],
      imports: [ReactiveFormsModule],
      providers: [provideMockStore({ initialState })]
    })
    .compileComponents();

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(TodoSearch);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería tener un FormControl para búsqueda', () => {
    expect(component.searchControl).toBeDefined();
    expect(component.searchControl.value).toBe('');
  });

  it('debería despachar buscarTodos cuando se escriben 3 o más caracteres', (done) => {
    spyOn(store, 'dispatch');
    
    component.searchControl.setValue('abc');
    
    // Esperar el debounceTime de 300ms
    setTimeout(() => {
      expect(store.dispatch).toHaveBeenCalledWith(buscarTodos({ content: 'abc' }));
      done();
    }, 350);
  });

  it('NO debería despachar buscarTodos cuando hay menos de 3 caracteres', (done) => {
    spyOn(store, 'dispatch');
    
    component.searchControl.setValue('ab');
    
    // Esperar el debounceTime
    setTimeout(() => {
      expect(store.dispatch).not.toHaveBeenCalledWith(buscarTodos({ content: 'ab' }));
      done();
    }, 350);
  });

  it('debería despachar cargarTodos cuando el campo se vacía', (done) => {
    spyOn(store, 'dispatch');
    
    // Primero escribir algo
    component.searchControl.setValue('test');
    
    setTimeout(() => {
      // Luego vaciar
      component.searchControl.setValue('');
      
      setTimeout(() => {
        expect(store.dispatch).toHaveBeenCalledWith(cargarTodos());
        done();
      }, 350);
    }, 350);
  });

  it('debería desuscribirse al destruirse', () => {
    spyOn(component['searchSubscription']!, 'unsubscribe');
    component.ngOnDestroy();
    expect(component['searchSubscription']!.unsubscribe).toHaveBeenCalled();
  });
});
