import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit{
  name:string = "";
  isCompleted: boolean = false;
  error:string = "";
  sayac=3;

  tasks: TaskComponent[]=[];
  newTask:string = "";

  ngOnInit(): void {
    const localTasks = localStorage.getItem("tasks");
    if (localTasks) {
      this.tasks = JSON.parse(localTasks);
    }
  }

  saveTask(){
    if (this.newTask) {
      let task = new TaskComponent();
      task.name = this.newTask;
      task.isCompleted = false;
      this.tasks.push(task);
      this.newTask = '';

      localStorage.setItem("tasks",JSON.stringify(this.tasks))
    }

    else{
      this.error = "Lütfen bir görev giriniz!";

      const intervalId = setInterval(() => {
        console.log(this.sayac);
        this.sayac--;

        if (this.sayac === 0) {
          this.error = "";
          clearInterval(intervalId);
          this.sayac=3
        }
      }, 1000);
    }
    
  }

  doneTask(id:number){
    this.tasks[id].isCompleted = !this.tasks[id].isCompleted;
    localStorage.setItem("tasks",JSON.stringify(this.tasks));
  }

  deleteTask(id:number){
    this.tasks = this.tasks.filter((v,I)=> I !== id);
    localStorage.setItem("tasks",JSON.stringify(this.tasks));
  }
}


