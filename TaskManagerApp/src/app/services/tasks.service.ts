import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tasks } from '../modules/task.model';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
baseApiUrl:string = "https://localhost:44376";
  constructor(private http: HttpClient) { }

  getAllTasks(userName:string): Observable<tasks[]>{
    return this.http.get<tasks[]>(this.baseApiUrl+'/api/TasksAPI?userName='+userName)
  }
  addTasks(newTasks: tasks): Observable<tasks[]>{
    return this.http.post<tasks[]>(this.baseApiUrl+'/api/TasksAPI',newTasks)
  }
  
  updateCompleteStatus(id:number,task:tasks): Observable<tasks[]>{
    return this.http.put<tasks[]>(this.baseApiUrl+'/api/TasksAPI/'+id,task)
  }
  deleteTasks(id:number): Observable<tasks[]>{
    return this.http.delete<tasks[]>(this.baseApiUrl+'/api/TasksAPI/'+id,)
  }
  updateTask(id:number,newTasks: tasks): Observable<tasks[]>{
    return this.http.put<tasks[]>(this.baseApiUrl+'/api/TasksAPI/'+id+'/UpdateData',newTasks)
  }

}
