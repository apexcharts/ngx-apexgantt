import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NgxApexGanttComponent } from "./ngx-apexgantt.component";

/**
 * ngx-apexgantt module for module-based angular apps
 *
 * note: the component is standalone, so you can also import it directly
 * without this module in standalone apps
 *
 * @example
 * ```typescript
 * // module-based app
 * import { NgxApexGanttModule } from 'ngx-apexgantt';
 *
 * @NgModule({
 *   imports: [NgxApexGanttModule],
 * })
 * export class AppModule { }
 *
 * // standalone app
 * import { NgxApexGanttComponent } from 'ngx-apexgantt';
 *
 * @Component({
 *   imports: [NgxApexGanttComponent],
 * })
 * export class MyComponent { }
 * ```
 */
@NgModule({
  imports: [CommonModule, NgxApexGanttComponent],
  exports: [NgxApexGanttComponent],
})
export class NgxApexGanttModule {}
