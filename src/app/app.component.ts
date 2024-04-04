import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  // imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'bks';
  loadedFeature = 'favorites';
  // selectedFeature: string;

  onNavigate(feature: string) {
    this.loadedFeature = feature;
  }
}
