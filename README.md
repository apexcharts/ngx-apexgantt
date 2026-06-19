# Angular Gantt Chart Component — ngx-apexgantt

An Angular Gantt chart component for interactive project timelines. Render tasks, dependencies, milestones, critical path, baselines, and annotations as a fully drag-and-drop schedule — with typed Inputs, EventEmitter Outputs, `@ViewChild` access, and first-class support for both standalone and module-based Angular applications.

📚 **Documentation:** [apexcharts.com/apexgantt/docs](https://apexcharts.com/apexgantt/docs/) · 🎬 **Live demos:** [apexcharts.com/apexgantt/demos](https://apexcharts.com/apexgantt/demos/) · 📦 **npm:** [ngx-apexgantt](https://www.npmjs.com/package/ngx-apexgantt) · 📖 **Guide:** [Angular Gantt Chart](https://apexcharts.com/angular-gantt-chart/) · 🌐 **Hub:** [ApexGantt](https://apexcharts.com/apexgantt/)

## Installation

```bash
npm install ngx-apexgantt apexgantt
# or
yarn add ngx-apexgantt apexgantt
```

Requires Angular 18+.

## License Setup

If you have a commercial license, set it once at app initialization before rendering any charts. Call `setApexGanttLicense` before bootstrapping your application.

> **Note:** an Angular `provideApexGanttLicense` provider is **not exported** from the public API in v1.1.0 — use the `setApexGanttLicense` static call shown below.

**Standalone App:**

```ts
// main.ts
import { bootstrapApplication } from "@angular/platform-browser";
import { setApexGanttLicense } from "ngx-apexgantt";
import { AppComponent } from "./app/app.component";
import { appConfig } from "./app/app.config";

// set license before bootstrapping
setApexGanttLicense("your-license-key-here");

bootstrapApplication(AppComponent, appConfig);
```

**Module-based App:**

```ts
// main.ts
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { setApexGanttLicense } from "ngx-apexgantt";
import { AppModule } from "./app/app.module";

// set license before bootstrapping
setApexGanttLicense("your-license-key-here");

platformBrowserDynamic().bootstrapModule(AppModule);
```

## Quick Start

### Standalone Component

```typescript
import { Component } from "@angular/core";
import { NgxApexGanttComponent, TaskInput } from "ngx-apexgantt";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [NgxApexGanttComponent],
  template: `
    <ngx-apexgantt
      [tasks]="tasks"
      [viewMode]="'week'"
      [height]="'500px'"
      (taskUpdateSuccess)="onTaskUpdate($event)"
    >
    </ngx-apexgantt>
  `,
})
export class AppComponent {
  tasks: TaskInput[] = [
    {
      id: "task-1",
      name: "Project Planning",
      startTime: "01-01-2024",
      endTime: "01-08-2024",
      progress: 75,
    },
    {
      id: "task-2",
      name: "Development",
      startTime: "01-09-2024",
      endTime: "01-20-2024",
      progress: 40,
      dependency: "task-1",
    },
  ];

  onTaskUpdate(event: any) {
    console.log("Task updated:", event);
  }
}
```

### Module-based Component

```typescript
import { Component } from "@angular/core";
import { TaskInput } from "ngx-apexgantt";

@Component({
  selector: "app-gantt",
  template: `
    <ngx-apexgantt [tasks]="tasks" [viewMode]="'week'" [height]="'500px'">
    </ngx-apexgantt>
  `,
})
export class GanttComponent {
  tasks: TaskInput[] = [
    // your tasks...
  ];
}
```

```typescript
// app.module.ts
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { NgxApexGanttModule } from "ngx-apexgantt";
import { GanttComponent } from "./gantt.component";

@NgModule({
  declarations: [GanttComponent],
  imports: [BrowserModule, NgxApexGanttModule],
})
export class AppModule {}
```

## Component API

### Inputs

#### Primary Configuration

| Input     | Type           | Description                             |
| --------- | -------------- | --------------------------------------- |
| `options` | `GanttOptions` | Complete ApexGantt configuration object |

#### Shortcut Inputs (Optional - Override options)

| Input      | Type                | Description                                          |
| ---------- | ------------------- | ---------------------------------------------------- |
| `tasks`    | `TaskInput[]`       | Array of tasks (shortcut for `options.series`)       |
| `viewMode` | `string`            | View mode: 'day', 'week', 'month', 'quarter', 'year' |
| `theme`    | `'light' \| 'dark'` | Color theme                                          |
| `width`    | `string \| number`  | Chart width                                          |
| `height`   | `string \| number`  | Chart height                                         |

#### Styling Inputs

| Input       | Type                  | Description    |
| ----------- | --------------------- | -------------- |
| `className` | `string`              | CSS class name |
| `styles`    | `Record<string, any>` | Inline styles  |

### Outputs (Events)

| Output              | Type           | Description                        |
| ------------------- | -------------- | ---------------------------------- |
| `taskUpdateSuccess` | `EventEmitter` | Fired after successful task update |
| `taskDragged`       | `EventEmitter` | Fired when a task is dragged       |
| `taskResized`       | `EventEmitter` | Fired when a task is resized       |

### Public Methods

Access these methods using `@ViewChild`:

```typescript
import { Component, ViewChild } from "@angular/core";
import { NgxApexGanttComponent } from "ngx-apexgantt";

@Component({
  template: `<ngx-apexgantt #ganttChart></ngx-apexgantt>`,
})
export class MyComponent {
  @ViewChild("ganttChart") ganttChart!: NgxApexGanttComponent;

