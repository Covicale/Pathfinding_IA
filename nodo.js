// Funcion donde pasado un set de nodos, se elimina el nodo pasado por parametro
function EliminarNodo(set, nodo){
    for(let i = 0; i < set.length; ++i){
      if(set[i] === nodo){
        set.splice(i, 1);
      }
    }
}

// Objeto nodo que será cada posición posible de la cuadricula
function Nodo(i, j){
    this.i = i, this.j = j; // Posicion (i, j) en la cuadricula
    this.f = 0, this.g = 99999999, this.h = 0; // Costos utilizados en A estrella
    this.neighbors = []; // Vector con sus vecinos
    this.parent = -1; // Nodo padre, en caso de no existir será -1
  
    // Funcion para colorear el nodo en la posición correspondiente
    this.show = (colorNodo) => {
      fill(colorNodo);
      stroke(0);
      rect(this.i * square_size, this.j * square_size, square_size, square_size);
    }
  
    // Funcion para añadir los nodos vecinos del grid
    this.add_neighbors = (grid, width, height) => {
      // Miramos las 4 posiciones, arriba, abajo, izquierda y derecha
      if(this.i < width - 1) this.neighbors.push(grid[this.i + 1][this.j]);
      if(this.i > 0) this.neighbors.push(grid[this.i - 1][this.j]);
      if(this.j < height - 1) this.neighbors.push(grid[this.i][this.j + 1]);
      if(this.j > 0) this.neighbors.push(grid[this.i][this.j - 1]);
    }
}