import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import {
  Component,
  DestroyRef,
  inject,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-settings-page',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './settings-page.component.html',
  styleUrl: './settings-page.component.scss',
})
export class SettingsPageComponent implements OnInit {
  langageCtrl = new FormControl();
  destroyRef = inject(DestroyRef);

  platformId = inject(PLATFORM_ID);

  ngOnInit(): void {
    this.initForm();
    this.langageCtrl.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((langCode) => this.setLangage(langCode));
  }

  initForm() {
    if (isPlatformBrowser(this.platformId)) {
      const currentLangage = this.getLangage();
      this.langageCtrl.setValue(currentLangage);
      console.log('[ON CLIENT][SettingsPage] Init', currentLangage);
    } else if (isPlatformServer(this.platformId)) {
      console.log('[ON SERVER][SettingsPage] Init');
    }
  }

  setLangage(langage: string) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('langage', langage);
      console.log('[ON CLIENT][SettingsPage] setLangage', langage);
    } else if (isPlatformServer(this.platformId)) {
      console.log('[ON SERVER][SettingsPage] setLangage', langage);
    }
  }

  getLangage() {
    return localStorage.getItem('langage') || '';
  }
}
