import { Pipe, PipeTransform } from '@angular/core';
import { tasks } from './modules/task.model';

@Pipe({ name: 'task' })
export class TasksPipe implements PipeTransform {
  transform(values: tasks[], filter: string): tasks[] {
    if (!filter || filter.length === 0) {
      return values;
    }

    if (values.length === 0) {
      return values;
    }

    return values.filter((value: tasks) => {
      const nameFound =
        value.DESCRIPTION.toLowerCase().indexOf(filter.toLowerCase()) !== -1;


      if (nameFound) {
        return value;
      }
      else{
        return null;
      }
    });
  
  }

}