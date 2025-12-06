import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxApexGanttComponent } from 'ngx-apexgantt';
import { 
  TaskInput,
  ViewMode,
  TaskUpdateSuccessEventDetail,
  TaskDraggedEventDetail,
  TaskResizedEventDetail 
} from 'apexgantt';

@Component({
  selector: 'app-events-demo',
  standalone: true,
  imports: [NgxApexGanttComponent, CommonModule],
  templateUrl: './events-demo.component.html',
  styleUrl: './events-demo.component.css',
})
export class EventsDemoComponent {
  viewMode: ViewMode = ViewMode.Week;
  
  tasks: TaskInput[] = [
    {
      id: 'task-1',
      name: 'Backend API Development',
      startTime: '03-01-2024',
      endTime: '03-15-2024',
      progress: 70,
    },
    {
      id: 'task-2',
      name: 'Database Schema Design',
      startTime: '03-16-2024',
      endTime: '03-25-2024',
      progress: 45,
      dependency: 'task-1',
    },
    {
      id: 'task-3',
      name: 'Frontend Integration',
      startTime: '03-26-2024',
      endTime: '04-10-2024',
      progress: 20,
      dependency: 'task-2',
    },
    {
      id: 'task-4',
      name: 'API Testing',
      startTime: '04-11-2024',
      endTime: '04-20-2024',
      progress: 0,
      dependency: 'task-3',
    },
  ];

  eventLog: string[] = [];

  onTaskUpdateSuccess(event: TaskUpdateSuccessEventDetail): void {
    const message = `Task "${event.updatedTask.name}" updated - Progress: ${event.updatedTask.progress}%`;
    this.addEventLog(message, 'update');
  }

  onTaskDragged(event: TaskDraggedEventDetail): void {
    const message = `Task ID "${event.taskId}" dragged - Moved ${event.daysMoved} days`;
    this.addEventLog(message, 'drag');
  }

  onTaskResized(event: TaskResizedEventDetail): void {
    const direction = event.durationChange > 0 ? 'extended' : 'shortened';
    const message = `Task ID "${event.taskId}" resized - Duration ${direction} by ${Math.abs(event.durationChange)} days`;
    this.addEventLog(message, 'resize');
  }

  private addEventLog(message: string, type: string): void {
    const timestamp = new Date().toLocaleTimeString();
    this.eventLog.unshift(`[${timestamp}] [${type.toUpperCase()}] ${message}`);
    
    // keep only last 10 events
    if (this.eventLog.length > 10) {
      this.eventLog = this.eventLog.slice(0, 10);
    }
  }

  clearLog(): void {
    this.eventLog = [];
  }
}
