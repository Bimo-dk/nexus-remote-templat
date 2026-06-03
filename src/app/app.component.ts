import { ChangeDetectionStrategy, Component } from '@angular/core';
import { EntryComponent } from './remote-entry/entry.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [EntryComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <main style="padding: 24px; max-width: 960px; margin: 0 auto;">
      <h1>__REMOTE_NAME__ — standalone view</h1>
      <p>Denne side ses kun når remoten køres isoleret. I produktion eksponeres entry-komponenten via Native Federation.</p>
      <app-remote-entry></app-remote-entry>
    </main>
  `,
})
export class AppComponent {}
