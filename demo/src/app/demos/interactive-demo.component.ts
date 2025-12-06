import { Component } from '@angular/core';
import { NgxApexGanttComponent } from 'ngx-apexgantt';
import { GanttUserOptions, ViewMode } from 'apexgantt';

@Component({
  selector: 'app-interactive-demo',
  standalone: true,
  imports: [NgxApexGanttComponent],
  templateUrl: './interactive-demo.component.html',
  styleUrl: './interactive-demo.component.css',
})
export class InteractiveDemoComponent {
  ganttOptions: GanttUserOptions = {
    series: [
      {
        id: 'task-1',
        name: 'Research Phase',
        startTime: '02-01-2024',
        endTime: '02-10-2024',
        progress: 80,
      },
      {
        id: 'task-2',
        name: 'Market Analysis',
        startTime: '02-11-2024',
        endTime: '02-20-2024',
        progress: 60,
        dependency: 'task-1',
      },
      {
        id: 'task-3',
        name: 'Product Development',
        startTime: '02-21-2024',
        endTime: '03-15-2024',
        progress: 30,
        dependency: 'task-2',
      },
      {
        id: 'task-4',
        name: 'Prototype Creation',
        startTime: '02-21-2024',
        endTime: '03-05-2024',
        progress: 50,
        dependency: 'task-2',
      },
      {
        id: 'task-5',
        name: 'Testing & QA',
        startTime: '03-06-2024',
        endTime: '03-15-2024',
        progress: 20,
        dependency: 'task-4',
      },
      {
        id: 'task-6',
        name: 'Launch Preparation',
        startTime: '03-16-2024',
        endTime: '03-25-2024',
        progress: 0,
        dependency: 'task-3',
      },
    ],
    height: '450px',
    viewMode: ViewMode.Week,
    
    // interactivity options
    enableTaskDrag: true,
    enableTaskResize: true,
    
    // styling options
    barBackgroundColor: '#4A90E2',
    barBorderRadius: '4px',
    rowHeight: 40,
    rowBackgroundColors: ['#f9f9f9', '#ffffff'], // alternate row colors
  };
}
