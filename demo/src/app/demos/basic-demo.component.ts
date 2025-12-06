import { Component } from '@angular/core';
import { NgxApexGanttComponent } from 'ngx-apexgantt';
import { TaskInput, ViewMode } from 'apexgantt';

@Component({
  selector: 'app-basic-demo',
  standalone: true,
  imports: [NgxApexGanttComponent],
  templateUrl: './basic-demo.component.html',
  styleUrl: './basic-demo.component.css',
})
export class BasicDemoComponent {
  viewMode: ViewMode = ViewMode.Week;
  
  tasks: TaskInput[] = [
    {
      id: 'task-1',
      name: 'Project Planning',
      startTime: '01-01-2024',
      endTime: '01-10-2024',
      progress: 100,
    },
    {
      id: 'task-2',
      name: 'Requirements Gathering',
      startTime: '01-11-2024',
      endTime: '01-20-2024',
      progress: 100,
      dependency: 'task-1', // depends on project planning
    },
    {
      id: 'task-3',
      name: 'Design Phase',
      startTime: '01-21-2024',
      endTime: '02-05-2024',
      progress: 75,
      dependency: 'task-2', // depends on requirements
    },
    {
      id: 'task-4',
      name: 'UI Design',
      startTime: '01-21-2024',
      endTime: '01-28-2024',
      progress: 100,
      dependency: 'task-2', // subtask of design phase
    },
    {
      id: 'task-5',
      name: 'Database Design',
      startTime: '01-29-2024',
      endTime: '02-05-2024',
      progress: 50,
      dependency: 'task-4', // depends on UI design
    },
    {
      id: 'task-6',
      name: 'Development',
      startTime: '02-06-2024',
      endTime: '03-10-2024',
      progress: 40,
      dependency: 'task-3', // depends on design phase
    },
    {
      id: 'task-7',
      name: 'Testing',
      startTime: '03-11-2024',
      endTime: '03-25-2024',
      progress: 0,
      dependency: 'task-6', // depends on development
    },
    {
      id: 'task-8',
      name: 'Deployment',
      startTime: '03-26-2024',
      endTime: '03-31-2024',
      progress: 0,
      dependency: 'task-7', // depends on testing
    },
  ];
}
