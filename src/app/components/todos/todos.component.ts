import { Component, OnInit } from '@angular/core';
import {TodoService} from '../../services/todo.service'
import {Todo} from '../../models/Todo'

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {
  todos:Todo[];

  // initiliaze your services in constructor, todoService could be named anything you want and bind it to the service
  constructor(private testService:TodoService) { }

  ngOnInit() {
    // Async now , subscribe = .then
     this.testService.getTodos().subscribe(promise => {
      this.todos = promise;
      console.log(promise)
    })
  }
  

  deleteTodo(todo:Todo){
    // UI / Front end Only , you can put it in subscribe but it will be slower since it will wait for the response of the server while this way will delete from UI right away
    this.todos = this.todos.filter(item => item.title !== todo.title)
    // Server
    this.testService.deleteTodo(todo).subscribe()
  }

  addTodo(todo:Todo){
    this.testService.addTodo(todo).subscribe(promise => {
      this.todos.push(promise)
    })
  }
}
