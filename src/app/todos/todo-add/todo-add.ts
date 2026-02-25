import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AppState } from '../../app.reducer';
import { Store } from '@ngrx/store';
import * as actions from '../todo.action';

@Component({
  selector: 'app-todo-add',
  standalone: false,
  templateUrl: './todo-add.html'
})
export class TodoAdd implements OnInit {

  txtInput: FormControl;

  constructor( private store: Store<AppState>) {
    this.txtInput = new FormControl('', Validators.required);
   }

  ngOnInit(): void {
  }

  agregar() {
    if ( this.txtInput.invalid ) { return; }

    this.store.dispatch( actions.crear({content: this.txtInput.value}) )

    this.txtInput.reset();

  }

}
