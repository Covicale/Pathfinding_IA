let heightRect = columnas / windowWidth;
let widthRect = filas / windowHeight;

class Nodo{
    constructor(i, j){
        this.posI = i;
        this.posJ = j;
        this.costeF = 0;
        this.costeG = 0;
        this.costeH = 0;
    }

    // Dibujara en pantalla el nodo
    show() {
        fill(255);
        stroke(0);
        rect(this.i * widthRect, this.j * heightRect, widthRect - 1, heightRect - 1)
    }
}