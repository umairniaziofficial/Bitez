const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, 'src/environments/.env') });

// Generate runtime environment variables file for the browser
const envJsPath = path.join(__dirname, 'src/assets/env.js');
const envJsContent = `(function(window) {
  window.env = window.env || {};
  window.env.apiUrl = "${process.env.API_URL || ''}";
  window.env.emailjs = {
    serviceId: "${process.env.EMAILJS_SERVICE_ID || ''}",
    templateId: "${process.env.EMAILJS_TEMPLATE_ID || ''}",
    userId: "${process.env.EMAILJS_USER_ID || ''}"
  };
})(this);
`;

// Ensure the assets directory exists
const assetsDir = path.join(__dirname, 'src/assets');
if (!fs.existsSync(assetsDir)){
  fs.mkdirSync(assetsDir, { recursive: true });
}

// Write env.js file
fs.writeFileSync(envJsPath, envJsContent);
console.log(`Runtime environment file generated at ${envJsPath}`);

// Generate TypeScript environment files
const environmentFilePath = path.join(__dirname, 'src/environments/environment.ts');
const environmentProdFilePath = path.join(__dirname, 'src/environments/environment.prod.ts');

const environmentContent = `export const environment = {
  production: false,
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
`;

const environmentProdContent = `export const environment = {
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
`;

fs.writeFileSync(environmentFilePath, environmentContent);
console.log(`Environment file generated at ${environmentFilePath}`);

fs.writeFileSync(environmentProdFilePath, environmentProdContent);
console.log(`Production environment file generated at ${environmentProdFilePath}`);
