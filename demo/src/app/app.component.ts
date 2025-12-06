import { Component } from '@angular/core';
import { BasicDemoComponent } from './demos/basic-demo.component';
import { InteractiveDemoComponent } from './demos/interactive-demo.component';
import { EventsDemoComponent } from './demos/events-demo.component';
import { DarkThemeDemoComponent } from './demos/dark-theme-demo.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    BasicDemoComponent,
    InteractiveDemoComponent,
    EventsDemoComponent,
    DarkThemeDemoComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'ngx-apexgantt Demo';
}
