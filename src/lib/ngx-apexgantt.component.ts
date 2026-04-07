import {
  Component,
  ElementRef,
  Input,
  OnDestroy,
  AfterViewInit,
  ViewChild,
  NgZone,
  ChangeDetectorRef,
  Output,
  EventEmitter,
} from "@angular/core";

import { ApexGantt, GanttEvents } from "apexgantt";

import type {
  TaskInput,
  GanttUserOptions,
  ViewMode,
  ThemeMode,
  TaskUpdateEventDetail,
  TaskUpdateSuccessEventDetail,
  TaskUpdateErrorEventDetail,
  TaskDraggedEventDetail,
  TaskResizedEventDetail,
  SelectionChangeEventDetail,
  DependencyArrowUpdateDetail,
} from "apexgantt";

import { getApexGanttLicense } from "./ngx-apexgantt.license";

@Component({
  selector: "ngx-apexgantt",
  standalone: true,
  template: "<div #ganttContainer class='ngx-apexgantt-container'></div>",
  styles: [
    `
      :host {
        display: block;
        width: 100%;
        height: 100%;
      }
      .ngx-apexgantt-container {
        width: 100%;
        height: 100%;
      }
    `,
  ],
})
export class NgxApexGanttComponent implements AfterViewInit, OnDestroy {
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
  @Output() taskUpdate = new EventEmitter<TaskUpdateEventDetail>();
  @Output() taskUpdateSuccess =
    new EventEmitter<TaskUpdateSuccessEventDetail>();
  @Output() taskUpdateError = new EventEmitter<TaskUpdateErrorEventDetail>();
  @Output() taskDragged = new EventEmitter<TaskDraggedEventDetail>();
  @Output() taskResized = new EventEmitter<TaskResizedEventDetail>();
  @Output() selectionChange = new EventEmitter<SelectionChangeEventDetail>();
  @Output() dependencyArrowUpdate =
    new EventEmitter<DependencyArrowUpdateDetail>();

  private ganttInstance: ApexGantt | null = null;

  constructor(
    private readonly ngZone: NgZone,
    private readonly cdr: ChangeDetectorRef,
  ) {}

  ngAfterViewInit(): void {
    this.initializeGantt();
    this.setupEventListeners();
  }

  ngOnDestroy(): void {
    this.removeEventListeners();
    this.destroyGantt();
  }

  private initializeGantt(): void {
    this.ngZone.runOutsideAngular(() => {
      const licenseKey = getApexGanttLicense();
      const ganttOptions: GanttUserOptions = {
        ...this.options,
        series: this.options?.series || this.tasks,
        width: this.options?.width || this.width,
        height: this.options?.height || this.height,
        viewMode: this.options?.viewMode || this.viewMode,
        theme: this.options?.theme || this.theme,
        ...(licenseKey && { licenseKey }),
      };

      this.ganttInstance = new ApexGantt(
        this.ganttContainer.nativeElement,
        ganttOptions,
      );

      this.ganttInstance.render();
    });
  }

  private setupEventListeners(): void {
    const container = this.ganttContainer.nativeElement;

    container.addEventListener(GanttEvents.TASK_UPDATE, this.handleTaskUpdate);
    container.addEventListener(
      GanttEvents.TASK_UPDATE_SUCCESS,
      this.handleTaskUpdateSuccess,
    );
    container.addEventListener(
      GanttEvents.TASK_UPDATE_ERROR,
      this.handleTaskUpdateError,
    );
    container.addEventListener(
      GanttEvents.TASK_DRAGGED,
      this.handleTaskDragged,
    );
    container.addEventListener(
      GanttEvents.TASK_RESIZED,
      this.handleTaskResized,
    );
    container.addEventListener(
      GanttEvents.SELECTION_CHANGE,
      this.handleSelectionChange,
    );
    container.addEventListener(
      GanttEvents.DEPENDENCY_ARROW_UPDATE,
      this.handleDependencyArrowUpdate,
    );
  }

  private removeEventListeners(): void {
    const container = this.ganttContainer.nativeElement;

    container.removeEventListener(
      GanttEvents.TASK_UPDATE,
      this.handleTaskUpdate,
    );
    container.removeEventListener(
      GanttEvents.TASK_UPDATE_SUCCESS,
      this.handleTaskUpdateSuccess,
    );
    container.removeEventListener(
      GanttEvents.TASK_UPDATE_ERROR,
      this.handleTaskUpdateError,
    );
    container.removeEventListener(
      GanttEvents.TASK_DRAGGED,
      this.handleTaskDragged,
    );
    container.removeEventListener(
      GanttEvents.TASK_RESIZED,
      this.handleTaskResized,
    );
    container.removeEventListener(
      GanttEvents.SELECTION_CHANGE,
      this.handleSelectionChange,
    );
    container.removeEventListener(
      GanttEvents.DEPENDENCY_ARROW_UPDATE,
      this.handleDependencyArrowUpdate,
    );
  }

  private handleTaskUpdate = (event: Event): void => {
    this.ngZone.run(() => {
      this.taskUpdate.emit(
        (event as CustomEvent<TaskUpdateEventDetail>).detail,
      );
      this.cdr.markForCheck();
    });
  };

  private handleTaskUpdateSuccess = (event: Event): void => {
    this.ngZone.run(() => {
      this.taskUpdateSuccess.emit(
        (event as CustomEvent<TaskUpdateSuccessEventDetail>).detail,
      );
      this.cdr.markForCheck();
    });
  };

  private handleTaskUpdateError = (event: Event): void => {
    this.ngZone.run(() => {
      this.taskUpdateError.emit(
        (event as CustomEvent<TaskUpdateErrorEventDetail>).detail,
      );
      this.cdr.markForCheck();
    });
  };

  private handleTaskDragged = (event: Event): void => {
    this.ngZone.run(() => {
      this.taskDragged.emit(
        (event as CustomEvent<TaskDraggedEventDetail>).detail,
      );
      this.cdr.markForCheck();
    });
  };

  private handleTaskResized = (event: Event): void => {
    this.ngZone.run(() => {
      this.taskResized.emit(
        (event as CustomEvent<TaskResizedEventDetail>).detail,
      );
      this.cdr.markForCheck();
    });
  };

  private handleSelectionChange = (event: Event): void => {
    this.ngZone.run(() => {
      this.selectionChange.emit(
        (event as CustomEvent<SelectionChangeEventDetail>).detail,
      );
      this.cdr.markForCheck();
    });
  };

  private handleDependencyArrowUpdate = (event: Event): void => {
    this.ngZone.run(() => {
      this.dependencyArrowUpdate.emit(
        (event as CustomEvent<DependencyArrowUpdateDetail>).detail,
      );
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
