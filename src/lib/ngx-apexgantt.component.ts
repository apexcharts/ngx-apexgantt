import {
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
  NgZone,
  ChangeDetectorRef,
  Output,
  EventEmitter,
  inject,
} from "@angular/core";

import ApexGantt, {
  TaskInput,
  GanttUserOptions,
  ViewMode,
  ThemeMode,
  GanttEvents,
  TaskUpdateSuccessEventDetail,
  TaskDraggedEventDetail,
  TaskResizedEventDetail,
} from "apexgantt";

import { APEXGANTT_LICENSE_KEY } from "./ngx-apexgantt.license";

@Component({
  selector: "ngx-apexgantt",
  standalone: true,
  template: "<div #ganttContainer></div>",
  styles: [":host { display: block; width: 100%; height: 100%; }"],
})
export class NgxApexGanttComponent implements OnInit, OnDestroy {
  @ViewChild("ganttContainer", { static: true }) ganttContainer!: ElementRef;

  // inputs
  @Input() tasks: TaskInput[] = [];
  @Input() options?: GanttUserOptions;
  @Input() width?: string | number;
  @Input() height?: string | number;
  @Input() viewMode?: ViewMode;
  @Input() theme?: ThemeMode;
  @Input() className?: string;

  // outputs
  @Output() taskUpdateSuccess =
    new EventEmitter<TaskUpdateSuccessEventDetail>();
  @Output() taskDragged = new EventEmitter<TaskDraggedEventDetail>();
  @Output() taskResized = new EventEmitter<TaskResizedEventDetail>();

  // dependency injection
  private ngZone = inject(NgZone);
  private cdr = inject(ChangeDetectorRef);
  private licenseKey = inject(APEXGANTT_LICENSE_KEY, { optional: true });

  private ganttInstance: ApexGantt | null = null;

  ngOnInit(): void {
    this.initializeGantt();
    this.setupEventListeners();
  }

  ngOnDestroy(): void {
    this.removeEventListeners();
    this.destroyGantt();
  }

  private initializeGantt(): void {
    this.ngZone.runOutsideAngular(() => {
      const ganttOptions: GanttUserOptions = {
        ...this.options,
        series: this.tasks,
        width: this.width,
        height: this.height,
        viewMode: this.viewMode,
        theme: this.theme,
      };

      this.ganttInstance = new ApexGantt(
        this.ganttContainer.nativeElement,
        ganttOptions
      );

      this.ganttInstance.render();
    });
  }

  private setupEventListeners(): void {
    const container = this.ganttContainer.nativeElement;

    // task update success event
    container.addEventListener(
      GanttEvents.TASK_UPDATE_SUCCESS,
      this.handleTaskUpdateSuccess
    );

    // task dragged event
    container.addEventListener(
      GanttEvents.TASK_DRAGGED,
      this.handleTaskDragged
    );

    // task resized event
    container.addEventListener(
      GanttEvents.TASK_RESIZED,
      this.handleTaskResized
    );
  }

  private removeEventListeners(): void {
    const container = this.ganttContainer.nativeElement;

    container.removeEventListener(
      GanttEvents.TASK_UPDATE_SUCCESS,
      this.handleTaskUpdateSuccess
    );
    container.removeEventListener(
      GanttEvents.TASK_DRAGGED,
      this.handleTaskDragged
    );
    container.removeEventListener(
      GanttEvents.TASK_RESIZED,
      this.handleTaskResized
    );
  }

  private handleTaskUpdateSuccess = (event: Event): void => {
    this.ngZone.run(() => {
      const customEvent = event as CustomEvent<TaskUpdateSuccessEventDetail>;
      this.taskUpdateSuccess.emit(customEvent.detail);
      this.cdr.markForCheck();
    });
  };

  private handleTaskDragged = (event: Event): void => {
    this.ngZone.run(() => {
      const customEvent = event as CustomEvent<TaskDraggedEventDetail>;
      this.taskDragged.emit(customEvent.detail);
      this.cdr.markForCheck();
    });
  };

  private handleTaskResized = (event: Event): void => {
    this.ngZone.run(() => {
      const customEvent = event as CustomEvent<TaskResizedEventDetail>;
      this.taskResized.emit(customEvent.detail);
      this.cdr.markForCheck();
    });
  };

  // public methods
  public update(options: GanttUserOptions): void {
    if (this.ganttInstance) {
      this.ganttInstance.update(options);
    }
  }

  public updateTask(taskId: string, taskData: Partial<TaskInput>): void {
    if (this.ganttInstance) {
      this.ganttInstance.updateTask(taskId, taskData as any);
    }
  }

  public zoomIn(): void {
    if (this.ganttInstance) {
      this.ganttInstance.zoomIn();
    }
  }

  public zoomOut(): void {
    if (this.ganttInstance) {
      this.ganttInstance.zoomOut();
    }
  }

  public destroy(): void {
    this.destroyGantt();
  }

  private destroyGantt(): void {
    if (this.ganttInstance) {
      this.ganttInstance.destroy();
      this.ganttInstance = null;
    }
  }
}
