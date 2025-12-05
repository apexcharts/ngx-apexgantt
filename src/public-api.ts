/*
 * Public API Surface of ngx-apexgantt
 */

// re-export core library types for user convenience
export type {
  TaskInput,
  TaskType,
  GanttUserOptions,
  ViewMode,
  ThemeMode,
  GanttEvents,
  TaskUpdateSuccessEventDetail,
  TaskDraggedEventDetail,
  TaskResizedEventDetail,
  TaskUpdateEventDetail,
  TaskValidationErrorEventDetail,
  TaskUpdateErrorEventDetail,
  Annotation,
  ParsingConfig,
  ParsingValue,
  GanttTheme,
} from "apexgantt";

// re-export useful utilities
export {
  ColumnKey,
  LightTheme,
  DarkTheme,
  getTheme,
  DataParser,
} from "apexgantt";

// export Angular wrapper components and services
export { NgxApexGanttComponent } from "./lib/ngx-apexgantt.component";
export { NgxApexGanttModule } from "./lib/ngx-apexgantt.module";
export { APEXGANTT_LICENSE_KEY } from "./lib/ngx-apexgantt.license";
export { setApexGanttLicense } from "./lib/ngx-apexgantt.license";