  zoomIn() {
    this.ganttChart.zoomIn();
  }

  zoomOut() {
    this.ganttChart.zoomOut();
  }

  updateTask() {
    this.ganttChart.updateTask("task-1", { progress: 80 });
  }

  updateAll() {
    this.ganttChart.update({ viewMode: "month" });
  }
}
```

| Method       | Parameters                                     | Description                       |
| ------------ | ---------------------------------------------- | --------------------------------- |
| `update`     | `options: GanttOptions`                        | Update entire gantt configuration |
| `updateTask` | `taskId: string, taskData: Partial<TaskInput>` | Update a specific task            |
| `zoomIn`     | none                                           | Zoom in the gantt chart           |
| `zoomOut`    | none                                           | Zoom out the gantt chart          |
| `destroy`    | none                                           | Destroy the gantt instance        |

## Usage Examples

### Basic Example with Zoom Controls

```typescript
import { Component, ViewChild } from "@angular/core";
import { NgxApexGanttComponent, TaskInput } from "ngx-apexgantt";

@Component({
  selector: "app-gantt-basic",
  standalone: true,
  imports: [NgxApexGanttComponent],
  template: `
    <div class="controls">
      <button (click)="ganttChart.zoomIn()">Zoom In</button>
      <button (click)="ganttChart.zoomOut()">Zoom Out</button>
    </div>
    <ngx-apexgantt
      #ganttChart
      [tasks]="tasks"
      [viewMode]="'week'"
      [height]="'500px'"
    >
    </ngx-apexgantt>
  `,
})
export class GanttBasicComponent {
  @ViewChild("ganttChart") ganttChart!: NgxApexGanttComponent;

  tasks: TaskInput[] = [
    {
      id: "task-1",
      name: "Planning",
      startTime: "01-01-2024",
      endTime: "01-10-2024",
      progress: 100,
    },
    {
      id: "task-2",
      name: "Development",
      startTime: "01-11-2024",
      endTime: "01-25-2024",
      progress: 60,
      dependency: "task-1",
    },
  ];
}
```

### Advanced Example with Full Options

```typescript
import { Component } from "@angular/core";
import { NgxApexGanttComponent, GanttOptions, ViewMode } from "ngx-apexgantt";

@Component({
  selector: "app-gantt-advanced",
  standalone: true,
  imports: [NgxApexGanttComponent],
  template: `
    <div class="controls">
      <select [(ngModel)]="currentViewMode" (change)="updateViewMode()">
        <option value="day">Day</option>
        <option value="week">Week</option>
        <option value="month">Month</option>
      </select>
      <button (click)="toggleTheme()">Toggle Theme</button>
    </div>
    <ngx-apexgantt
      [options]="ganttOptions"
      [viewMode]="currentViewMode"
      [theme]="currentTheme"
      (taskUpdateSuccess)="onTaskUpdate($event)"
      (taskDragged)="onTaskDragged($event)"
    >
    </ngx-apexgantt>
  `,
})
export class GanttAdvancedComponent {
  currentViewMode: string = "week";
  currentTheme: "light" | "dark" = "light";

  ganttOptions: GanttOptions = {
    series: [
      {
        id: "task-1",
        name: "Design Phase",
        startTime: "01-01-2024",
        endTime: "01-15-2024",
        progress: 75,
      },
      // more tasks...
    ],
    height: "600px",
    enableToolbar: true,
    enableTaskDrag: true,
    enableTaskResize: true,
    barBackgroundColor: "#537CFA",
    rowHeight: 32,
  };

  updateViewMode() {
    console.log("View mode changed to:", this.currentViewMode);
  }

  toggleTheme() {
    this.currentTheme = this.currentTheme === "light" ? "dark" : "light";
  }

  onTaskUpdate(event: any) {
    console.log("Task updated:", event);
    // save to backend
  }

  onTaskDragged(event: any) {
    console.log("Task dragged:", event);
  }
}
```

### Data Parsing Example

```typescript
import { Component } from "@angular/core";
import { NgxApexGanttComponent, GanttOptions } from "ngx-apexgantt";

