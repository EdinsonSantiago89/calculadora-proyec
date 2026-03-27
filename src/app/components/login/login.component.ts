import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  usuario: string = '';
  clave: string = '';

  constructor(private router: Router) {}

  ingresar() {
    // Por ahora, usaremos una validación simple (luego usaremos Firebase Auth)
    if (this.usuario === 'admin' && this.clave === '1234') {
      this.router.navigate(['/calculadora']);
    } else {
      alert('Usuario o contraseña incorrectos. Intenta con admin / 1234');
    }
  }
}