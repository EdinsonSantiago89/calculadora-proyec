import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-calculadora',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './calculadora.component.html',
  styleUrls: ['./calculadora.component.css']
})
export class CalculadoraComponent {
  // Variables de identificación e historial
  zona: string = '';
  historial: any[] = [];

  // Variables para la columna Rectangular
  largo: number = 0;
  ancho: number = 0;
  alto: number = 0;
  
  // Variables para la columna Circular
  diametro: number = 0;

  // Selección de Resistencia y Tipo
  tipoSeccion: string = 'rectangular'; 
  fcSeleccionado: number = 210;

  // Resultados
  volumen: number = 0;
  cemento: number = 0;
  arena: number = 0;
  piedra: number = 0;
  agua: number = 0;

  // Tabla de dosificación por m3
  dosificacionBase: any = {
    140: { cem: 7.01, are: 0.51, pie: 0.64, agu: 0.184 },
    175: { cem: 8.43, are: 0.54, pie: 0.55, agu: 0.185 },
    210: { cem: 9.73, are: 0.52, pie: 0.53, agu: 0.186 },
    245: { cem: 11.50, are: 0.50, pie: 0.51, agu: 0.187 },
    280: { cem: 13.34, are: 0.45, pie: 0.51, agu: 0.189 }
  };

  calcular() {
    // 1. Calcular Volumen base (m3)
    if (this.tipoSeccion === 'rectangular') {
      this.volumen = this.largo * this.ancho * this.alto;
    } else {
      let radio = this.diametro / 2;
      this.volumen = Math.PI * Math.pow(radio, 2) * this.alto;
    }

    // 2. Aplicar Dosificación + 5% Desperdicio
    const base = this.dosificacionBase[this.fcSeleccionado];
    const factorDesperdicio = 1.05;

    this.cemento = this.volumen * base.cem * factorDesperdicio;
    this.arena = this.volumen * base.are * factorDesperdicio;
    this.piedra = this.volumen * base.pie * factorDesperdicio;
    this.agua = this.volumen * base.agu * factorDesperdicio;
  }

  limpiar() {
    this.largo = 0;
    this.ancho = 0;
    this.alto = 0;
    this.diametro = 0;
    this.volumen = 0;
    this.zona = '';
    // Los resultados también se limpian para que desaparezca el card
    this.cemento = 0;
    this.arena = 0;
    this.piedra = 0;
  }

  guardarProyecto() {
    if (!this.zona) {
      alert("Por favor, identifica la zona antes de guardar.");
      return;
    }
    
    // Creamos el objeto con los datos actuales
    const registro = {
      fecha: new Date(),
      zona: this.zona,
      volumen: this.volumen,
      cemento: this.cemento,
      arena: this.arena,
      piedra: this.piedra
    };

    // Lo agregamos al historial local (unshift lo pone al principio de la lista)
    this.historial.unshift(registro);

    console.log("Guardado en historial local:", registro);
    alert("¡Registro guardado con éxito para: " + this.zona + "!");
    
    // Opcional: limpiar después de guardar
    // this.limpiar(); 
  }
} // <--- Esta es la llave que faltaba para cerrar la clase