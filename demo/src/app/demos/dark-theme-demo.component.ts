import { Component } from '@angular/core';
import { NgxApexGanttComponent } from 'ngx-apexgantt';
import { TaskInput, ViewMode } from 'apexgantt';

@Component({
  selector: 'app-dark-theme-demo',
  standalone: true,
  imports: [NgxApexGanttComponent],
  templateUrl: './dark-theme-demo.component.html',
  styleUrl: './dark-theme-demo.component.css',
})
export class DarkThemeDemoComponent {
  viewMode: ViewMode = ViewMode.Week;
  theme: 'dark' | 'light' = 'dark';
  
  tasks: TaskInput[] = [
    {
      id: 'task-1',
      name: 'Infrastructure Setup',
      startTime: '04-01-2024',
      endTime: '04-10-2024',
      progress: 90,
    },
    {
      id: 'task-2',
      name: 'Server Configuration',
      startTime: '04-11-2024',
      endTime: '04-18-2024',
      progress: 75,
      dependency: 'task-1',
    },
    {
      id: 'task-3',
      name: 'Security Audit',
      startTime: '04-19-2024',
      endTime: '04-28-2024',
      progress: 50,
      dependency: 'task-2',
    },
    {
      id: 'task-4',
      name: 'Load Testing',
      startTime: '04-19-2024',
      endTime: '04-25-2024',
      progress: 60,
      dependency: 'task-2',
    },
    {
      id: 'task-5',
      name: 'Performance Optimization',
      startTime: '04-26-2024',
      endTime: '05-05-2024',
      progress: 30,
      dependency: 'task-4',
    },
    {
      id: 'task-6',
      name: 'Final Review',
      startTime: '05-06-2024',
      endTime: '05-15-2024',
      progress: 0,
      dependency: 'task-3',
    },
  ];
}
