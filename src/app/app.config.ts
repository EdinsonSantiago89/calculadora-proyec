import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

// Importaciones de Firebase
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBYcdWX7R9xSiF7vMOueETynqLwvTqfvmo",
  authDomain: "proyecto-calculadora-obra.firebaseapp.com",
  projectId: "proyecto-calculadora-obra",
  storageBucket: "proyecto-calculadora-obra.firebasestorage.app",
  messagingSenderId: "857142078449",
  appId: "1:857142078449:web:493c05d0471b701df03250",
  measurementId: "G-SPHJVZ8TRC"
};

// ESTA ES LA LÍNEA QUE FALTA (El export)
export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    // Configuración de Firebase
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAuth(() => getAuth())
  ]
};