import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-calculadora',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './calculadora.component.html',
  styleUrls: ['./calculadora.component.css']
})
export class CalculadoraComponent implements OnInit {
  // Parámetros
  zona: string = '';
  tipoSeccion: string = 'rectangular';
  largo!: number;
  ancho!: number;
  diametro!: number;
  alto!: number;
  fcSeleccionado: number = 210;

  // Resultados
  volumen: number = 0;
  cemento: number = 0;
  arena: number = 0;
  piedra: number = 0;
  agua: number = 0;

  // Estado
  historial: any[] = [];
  isDarkMode: boolean = true;

  ngOnInit() {
    const saved = localStorage.getItem('historial_calculos');
    if (saved) this.historial = JSON.parse(saved);
  }

  calcular() {
  // 1. Cálculo del Volumen base (m3)
  if (this.tipoSeccion === 'rectangular') {
    this.volumen = this.largo * this.ancho * this.alto;
  } else {
    this.volumen = Math.PI * Math.pow((this.diametro / 2), 2) * this.alto;
  }

  // 2. Definición de la tabla técnica (según tu imagen de Excel)
  const tablaDosificacion: any = {
    140: { cem: 7.01, are: 0.51, pie: 0.64, agu: 184 },
    175: { cem: 8.43, are: 0.54, pie: 0.55, agu: 185 },
    210: { cem: 9.73, are: 0.52, pie: 0.53, agu: 186 },
    245: { cem: 11.50, are: 0.50, pie: 0.51, agu: 187 },
    280: { cem: 13.34, are: 0.45, pie: 0.51, agu: 189 }
  };

  // Obtener factores según la resistencia seleccionada
  const factores = tablaDosificacion[this.fcSeleccionado];

  // 3. Aplicación de desperdicio (+5%)
  const desperdicio = 1.05;

  // 4. Cálculos finales
  this.cemento = (this.volumen * factores.cem) * desperdicio;
  this.arena = (this.volumen * factores.are) * desperdicio;
  this.piedra = (this.volumen * factores.pie) * desperdicio;
  this.agua = (this.volumen * factores.agu) * desperdicio;
}

  guardarProyecto() {
    if (this.volumen <= 0) return;
    const registro = { fecha: new Date(), zona: this.zona || 'Sin zona', cemento: this.cemento };
    this.historial.unshift(registro);
    localStorage.setItem('historial_calculos', JSON.stringify(this.historial));
  }

  limpiar() {
    this.zona = '';
    this.largo = this.ancho = this.diametro = this.alto = undefined as any;
    this.volumen = 0;
  }

  toggleTema() {
    this.isDarkMode = !this.isDarkMode;
    document.body.classList.toggle('light-mode', !this.isDarkMode);
  }
}