@Component({
  selector: "app-gantt-parsing",
  standalone: true,
  imports: [NgxApexGanttComponent],
  template: `<ngx-apexgantt [options]="ganttOptions"></ngx-apexgantt>`,
})
export class GanttParsingComponent {
  // external data format from API
  apiData = [
    {
      task_id: "T1",
      task_name: "Design Phase",
      start_date: "01-01-2024",
      end_date: "01-15-2024",
      completion: 75,
    },
    {
      task_id: "T2",
      task_name: "Development",
      start_date: "01-16-2024",
      end_date: "01-30-2024",
      completion: 40,
    },
  ];

  ganttOptions: GanttOptions = {
    series: this.apiData,
    parsing: {
      id: "task_id",
      name: "task_name",
      startTime: "start_date",
      endTime: "end_date",
      progress: "completion",
    },
    height: "500px",
  };
}
```

### Event Handling Example

```typescript
import { Component } from "@angular/core";
import { NgxApexGanttComponent } from "ngx-apexgantt";

@Component({
  selector: "app-gantt-events",
  standalone: true,
  imports: [NgxApexGanttComponent],
  template: `
    <ngx-apexgantt
      [tasks]="tasks"
      (taskUpdateSuccess)="handleTaskUpdate($event)"
      (taskDragged)="handleTaskDragged($event)"
      (taskResized)="handleTaskResized($event)"
    >
    </ngx-apexgantt>
    <div class="event-log">
      <h3>Event Log:</h3>
      <pre>{{ eventLog }}</pre>
    </div>
  `,
})
export class GanttEventsComponent {
  tasks = [
    // your tasks...
  ];

  eventLog = "";

  handleTaskUpdate(event: any) {
    this.eventLog += `Task Updated: ${event.taskId}\n`;
    // sync with backend
    this.syncWithBackend(event.updatedTask);
  }

  handleTaskDragged(event: any) {
    this.eventLog += `Task Dragged: ${event.taskId} moved ${event.daysMoved} days\n`;
  }

  handleTaskResized(event: any) {
    this.eventLog += `Task Resized: ${event.taskId} duration changed by ${event.durationChange}\n`;
  }

  async syncWithBackend(task: any) {
    // your API call here
  }
}
```

## Column Configuration

Customize task table column widths:

```typescript
import { ColumnKey } from "ngx-apexgantt";

ganttOptions: GanttOptions = {
  series: tasks,
  columnConfig: [
    {
      key: ColumnKey.Name,
      title: "Task Name",
      minWidth: "100px",
      flexGrow: 3,
    },
    {
      key: ColumnKey.StartTime,
      title: "Start",
      minWidth: "100px",
      flexGrow: 1.5,
    },
    {
      key: ColumnKey.Duration,
      title: "Duration",
      minWidth: "80px",
      flexGrow: 1,
    },
  ],
};
```

## Annotations

Add visual annotations to highlight specific dates or date ranges:

```typescript
ganttOptions: GanttOptions = {
  series: tasks,
  annotations: [
    {
      x1: "10-25-2024",
      x2: "END_DATE",
      label: {
        text: "Sprint 1",
        fontColor: "#333333",
      },
    },
  ],
};
```

## TypeScript Support

The library is fully typed. Import types as needed:

```typescript
import {
  NgxApexGanttComponent,
  GanttOptions,
  TaskInput,
  ViewMode,
  ColumnKey,
  TaskUpdateDetail,
  TaskDraggedDetail,
} from "ngx-apexgantt";
```

## Framework wrappers

`ngx-apexgantt` wraps the [`apexgantt`](https://www.npmjs.com/package/apexgantt) core engine. Using a different framework? All wrappers share the same engine and task data model:

- **JavaScript** — [`apexgantt`](https://www.npmjs.com/package/apexgantt) ([GitHub](https://github.com/apexcharts/apexgantt))
- **React** — [`react-apexgantt`](https://www.npmjs.com/package/react-apexgantt) ([GitHub](https://github.com/apexcharts/react-apexgantt))
- **Vue** — [`vue-apexgantt`](https://www.npmjs.com/package/vue-apexgantt) ([GitHub](https://github.com/apexcharts/vue-apexgantt))

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

See [LICENSE](LICENSE) for details. Commercial licenses available at [apexcharts.com/pricing](https://apexcharts.com/pricing/).

## About

`ngx-apexgantt` is the Angular wrapper for [ApexGantt](https://apexcharts.com/apexgantt/) — part of the [ApexCharts](https://apexcharts.com/) family. One Gantt chart component for JavaScript, React, Angular, and Vue applications, with a consistent API across every framework wrapper.
