import { Component, OnInit ,ViewChild, AfterViewInit } from '@angular/core';
import { tasks } from '../../modules/task.model';
import { TasksService } from '../../services/tasks.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NavbarService } from '../../services/navbar.service';
import { ModalBoxComponent } from '../modal-box/modal-box.component';
import { MatDialog } from '@angular/material/dialog';
import { AlertService } from '../../services/displayAlert.service';
import { Router } from '@angular/router';

export interface Tasks{
  id: string,
  title: string,
  description : string,
  createdDate : Date,
  isCompleted : boolean,
  completedDate : Date,
  isUpdated:boolean,
  updatedDate : Date
  deletedDate: Date,
  tasK_ID:number
}


@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',

  
})
export class TasksComponent implements OnInit {
 
  displayedColumns: string[] = ['task_ID', 'title', 'description', 'isCompleted','delete', 'update'];
  dataSource!: MatTableDataSource<Tasks>;
  taskList: any;
  value: string = '';
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngForm !: FormGroup;
  description = new FormControl("");
  updatedTitle !:any;
  updatedDescription !:string;
  isEdited !: boolean;
  filter !: string;
  add: string = 'Add';
  edit: string = 'Edit';
  delete: string = 'Delete';
  isLoading: boolean = true;
  tasks : tasks[] = [];
  newTasks : tasks = {
  title: '',
  description : '',
  createdDate : new Date(),
  isCompleted : false,
  completedDate :  new Date(),
  isUpdated:false,
  updatedDate : new Date(),
  deletedDate: new Date(),
  userName:'',
  tasK_ID:0
}


constructor(private tasksService : TasksService,private fb : FormBuilder,public nav: NavbarService,public dialog: MatDialog,  private alertService: AlertService, private router: Router){}

ngOnInit(): void {
 
    this.getAllTasks();
}

getAllTasks() {
  const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
  this.tasksService.getAllTasks(currentUser['username']).subscribe({
    next:(data)=> this.setData(data),
    error:()=> this.openConnectionDialog()
  })   

}
setData(data:any)
{
  console.log(data);
    this.taskList = data;
    console.log(this.taskList);
    this.dataSource = new MatTableDataSource(this.taskList);
    console.log(this.dataSource);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
}
openConnectionDialog(): void {
  const options = {
    title: 'Error',
    message: `API Service Failed. Please Check !`,
    confirmText: 'OK'
  };

  this.alertService.open(options);
  this.alertService.confirmed().subscribe(confirmed => {
    if (confirmed) {    
      this.router.navigate(['']);
    }
  });
}

// Search Tasks
applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();
  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }
}

openDeleteDialog(len: number, obj: any): void {
  const options = {
    title: 'Delete?',
    message: `Are you sure want to remove ${len} rows?`,
    cancelText: 'NO',
    confirmText: 'YES'
  };

  this.alertService.open(options);
  this.alertService.confirmed().subscribe(confirmed => {
    if (confirmed) {
      this.deleteTask(obj['tasK_ID']);
    }
  });
}
deleteTask(id:number)
{
  
  this.tasksService.deleteTasks(id).subscribe({
    next:(data)=> this.getAllTasks(),
    error:()=> this.openConnectionDialog()
  })  

}
onCompletedTasks(id:number,task:tasks)
{
  const options = {
    title: 'Update?',
    message: `Are you sure want to mark the task as COMPLETED?`,
    cancelText: 'NO',
    confirmText: 'YES'
  };

  this.alertService.open(options);
  this.alertService.confirmed().subscribe(confirmed => {
    if (confirmed) {
      task.isCompleted = !task.isCompleted;
    
      this.tasksService.updateCompleteStatus(id,task).subscribe({
        next:(data)=> this.getAllTasks(),
        error:()=> this.openConnectionDialog()
      }) 
    
    }
    else{
      this.getAllTasks();
    }
  });
}

public customSort = (event: any) => {
  console.log(event);
}


openAddEditDialog(action: string, obj: any): void {
 
  obj.action = action;
  const dialogRef = this.dialog.open(ModalBoxComponent, {
    data: obj,
  });

  dialogRef.afterClosed().subscribe((result) => {
    if (result != null) {
      const action = result.data['action'];
      delete result.data['action'];
      if (action == this.add) {
        this.addRowData(result.data);
      } else if (action == this.edit) {
        this.updateRowData(result.data,obj['tasK_ID']);
      } else {
      
      }
    }
  });
}

addRowData(row_obj: any): void {
  this.addTasks(row_obj);

}
addTasks(row_obj: any)
{
  
  this.newTasks.title = row_obj['data']['title'];
  this.newTasks.description = row_obj['data']['description'];

  const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
  this.newTasks.userName = currentUser['username'];
 
  this.tasksService.addTasks(this.newTasks).subscribe({
    next:(data)=> this.getAllTasks(),
    error:()=> this.openConnectionDialog()
  }) 


}

updateRowData(row_obj: any,id:number): void {
  this.updateTask(row_obj,id);
  
}

updateTask(row_obj: any,id:number)
{

  this.newTasks.tasK_ID = id;
  this.newTasks.title = row_obj['data']['title'];
  this.newTasks.description = row_obj['data']['description'];
  const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
  this.newTasks.userName = currentUser['username'];
  this.isEdited = false;

  this.tasksService.updateTask(this.newTasks.tasK_ID,this.newTasks).subscribe({
    next:(data)=> this.getAllTasks(),
    error:()=> this.openConnectionDialog()
  }) 

}

}
