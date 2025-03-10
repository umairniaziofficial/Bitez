export const environment = {
  production: true,
  get apiUrl(): string {
    return (window.env?.apiUrl) || '';
  },
  get emailjs(): { serviceId: string; templateId: string; userId: string } {
    return (window.env?.emailjs) || {
      serviceId: '',
      templateId: '',
      userId: '',
    };
  }
};
