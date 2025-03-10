import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { EmailService } from '../../services/email.service';

@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.css',
})
export class ContactUsComponent {
  submitted = false;
  loading = false;
  errorMessage = '';
  formSubmitted = false;

  @ViewChild('contactForm') contactForm!: NgForm;

  formData = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: '',
  };

  emailPattern = '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$';
  phonePattern = '^[0-9\\+\\-\\s()]{7,20}$';

  constructor(private emailService: EmailService) {}

  async onSubmit() {
    this.formSubmitted = true;

    if (!this.contactForm.valid) {
      this.errorMessage = 'Please fill out all required fields correctly.';
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    try {
      await this.emailService.sendEmail(this.formData);
      this.submitted = true;
      this.resetForm();
    } catch (error) {
      this.errorMessage = 'Failed to send message. Please try again later.';
      console.error('Error in form submission:', error);
    } finally {
      this.loading = false;
    }
  }

  resetForm() {
    this.formData = {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      company: '',
      subject: '',
      message: '',
    };
    this.formSubmitted = false;
    if (this.contactForm) {
      this.contactForm.resetForm();
    }
  }

  shouldShowError(field: any): boolean {
    return field.invalid && (field.touched || this.formSubmitted);
  }
}
