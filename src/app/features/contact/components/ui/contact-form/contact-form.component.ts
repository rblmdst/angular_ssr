import { NgIf } from '@angular/common';
import {
  Component,
  OnChanges,
  OnInit,
  SimpleChanges,
  input,
  output,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Contact, ContactWithoutId } from '../../../../../models';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.scss',
})
export class ContactFormComponent implements OnChanges, OnInit {
  isEdit = false;
  contact = input<Contact | null>(null);

  create = output<ContactWithoutId>();
  edit = output<Contact>();

  contactForm = new FormGroup({
    id: new FormControl(''),
    lastName: new FormControl('', [
      Validators.required,
      Validators.maxLength(30),
    ]),
    firstName: new FormControl('', [
      Validators.required,
      Validators.maxLength(30),
    ]),
    phoneNumber: new FormControl('', [
      Validators.required,
      Validators.pattern(/^\+[0-9]{10,15}$/),
    ]),
  });


  ngOnChanges(changes: SimpleChanges): void {
    if ('contact' in changes && this.contact()) {
      this.isEdit = true;
      this.contactForm.get('id')?.enable()
      this.contactForm.setValue(this.contact() as Contact);
    } else {
      this.contactForm.get('id')?.disable()
      this.isEdit = false;
    }
  }

  ngOnInit(): void {
    this.contactForm.get('id')?.disable()
  }
  get lastNameCtrl() {
    return this.contactForm.get('lastName');
  }
  get firstNameCtrl() {
    return this.contactForm.get('firstName');
  }
  get phoneNumberCtrl() {
    return this.contactForm.get('phoneNumber');
  }

  onSubmit() {
    if (this.isEdit) {
      this.edit.emit(this.contactForm.value as Contact);
    } else {
      this.create.emit(this.contactForm.value as ContactWithoutId);
    }
  }
}
