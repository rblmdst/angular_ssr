import { AsyncPipe, isPlatformBrowser, isPlatformServer, NgIf } from '@angular/common';
import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ContactDetailsComponent } from '../../ui/contact-details/contact-details.component';
import { ContactListComponent } from '../../ui/contact-list/contact-list.component';
import { Contact } from '../../../../../models';
import { ContactHttpService } from '../../../services/contact-service.service';
import { catchError, concatMap, Observable, of, tap } from 'rxjs';

@Component({
  selector: 'app-contact-list-page',
  standalone: true,
  imports: [ContactListComponent, ContactDetailsComponent, NgIf, AsyncPipe],
  templateUrl: './contact-list-page.component.html',
})
export class ContactListPageComponent  implements OnInit {
  private contactService = inject(ContactHttpService);
  contacts$ = this.contactService.getAll();
  currentContact$: Observable<Contact | null> = of(null);

  platformId = inject(PLATFORM_ID);

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      console.log('[ON CLIENT][ContactListPage] Init');
    } else if (isPlatformServer(this.platformId)) {
      console.log('[ON SERVER][ContactListPage] Init');
    }
  }

  showDetails(contactId: string) {
    this.currentContact$ = this.contactService
      .getById(contactId)
      .pipe(catchError(() => of(null)));
  }

  onDelete(contactId: string) {
    this.contacts$ = this.contactService.delete(contactId).pipe(
      tap(() => {
        this.currentContact$ = of(null);
      }),
      concatMap(() => this.contactService.getAll()),
      catchError(() => of([]))
    );
  }
}
