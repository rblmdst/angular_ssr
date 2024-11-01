import { Routes } from '@angular/router';
import { ContactListPageComponent } from './features/contact/components/smart/contact-list-page/contact-list-page.component';
import { CreateContactPageComponent } from './features/contact/components/smart/create-contact-page/create-contact-page.component';
import { SettingsPageComponent } from './features/settings/components/smart/settings-page/settings-page.component';
import { EditContactPageComponent } from './features/contact/components/smart/edit-contact-page/edit-contact-page.component';

export const routes: Routes = [
  {
    path: 'contacts',
    children: [
      { path: '', component: ContactListPageComponent },
      { path: 'new', component: CreateContactPageComponent },
      { path: 'edit/:contactId', component: EditContactPageComponent },
    ],
  },
  {
    path: 'settings',
    component: SettingsPageComponent,
  },
  {
    path: 'lazy',
    loadComponent: () => import('./features/lazy/lazy.component'),
  },
  { path: '', redirectTo: 'contacts', pathMatch: 'full' },
];
