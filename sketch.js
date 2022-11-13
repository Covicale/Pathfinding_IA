const inf = 99999999; // Constante simulando lo que sería el valor infinito 
const square_size = 20; // Tamaño de los cuadrados en el visualizador
let stack = []; // Servira para almacenar el camino recorrido

// Reinicia el grid y recorre el camino nuevamente
// Ademas de inicializar todo
function setup() {

  // Obtenemos las filas y columnas del Grid mediante el input del usuario
  let filas = parseInt(document.getElementById("grid_height").value);
  let columnas = parseInt(document.getElementById("grid_width").value);

  // Obtenemos la funcion heuristica mediante el input del usuario
  let heuristic_doc = document.getElementById("heuristica");
  let heuristic = heuristic_doc.options[heuristic_doc.selectedIndex].value;

  // Obtenemos los nodos iniciales y finales que haya introducido el usuario
  let start_i = document.getElementById("initial_i").value;
  let start_j = document.getElementById("initial_j").value;
  let end_i = document.getElementById("final_i").value;
  let end_j = document.getElementById("final_j").value;

  // Creamos el canvas donde se mostrará graficamente todo
  let canvas = createCanvas(square_size * columnas, square_size * filas);
  canvas.parent('sketch-holder');

  // Creamos el objeto grid
  let gridObj = new Grid(columnas, filas);

  // Obtenemos los estados iniciales y finales desde el objeto grid
  let start = gridObj.grid[start_i][start_j];
  let end = gridObj.grid[end_i][end_j];

  // Pintamos de rojo el estado final
  end.show(color(255, 0, 0));

  // Ejecutamos el recorrido A Estrella
  AStar(start, end, heuristic, gridObj);

  // Una vez recorrido, mediante el atributo parent del nodo, podemos
  // obtener el camino para llegar al nodo, para esto,
  // lo metemos en una pila artificial para mostrar el camino

  stack = [];
  stack.push(end);
  let actual_node = end;
  while(actual_node != start) {
    stack.push(actual_node)
    actual_node = actual_node.parent;
  }
  stack.push(start);

}

function draw(){
  // Vamos sacando de la pila los nodos para reconstruir el camino y lo visualizamos pintandolos de negro
  if(stack.length > 0){
    stack[stack.length - 1].show(0);
    stack.pop();
  }
}