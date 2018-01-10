
//ENTORNO
var g = 1.622;
var dt = 0.016683;
var timer=null;
var timerFuel=null;
var aterrizado=null;
//NAVE
var y = 10; // altura inicial y0=10%, debe leerse al iniciar si queremos que tenga alturas diferentes dependiendo del dispositivo
var v = 0;
var c = 100;
var a = g; //la aceleración cambia cuando se enciende el motor de a=g a a=-g (simplificado)
//MARCADORES
var velocidad = null;
var altura = null;
var combustible = null;

//al cargar por completo la página...
window.onload = function(){
	
	velocidad = document.getElementById("velocidad");
	altura = document.getElementById("altura");
	combustible = document.getElementById("fuel");
	//Botones play/pause
	document.getElementById("play").onclick=function(){play();};
	document.getElementById("pause").onclick=function(){pause();};
	//Boton reinicio
	document.getElementById("reset").onclick=function(){reiniciarJuego();};

	
	//definición de eventos
	//mostrar menú móvil
    	document.getElementById("showm").onclick = function () {
		document.getElementsByClassName("c")[0].style.display = "block";
		stop();
	}
	//ocultar menú móvil
	document.getElementById("hidem").onclick = function () {
		document.getElementsByClassName("c")[0].style.display = "none";
		start();
	}
	//encender/apagar al apretar/soltar una tecla
	document.onkeydown = motorOn;
	document.onkeyup = motorOff;
	
	//Empezar a mover la nave justo después de cargar la página
	start();
}

//Definición de funciones
function start(){
	//cada intervalo de tiempo mueve la nave
	timer=setInterval(function(){ moverNave(); }, dt*1000);
}

function stop(){
	clearInterval(timer);
}

function moverNave(){
	//cambiar velocidad y posicion
	v +=a*dt;
	y +=v*dt;
	//actualizar marcadores
	velocidad.innerHTML=v.toFixed(2);
	altura.innerHTML=y.toFixed(2);
	
	//mover hasta que top sea un 70% de la pantalla
	if (y<71){ 
		document.getElementById("nave").style.top = y+"%"; 
	} else { 
		stop();
		aterrizado=true;
		finalizarJuego();
	}
}
function motorOn(){
	//el motor da aceleración a la nave
	a=-g;
	//mientras el motor esté activado gasta combustible
	if (timerFuel==null){
		document.getElementById("imgNave").src = "img/GIFnave.gif";	
		timerFuel=setInterval(function(){ actualizarFuel(); }, 10);
	}
	if (c == 0){ //para que el motor se pare cuando la gasolina este en 0
		motorOff();
	}

	if (aterrizado){//para que el motor se pare una vez la nave aterriza
		motorOff();
	}
}
function motorOff(){
	document.getElementById("imgNave").src = "img/nave1.png";
	a=g;
	clearInterval(timerFuel);
	timerFuel=null;
}
function actualizarFuel(){
	//Restamos combustible hasta que se agota
	c-=0.1;
	if (c < 0 ) c = 0;
	combustible.innerHTML=c.toFixed(2);	
}

//Botones play pause
function play() {
	stop();
	start();
	document.getElementById("play").style.display="none";
	document.getElementById("pause").style.display="inline-block";
}
function pause() {
	stop();
	document.getElementById("pause").style.display="none";
	document.getElementById("play").style.display="inline-block";
}

//Función game over y victoria
function finalizarJuego() {
	if (v>5) {
		document.getElementById("gameOver").style.display="inline-block";
	} else {
			document.getElementById("userWin").style.display="inline-block";
			}
}

//Botón reinicio
function reiniciarJuego() {
	stop();
	document.getElementById("play").style.display="none";
	document.getElementById("pause").style.display="inline-block";
	y = 10; 
	g = 1.622;
	a = g;
	dt = 0.016683;
	c = 100;
	v = 0;
	document.getElementById("fuel").innerHTML=100;
	start();
}