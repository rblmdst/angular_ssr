import { Component, inject, PLATFORM_ID } from '@angular/core';
import { ContactFormComponent } from '../../ui/contact-form/contact-form.component';
import { ContactWithoutId } from '../../../../../models';
import { ContactHttpService } from '../../../services/contact-service.service';
import { Router } from '@angular/router';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';

@Component({
  selector: 'app-create-contact-page',
  standalone: true,
  imports: [ContactFormComponent],
  template: '<app-contact-form (create)="onCreate($event)" />'
})
export class CreateContactPageComponent {
  private contactService = inject(ContactHttpService);
  private router = inject(Router);

  platformId = inject(PLATFORM_ID);

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      console.log('[ON CLIENT][CreateContactPage] Init');
    } else if (isPlatformServer(this.platformId)) {
      console.log('[ON SERVER][CreateContactPage] Init');
    }
  }

  onCreate(contact: ContactWithoutId) {
    this.contactService.create(contact).subscribe({
      next: (createdContact) => {
        this.router.navigate(['/contacts']);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
