import { InjectionToken, Provider } from "@angular/core";
import ApexGantt from "apexgantt";

/**
 * injection token for apexgantt license key
 */
export const APEXGANTT_LICENSE_KEY = new InjectionToken<string>(
  "APEXGANTT_LICENSE_KEY"
);

/**
 * internal variable to store license key
 */
let licenseKey: string | null = null;

/**
 * static method to set license
 * call this before bootstrapping your app
 *
 * @example
 * ```typescript
 * import { setApexGanttLicense } from 'ngx-apexgantt';
 *
 * setApexGanttLicense('your-license-key-here');
 *
 * bootstrapApplication(AppComponent, appConfig);
 * ```
 */
export function setApexGanttLicense(license: string): void {
  licenseKey = license;
  // set license in apexgantt library if it has a method for it
  if (typeof (ApexGantt as any).setLicense === "function") {
    (ApexGantt as any).setLicense(license);
  }
}

/**
 * get the currently set license key
 */
export function getApexGanttLicense(): string | null {
  return licenseKey;
}

/**
 * angular provider function for license configuration
 * use this in your app config or module providers
 *
 * @example
 * ```typescript
 * // standalone app (app.config.ts)
 * import { provideApexGanttLicense } from 'ngx-apexgantt';
 *
 * export const appConfig: ApplicationConfig = {
 *   providers: [
 *     provideApexGanttLicense('your-license-key-here'),
 *   ]
 * };
 *
 * // module-based app (app.module.ts)
 * @NgModule({
 *   providers: [
 *     provideApexGanttLicense('your-license-key-here'),
 *   ]
 * })
 * export class AppModule { }
 * ```
 */
export function provideApexGanttLicense(license: string): Provider {
  return {
    provide: APEXGANTT_LICENSE_KEY,
    useFactory: () => {
      setApexGanttLicense(license);
      return license;
    },
  };
}
