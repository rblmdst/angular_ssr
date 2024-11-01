import { Component, inject, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { switchMap } from 'rxjs';
import { ContactFormComponent } from '../../ui/contact-form/contact-form.component';
import { ContactHttpService } from '../../../services/contact-service.service';
import { Contact } from '../../../../../models';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';

@Component({
  selector: 'app-edit-contact-page',
  standalone: true,
  imports: [ContactFormComponent],
  template: '<app-contact-form (edit)="onEdit($event)" [contact]="contact" />'
})
export class EditContactPageComponent {
  private route = inject(ActivatedRoute);
  private contactService = inject(ContactHttpService);
  private router = inject(Router);

  params$ = this.route.params;
  contact: Contact | null = null;
  year = '';
  constructor() {
    this.params$
      .pipe(
        switchMap((params) => {
          const contactId = params['contactId'];
          return this.contactService.getById(contactId);
        }),
        takeUntilDestroyed()
      )
      .subscribe({
        next: (contact) => {
          this.contact = contact;
        },
        error: (err) => {
          console.log(err);
          this.contact = null;
        },
      });
  }

  platformId = inject(PLATFORM_ID);

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      console.log('[ON CLIENT][EditContactPage] Init');
    } else if (isPlatformServer(this.platformId)) {
      console.log('[ON SERVER][EditContactPage] Init');
    }
  }

  onEdit(contact: Contact) {
    this.contactService.update(contact).subscribe({
      next: (contact) => {
        this.router.navigate(['/contacts']);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
