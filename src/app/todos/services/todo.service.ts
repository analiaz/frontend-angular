import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../enviroments/environment';
import { Todo } from '../models/todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private apiUrl = `${environment.backendUrl}/todo`;

  constructor(private http: HttpClient) {}

  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.apiUrl);
  }

  searchTodos(content: string): Observable<Todo[]> {
    return this.http.get<Todo[]>(`${this.apiUrl}?content=${encodeURIComponent(content)}`);
  }

  createTodo(content: string): Observable<Todo> {
    return this.http.post<Todo>(this.apiUrl, { content });
  }

  updateTodo(todoId: number, updates: Partial<Todo>): Observable<Todo> {
    return this.http.patch<Todo>(`${this.apiUrl}/${todoId}`, updates);
  }

  deleteTodo(todoId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${todoId}`);
  }
}