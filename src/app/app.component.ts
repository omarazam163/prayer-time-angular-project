import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./navbar/navbar.component";
import { TodayComponent } from "./today/today.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, TodayComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'app';
}
