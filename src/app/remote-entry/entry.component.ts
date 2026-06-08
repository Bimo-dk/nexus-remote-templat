import { ChangeDetectionStrategy, Component, provideExperimentalZonelessChangeDetection, signal } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { NexusComponent, NexusRemote } from '@bimo-dk/nexus-build';

@NexusRemote()
@NexusComponent({
  title: '__REMOTE_NAME__ entry',
  description: 'Boilerplate demo component shipped with the Angular remote template.',
  category: 'demo',
  tags: ['demo', 'starter'],
})
@Component({
  selector: 'app-remote-entry',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section style="background: white; border: 2px solid #6366f1; border-radius: 12px; padding: 24px; box-shadow: 0 4px 12px rgba(99, 102, 241, 0.08);">
      <h2 style="margin: 0 0 16px; color: #4338ca;">__REMOTE_NAME__ entry component</h2>
      <p>You can safely delete all boilerplate in this file — it is your remote's primary entry. It is exposed as <code>./RemoteEntry</code> via Native Federation and loaded dynamically by the host.</p>
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

/**
 * BYOF federation entry — lets Vue/React/vanilla hosts mount this
 * Angular remote without sharing Angular with them. The host calls
 * `mount(el)`; we append a host element with our selector under it,
 * bootstrap a standalone Angular app on that element, and return a
 * teardown that destroys the app reference.
 */
export async function mount(el: HTMLElement): Promise<() => void> {
  const host = document.createElement('app-remote-entry');
  el.appendChild(host);
  // provideZonelessChangeDetection() lets this remote bootstrap inside a
  // Vue or React host where zone.js is not loaded. The host calls mount()
  // without bringing Angular's Zone runtime, so the default Zone-based
  // change detection would crash with NG0908 ("Zone not loaded"). Using
  // the zoneless scheduler keeps us framework-agnostic. (B-22)
  const appRef = await bootstrapApplication(EntryComponent, {
    providers: [provideExperimentalZonelessChangeDetection()],
  });
  return () => {
    appRef.destroy();
    if (host.parentNode === el) el.removeChild(host);
  };
}

export default EntryComponent;
