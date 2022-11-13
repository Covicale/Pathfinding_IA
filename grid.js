function Grid(width, height) {
  this.width = width;
  this.height = height;
  this.grid = new Array(width);

  for (let i = 0; i < this.grid.length; i++) {
    this.grid[i] = new Array(height);
  }

  // Inicializa los nodos
  for (let i = 0; i < this.grid.length; i++) {
    for (let j = 0; j < this.grid[i].length; ++j) {
      this.grid[i][j] = new Nodo(i, j);
    }
  }

  // Añade la vecindad e imprime la cuadricula
  for (let i = 0; i < this.grid.length; i++) {
    for (let j = 0; j < this.grid[i].length; ++j) {
      this.grid[i][j].add_neighbors(this.grid, this.width, this.height);
      this.grid[i][j].show(255);
    }
  }
}

// Funcion heuristica basada en la distancia de manhattann
function ManhatannDistance(node, end){
  return Math.abs(end.i - node.i) + Math.abs(end.j - node.j);
}

// Funcion heuristica basada en la distancia euclidea
function EuclideanDistance(node, end){
  return Math.hypot(end.i - node.i, end.j - node.j)
}

function AStar(start, end, euclidean, grid){

  start.g = 0; // El nodo de inicio sabemos que tiene coste G = 0
  start.h = (euclidean > 0 ? EuclideanDistance(start, end) : ManhatannDistance(start, end));
  start.f = start.h;

  let openSet = []; // Almacenaremos los nodos que nos faltan por inspeccionar
  let closedSet = []; // Almacenaremos los nodos ya inspeccionados

  openSet.push(start) // Comenzamos metiendo en openSet el nodo inicial

  let nodos_generados = 1, iteracion = 0;

  // Mientras hayan nodos que inspeccionar, se continua
  while (openSet.length > 0) {

    // Sumamos una iteracion
    ++iteracion;

    // Cogemos el nodo mas optimo para inspeccionarlo, para ello
    // mediante la variable nodoOptimo, almacenaremos la posicion del nodo
    // con menor coste F de openSet
    let nodoOptimo = 0;
    for(let i = 0; i < openSet.length; ++i){
      // Si existe un nodo con menor coste que el de la posicion nodoOptimo, se escoge este nuevo
      if(openSet[i].f < openSet[nodoOptimo].f) nodoOptimo = i;
    }

    // Inspeccionamos el nodo mas optimo
    let nodoActual = openSet[nodoOptimo];

    // Si el nodo mas optimo es el final, el algoritmo termina
    if (nodoActual == end) break;

    // En caso de que no se haya encontrado el nodo final
    // eliminamos de la lista de nodos a inspeccionar el actual
    // y lo metemos en la lista de nodos ya inspeccionados
    EliminarNodo(openSet, nodoActual);
    closedSet.push(nodoActual);

    // Obtenemos todos los vecinos del nodo que estamos inspeccionando e iteramos
    let vecinos = nodoActual.neighbors;
    for(let i = 0; i < vecinos.length; ++i){      

      // En el caso de que el vecino no se haya inspeccionado aún
      if(!closedSet.includes(vecinos[i])){

        ++nodos_generados;

        // Almacenamos en una variable el posible candidato del coste G
        let temporalCostG = nodoActual.g + 1;
        // Si este coste G, es menor que el suyo propio
        // Actualizamos tanto su padre, como sus costes
        if(temporalCostG < vecinos[i].g){
          vecinos[i].parent = nodoActual;
          vecinos[i].g = temporalCostG;
          vecinos[i].h = (euclidean > 0 ? EuclideanDistance(vecinos[i], end) : ManhatannDistance(vecinos[i], end));
          vecinos[i].f = vecinos[i].h;

          // Si el nodo no esta en el openSet, lo introducimos
          if(!openSet.includes(vecinos[i])){
            openSet.push(vecinos[i]);
          }
        }
      }
    }
  };

  document.getElementById("nodos_generados").innerHTML = nodos_generados;
  document.getElementById("iteraciones").innerHTML = iteracion;
}
