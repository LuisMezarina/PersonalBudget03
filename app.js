/**
 * Función constructora para representar un movimiento financiero
 * @param {string} tipo - 'ingreso' o 'egreso'
 * @param {number} monto - Valor numérico positivo
 * @param {string} descripcion - Descripción del movimiento
 */
function Movimiento(tipo, monto, descripcion) {
  // Validaciones en el constructor
  if (tipo !== 'ingreso' && tipo !== 'egreso') {
    throw new Error('Tipo de movimiento inválido. Use "ingreso" o "egreso"');
  }
  
  if (typeof monto !== 'number' || monto <= 0) {
    throw new Error('El monto debe ser un número positivo');
  }
  
  if (!descripcion || descripcion.trim() === '') {
    throw new Error('La descripción no puede estar vacía');
  }

  // Propiedades del objeto
  this.tipo = tipo;
  this.monto = monto;
  this.descripcion = descripcion;
  this.fecha = new Date();
  
  // Método para formatear el monto
  this.formatearMonto = function() {
    return this.tipo === 'ingreso' 
      ? `+S/${this.monto.toFixed(2)}` 
      : `-S/${this.monto.toFixed(2)}`;
  };
}


/**
 * Método para renderizar el movimiento en el DOM
 * @returns {HTMLElement} Elemento HTML que representa el movimiento
 */
Movimiento.prototype.render = function() {
  const movimientoElement = document.createElement('div');
  movimientoElement.className = `movimiento ${this.tipo}`;
  
  movimientoElement.innerHTML = `
    <div class="movimiento-header">
      <span class="fecha">${this.fecha.toLocaleDateString()}</span>
      <span class="tipo ${this.tipo}">${this.tipo.toUpperCase()}</span>
    </div>
    <div class="movimiento-body">
      <p class="descripcion">${this.descripcion}</p>
      <p class="monto ${this.tipo}">${this.formatearMonto()}</p>
    </div>
  `;
  
  return movimientoElement;
};


// Array global para almacenar los movimientos
const movimientos = [];

// Función para registrar nuevos movimientos
function registrarMovimiento() {
  try {
    const tipo = prompt("¿Es un ingreso o egreso? (ingreso/egreso)");
    const monto = Number(prompt("Ingrese el monto:"));
    const descripcion = prompt("Ingrese una descripción:");
    
    // Crear nueva instancia de Movimiento
    const nuevoMovimiento = new Movimiento(tipo, monto, descripcion);
    
    // Agregar al array
    movimientos.push(nuevoMovimiento);
    
    // Renderizar en el DOM
    const contenedor = document.getElementById('movimientos-container');
    contenedor.appendChild(nuevoMovimiento.render());
    
    // Actualizar balance
    actualizarBalance();
    
  } catch (error) {
    alert(`Error: ${error.message}`);
  }
}

// Función para calcular y mostrar el balance
function actualizarBalance() {
  const balance = movimientos.reduce((total, movimiento) => {
    return movimiento.tipo === 'ingreso'
      ? total + movimiento.monto
      : total - movimiento.monto;
  }, 0);
  
  document.getElementById('balance-total').textContent = `S/${balance.toFixed(2)}`;
}