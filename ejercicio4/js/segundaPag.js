let numeroDestapados = 0;
let muestra1 = null;
let muestra2 = null;
let primerResultado = null;
let segundoResultado = null;
let movimientos = 0;
let aciertos = 0;
let temporizador = false;
let timer = 40;
let timerIn = 40;
let tiempoReg = null;

let mostrarMov = document.getElementById('numMov');
let mostrarAci = document.getElementById('numAciertos');
let mostrarTiem = document.getElementById('t-restante')

let numeros = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10];
numeros = numeros.sort(()=>{return Math.random()-0.5});
console.log(numeros);

function contarTiempo(){
  tiempoReg = setInterval(()=>{
    timer--;
    mostrarTiem.innerHTML = `Tiempo: ${timer} seg`;
    if (timer == 0){
      clearInterval(tiempoReg);
      bloqMuestra();
    }
  },1000)
}

function bloqMuestra(){
  for (let i = 0; i <= 19; i++){
    let muestraBloq = document.getElementById(i);
    muestraBloq.innerHTML =  `<img src="./img/${numeros[i]}.png" alt="">`;
    muestraBloq.disabled = true;
  }
}

function mostrar(id){

  if (temporizador == false){
    contarTiempo();
    temporizador = true;
  }

  numeroDestapados++;
  console.log(numeroDestapados);

  if (numeroDestapados == 1){
  
    muestra1 = document.getElementById(id);
    primerResultado = numeros[id];
    muestra1.innerHTML = `<img src="./img/${primerResultado}.png" alt="">`;
    muestra1.disabled = true; 

  }else if(numeroDestapados == 2){
    muestra2 = document.getElementById(id);
    segundoResultado = numeros[id];
    muestra2.innerHTML =  `<img src="./img/${segundoResultado}.png" alt="">`;
    muestra2.disabled = true;

    movimientos++;
    mostrarMov.innerHTML = `Movimientos: ${movimientos}`;

    if(primerResultado == segundoResultado){
      numeroDestapados =0;

      aciertos++;
      mostrarAci.innerHTML = `Aciertos: ${aciertos}`;

      if(aciertos == 10){
        clearInterval(tiempoReg);
        mostrarAci.innerHTML = `Aciertos: ${aciertos}🎉🥳`;
        mostrarTiem.innerHTML = `Genial: 🥳Lo lograste en ${timerIn - timer} segundos`;
        mostrarMov.innerHTML = `Movimientos: ${movimientos}🤘🏻🙀`
      }

    }else{
      setTimeout(()=>{
        muestra1.innerHTML = ' ';
        muestra2.innerHTML = ' ';
        muestra1.disabled = false;
        muestra2.disabled = false;
        numeroDestapados = 0;
      },700);
    }
  }
}


const botonRegresar = document.getElementById('retornar');
botonRegresar.addEventListener('click', function() {
  window.location.href = '../index.html';
});