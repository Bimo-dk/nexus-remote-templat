import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

@Component({
  selector: 'app-remote-entry',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section style="background: white; border: 2px solid #6366f1; border-radius: 12px; padding: 24px; box-shadow: 0 4px 12px rgba(99, 102, 241, 0.08);">
      <h2 style="margin: 0 0 16px; color: #4338ca;">__REMOTE_NAME__ entry component</h2>
      <p>Du kan trygt slette al boilerplate i denne fil — det er din remote's primære indgang. Den eksponeres som <code>./RemoteEntry</code> via Native Federation og loades dynamisk af host.</p>
      <p>Route: <code>/__REMOTE_ROUTE__</code></p>
      <p>
        Counter (signal): <strong>{{ count() }}</strong>
        <button type="button" (click)="increment()" style="margin-left: 8px;">+1</button>
      </p>
    </section>
  `,
})
export class EntryComponent {
  readonly count = signal(0);
  increment(): void { this.count.update((v) => v + 1); }
}

export default EntryComponent;
