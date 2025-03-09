import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EmailService } from '../../services/email.service';

@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.css'
})
export class ContactUsComponent {
  submitted = false;
  loading = false;
  errorMessage = '';
  
  // Form data model
  formData = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: ''
  };

  constructor(private emailService: EmailService) {}

  async onSubmit() {
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
      message: ''
    };
  }
}
