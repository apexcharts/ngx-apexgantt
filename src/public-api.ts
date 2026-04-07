/*
 * Public API Surface of ngx-apexgantt
 */

// Type-only re-exports from apexgantt (zero runtime cost)
export type {
  // Options
  GanttUserOptions,
  GanttTheme,
  ThemeMode,

  // Task model
  TaskInput,
  Task,
  TaskDependency,
  DependencyType,
  BaselineInput,
  BaselineOptions,
  ParsingConfig,
  ParsingValue,

  // Annotations
  Annotation,
  Orientation,

  // Toolbar
  ToolbarItem,
  ToolbarButton,
  ToolbarSelect,
  ToolbarSeparator,
  ToolbarContext,
  ColumnListItem,

  // Typed event map and detail interfaces
  GanttEventMap,
  TaskUpdateEventDetail,
  TaskUpdateSuccessEventDetail,
  TaskUpdateErrorEventDetail,
  TaskDraggedEventDetail,
  TaskResizedEventDetail,
  SelectionChangeEventDetail,
  DependencyArrowUpdateDetail,
  TaskValidationErrorEventDetail,
} from "apexgantt";

// Value re-exports (needed at runtime)
export {
  ApexGantt,
  ViewMode,
  TaskType,
  ColumnKey,
  ColumnList,
  GanttEvents,
  LightTheme,
  DarkTheme,
  getTheme,
  DataParser,
} from "apexgantt";

// Angular wrapper components and services
export { NgxApexGanttComponent } from "./lib/ngx-apexgantt.component";
export { NgxApexGanttModule } from "./lib/ngx-apexgantt.module";
export { APEXGANTT_LICENSE_KEY } from "./lib/ngx-apexgantt.license";
export { setApexGanttLicense } from "./lib/ngx-apexgantt.license";
