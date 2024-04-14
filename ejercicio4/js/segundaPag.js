let numeroDestapados = 0;
let muestra1 = null;
let muestra2 = null;
let primerResultado = null;
let segundoResultado = null;
let movimientos = 0;
let aciertos = 0;

let mostrarMov = document.getElementById('numMov');
let mostrarAci = document.getElementById('numAciertos');

//numeros aleatorios
let numeros = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10];
numeros = numeros.sort(()=>{return Math.random()-0.5});
console.log(numeros);

function mostrar(id){
  numeroDestapados++;
  console.log(numeroDestapados);

  if (numeroDestapados == 1){
    //mostrar primer numero
    muestra1 = document.getElementById(id);
    primerResultado = numeros[id];
    muestra1.innerHTML = primerResultado;

    //desactivar primer boton
    muestra1.disabled = true; 
  }else if(numeroDestapados == 2){
    muestra2 = document.getElementById(id);
    segundoResultado = numeros[id];
    muestra2.innerHTML = segundoResultado;
    muestra2.disabled = true;

    movimientos++;
    mostrarMov.innerHTML = `Movimientos: ${movimientos}`;

    if(primerResultado == segundoResultado){
      numeroDestapados =0;

      aciertos++;
      mostrarAci.innerHTML = `Aciertos: ${aciertos}`;

      if(aciertos == 10){
        mostrarAci.innerHTML = `Aciertos: ${aciertos}🎉🥳`;
        mostrarMov.innerHTML = `Movimientos: ${movimientos}🤘🏻🙀`
      }

    }else{
      //tapar valores
      setTimeout(()=>{
        muestra1.innerHTML = ' ';
        muestra2.innerHTML = ' ';
        muestra1.disabled = false;
        muestra2.disabled = false;
        numeroDestapados = 0;
      },200);
    }
  }
}


const botonRegresar = document.getElementById('retornar');
botonRegresar.addEventListener('click', function() {
  window.location.href = '../index.html';
});