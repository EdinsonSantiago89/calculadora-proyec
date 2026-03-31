import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/authservice';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent { // <--- El código debe ir DESPUÉS de esta llave
  usuario: string = ''; 
  clave: string = '';

  private authService = inject(AuthService);
  private router = inject(Router);

  ingresar() {
    this.authService.login(this.usuario, this.clave)
      .then(response => {
        console.log("¡Bienvenido!", response);
        this.router.navigate(['/calculadora']); 
      })
      .catch(error => {
        alert("Acceso denegado. Verifique su correo y contraseña en Firebase.");
        console.error(error);
      });
  }
} // <--- Asegúrate de que esta llave sea la ÚLTIMA del archivo