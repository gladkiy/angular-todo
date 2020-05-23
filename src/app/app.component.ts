import { Component } from '@angular/core';
import { ToDo } from './models/todo';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    todos = new Array<ToDo>();
    newTodoText: string = '';
    nextTodoId: number = 1;

    ngOnInit() {
        let todo = new ToDo();
        todo.id = 1;
        todo.text = this.newTodoText;
        todo.done = false;
        this.todos.push(todo);
    }

    add(id, event) {
        if (event.target.value !== '') {
            let todo = this.todos.find(x => x.id === id);
            todo.text = event.target.value;
            let emptyTodos = this.todos.filter(x => x.text === '');
            if (emptyTodos.length === 0) {
                this.todos.push({ id: ++this.nextTodoId, text: this.newTodoText, done: false });
            }
        }
    }

    remove(start: number) {
        this.todos.splice(start, 1);
    }

    move(index: number, direction: string) {
        if (direction === 'up') {
            if (index === 0) {
                return;
            }
            index--;
        }

        if (direction === 'down') {
            if(index === this.todos.length - 1) {
                return;
            }
        }

        let todo = this.todos[index];
        this.todos.splice(index + 2, 0, todo);
        this.todos.splice(index, 1);
    }
}
