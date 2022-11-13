
const inf = 99999999;
let filas = 300, columnas = 300;
let square_size = 20;
let grid = new Array(columnas);

var openSet = []
var closedSet = []
var start;
var end;
var stack = [];

/*class Nodo{
  constructor(i, j){
      this.posI = i;
      this.posJ = j;
      this.costeF = 0;
      this.costeG = 0;
      this.costeH = 0;
  }

  show(){
    fill(255);
    stroke(0);
    rect(this.i * square_size, this.j * square_size, square_size, square_size);
  }
}*/

function EliminarNodo(set, nodo){
  for(let i = 0; i < set.length; ++i){
    if(set[i] === nodo){
      set.splice(i, 1);
    }
  }
}

function Nodo(i, j){
  this.i = i, this.j = j;
  this.f = 0, this.g = 99999999, this.h = 0;
  this.neighbors = []; // Vector con sus vecinos
  this.parent = -1;

  this.show = (colorNodo) => {
    fill(colorNodo);
    stroke(0);
    rect(this.i * square_size, this.j * square_size, square_size, square_size);
  }

  this.add_neighbors = (grid) => {
    // Miramos las 4 posiciones, arriba, abajo, izquierda y derecha
    if(this.i < columnas - 1) this.neighbors.push(grid[this.i + 1][this.j])
    if(this.i > 0) this.neighbors.push(grid[this.i - 1][this.j])
    if(this.j < filas - 1) this.neighbors.push(grid[this.i][this.j + 1])
    if(this.j > 0) this.neighbors.push(grid[this.i][this.j - 1])
  }
}

function ManhatannDistance(node, end){
  return Math.abs(end.i - node.i) + Math.abs(end.j - node.j);
}

function EuclideanDistance(node, end){
  return Math.hypot(end.i - node.i, end.j - node.j)
}

function AStar(euclidean = 0, start_i = 0, start_j = 0, end_i = filas - 1, end_j = columnas - 1){

  end = grid[end_i][end_j];
  end.show(color(255, 0, 0));
  start = grid[start_i][start_j];
  start.g = 0;
  openSet.push(start)

  while (openSet.length > 0) {
    // A Star
    // Cogemos el nodo mas optimo para inspeccionarlo
    let nodoOptimo = 0; // Posicion en openSet del nodo mas optimo
    for(let i = 0; i < openSet.length; ++i){
      if(openSet[i].f < openSet[nodoOptimo].f) nodoOptimo = i;
    }

    // Inspeccionamos el nodo mas optimo
    let nodoActual = openSet[nodoOptimo];

    // Si el nodo mas optimo es el final, el algoritmo termina
    if (nodoActual == end) console.log("Fin.");

    EliminarNodo(openSet, nodoActual);
    closedSet.push(nodoActual);

    let vecinos = nodoActual.neighbors;
    for(let i = 0; i < vecinos.length; ++i){
      
      if(!closedSet.includes(vecinos[i])){
        // Posibilidad de que sea el coste G
        let temporalCostG = nodoActual.g + 1
        if(temporalCostG < vecinos[i].g){
          vecinos[i].parent = nodoActual;
          vecinos[i].g = temporalCostG;
          vecinos[i].h = (euclidean < 1 ? EuclideanDistance(vecinos[i], end) : ManhatannDistance(vecinos[i], end));
          vecinos[i].f = vecinos[i].g + vecinos[i].h;
          if(!openSet.includes(vecinos[i])) openSet.push(vecinos[i]);
        }
      }
    }
  };
}

// Setup del grid
function setup() {
  let canvas = createCanvas(square_size * columnas, square_size * filas);
  canvas.parent('sketch-holder');
  // Making 2D Grid
  for (let i = 0; i < grid.length; i++) {
    grid[i] = new Array(filas);
  }

  // Inicializa los nodos
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; ++j) {
      grid[i][j] = new Nodo(i, j);
    }
  }

  // Añade la vecindad
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; ++j) {
      grid[i][j].add_neighbors(grid);
      grid[i][j].show(255);
    }
  }

  AStar(1);

  stack.push(end);
  let actual_node = end;
  while(actual_node != start) {
    stack.push(actual_node)
    actual_node = actual_node.parent;
  }

  stack.push(start);

  console.log(stack);

}

function draw(){
  if(stack.length > 0){
    stack[stack.length - 1].show(0);
    stack.pop();
  }

}