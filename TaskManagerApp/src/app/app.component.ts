import { Component } from '@angular/core';
import { tasks } from './modules/task.model';
@Component({
  selector: 'app-root',

  styleUrl: './app.component.css',
  template: `
  <app-header></app-header>
  <router-outlet></router-outlet>
`,
})
export class AppComponent {
  title = 'TaskManagerApp'
}
