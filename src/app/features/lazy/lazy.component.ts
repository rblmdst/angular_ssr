import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { Component, inject, PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-lazy',
  standalone: true,
  imports: [],
  template:'<h1>Lazy Loaded test component</h1>',
})
export default class LazyComponent {
  platformId = inject(PLATFORM_ID);

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      console.log('[ON CLIENT][Lazy] Init');
    } else if (isPlatformServer(this.platformId)) {
      console.log('[ON SERVER][Lazy] Init');
    }
  }
}
