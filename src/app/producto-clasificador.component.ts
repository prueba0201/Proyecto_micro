
import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Producto {
  codigo: string;
  nombre: string;
  categoria: string;
  cantidad: number;
  seccion: 1 | 2 | 3;
}

@Component({
  selector: 'app-producto-clasificador',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <section class="clasificador">
      <h2>Clasificación inteligente</h2>

      <p>Escanea o introduce el código del producto.</p>

      <div class="busqueda">
        <input
          [(ngModel)]="codigo"
          (keyup.enter)="buscarProducto()"
          placeholder="Ej. PROD-1234"
        />

        <button (click)="buscarProducto()">
          Buscar producto
        </button>
      </div>

      <div *ngIf="producto" class="resultado">
        <h3>{{ producto.nombre }}</h3>

        <p><b>Código:</b> {{ producto.codigo }}</p>
        <p><b>Categoría:</b> {{ producto.categoria }}</p>
        <p><b>Cantidad:</b> {{ producto.cantidad }}</p>

        <div class="seccion">
          <span>UBICACIÓN ASIGNADA</span>
          <strong>SECCIÓN {{ producto.seccion }}</strong>
        </div>

        <button (click)="confirmar()">
          Confirmar registro
        </button>
      </div>

      <p *ngIf="error" class="error">{{ error }}</p>
    </section>
  `,
  styles: [`
    .clasificador {
      padding: 24px;
      border-radius: 18px;
      background: #faf8f4;
      color: #332b25;
    }

    .busqueda {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
      margin: 20px 0;
    }

    input {
      flex: 1;
      min-width: 180px;
      padding: 14px;
      border: 1px solid #d9d0c5;
      border-radius: 10px;
    }

    button {
      padding: 14px 20px;
      background: #806751;
      color: white;
      border: none;
      border-radius: 10px;
      cursor: pointer;
    }

    .resultado {
      padding: 20px;
      border-radius: 14px;
      background: white;
    }

    .seccion {
      margin: 18px 0;
      padding: 24px;
      border-radius: 12px;
      text-align: center;
      background: #e7f3eb;
      color: #17643a;
    }

    .seccion span {
      display: block;
      margin-bottom: 8px;
    }

    .seccion strong {
      font-size: 28px;
    }

    .error {
      color: #b42318;
    }
  `]
})
export class ProductoClasificadorComponent {
  @Output() confirmarProducto =
    new EventEmitter<Producto>();

  codigo = '';
  producto: Producto | null = null;
  error = '';

  // Productos de demostración
  productos: Producto[] = [
    {
      codigo: 'PROD-1234',
      nombre: 'Teclado mecánico',
      categoria: 'Periféricos',
      cantidad: 10,
      seccion: 1
    },
    {
      codigo: 'PROD-1235',
      nombre: 'Mouse inalámbrico',
      categoria: 'Periféricos',
      cantidad: 15,
      seccion: 1
    },
    {
      codigo: 'PROD-1236',
      nombre: 'Monitor LED',
      categoria: 'Pantallas',
      cantidad: 5,
      seccion: 2
    },
    {
      codigo: 'PROD-1237',
      nombre: 'Disco SSD',
      categoria: 'Almacenamiento',
      cantidad: 8,
      seccion: 2
    },
    {
      codigo: 'PROD-1238',
      nombre: 'Router WiFi',
      categoria: 'Redes',
      cantidad: 12,
      seccion: 3
    }
  ];

  buscarProducto() {
    const codigoBuscado =
      this.codigo.trim().toUpperCase();

    this.producto = this.productos.find(
      p => p.codigo === codigoBuscado
    ) ?? null;

    this.error = this.producto
      ? ''
      : 'Producto no encontrado en el inventario';
  }

  recibirEscaneo(codigoEscaneado: string) {
    this.codigo = codigoEscaneado;
    this.buscarProducto();
  }

  confirmar() {
    if (!this.producto) return;

    this.confirmarProducto.emit(this.producto);
  }
}
