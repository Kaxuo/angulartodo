import { Component, OnInit, Input,EventEmitter,Output } from '@angular/core';
// you need eventemiiter and ouput to pass it upward
import {Todo} from '../../models/Todo'
import {TodoService} from '../../services/todo.service'

// we need input because we are passing it as a property in TodosComponent.html

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {

  // Input => taking in something
  // output => Emitting something outside, to the parent compoenent
  @Input() todo:Todo;
  @Output() deleteTodo: EventEmitter<Todo> = new EventEmitter();

  constructor(private testService:TodoService) { }

  ngOnInit() {
  }

  // Set Dynamic Classes
  setClasses(){
    let classes = {
      // todo classes always added , gotta match what's in the CSS , you need to add "" if there is a - inside the css selector
      todos: true,
      // this.todo below comes from the prop above , pass todo
      "is-complete": this.todo.completed
    }
    return classes
  }
  
  onToggle(todo: Todo){
    // Toggle in UI
    todo.completed = !todo.completed
    // Toggle on server
    this.testService.toggleCompleted(todo).subscribe(promise => {
      console.log(promise)
    }).unsubscribe()
  }

  onDelete(todo: Todo){
    // everytime we click the button, it goes upward, to the todo.component.html, (deleteTodo) 
    this.deleteTodo.emit(todo)
  }

}
