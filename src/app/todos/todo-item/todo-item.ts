import { Component, OnInit, OnChanges, SimpleChanges, Input, ElementRef, ViewChild } from '@angular/core';
import { Todo } from '../models/todo.model';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import * as action  from '../todo.action';

@Component({
  selector: 'app-todo-item',
  standalone: false,
  templateUrl: './todo-item.html',
})
export class TodoItem implements OnInit, OnChanges {

  @Input()
  todo!: Todo;

  @ViewChild('inputFisico') txtInputFisico: ElementRef;

  chkCompletado: FormControl;
  txtInput: FormControl;

  editando: boolean = false;

  constructor( private store: Store<AppState>) {
    this.chkCompletado = new FormControl(false);
    this.txtInput = new FormControl('', Validators.required);
    this.todo = new Todo('');
    this.txtInputFisico = new ElementRef(null);
  }

  ngOnInit(): void {

    //this.todo.completado = true

    this.chkCompletado.setValue(this.todo.isCompleted);
    this.txtInput.setValue(this.todo.content);

    this.chkCompletado.valueChanges.subscribe( valor => {
      this.store.dispatch( action.toggle( {
        todoId: this.todo.todoId,
        isCompleted: valor
      }));
    } );
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['todo']?.currentValue) {
      // Evita disparar toggle al sincronizar cambios externos (ej: toggle-all).
      this.chkCompletado.setValue(this.todo.isCompleted, { emitEvent: false });
      this.txtInput.setValue(this.todo.content, { emitEvent: false });
    }
  }

  editar() {
    this.editando = true;
    this.txtInput.setValue( this.todo.content );

    setTimeout(() => {
      this.txtInputFisico.nativeElement.select();
    }, 1);
  }

  terminarEdicion(){
    this.editando = false;

    if( this.txtInput.invalid ) {
      return;
    }
    if(this.txtInput.value === this.todo.content) {
      return;
    }

    this.store.dispatch(
      action.editar({
         todoId: this.todo.todoId,
         content: this.txtInput.value } ) );
  }

  borrar(){
    this.store.dispatch( action.borrar({ todoId: this.todo.todoId }) )
  }

}
