//ENTORNOvar g=1.622;var dt=0.016683;var timer=null;var timerFuel=null;var aterrizado=null;//NAVEvar y=10; // altura inicial y0=10%, debe leerse al iniciar si queremos que tenga alturas diferentes dependiendo del dispositivovar v=0;var c=100;var a=g; //la aceleración cambia cuando se enciende el motor de a=g a a=-g (simplificado)//MARCADORESvar velocidad=null;var altura=null;var combustible=null;//al cargar por completo la página...window.onload=function(){//captura si el dispositivo recibe eventos ontouch (SMARTPHONE)function is_touch_device(){if ('ontouchstart' in window){document.getElementById("boton").style.display="inline-block";}}is_touch_device();//Variablesvelocidad=document.getElementById("velocidad");altura=document.getElementById("altura");combustible=document.getElementById("fuel");//Botones play/pausedocument.getElementById("play").onclick=function(){play();};document.getElementById("pause").onclick=function(){pause();};//Boton reiniciodocument.getElementById("reset").onclick=function(){reiniciarJuego();};//definición de eventos//mostrar menú móvil document.getElementById("showm").onclick=function (){document.getElementsByClassName("c")[0].style.display="block";stop();}//ocultar menú móvildocument.getElementById("hidem").onclick=function (){document.getElementsByClassName("c")[0].style.display="none";start();}//encender/apagar al apretar/soltar una tecladocument.onkeydown=motorOn;document.onkeyup=motorOff;//Empezar a mover la nave justo después de cargar la páginastart();//Boton táctil para smartphone!var botonSmartphone=document.getElementById("boton");botonSmartphone.addEventListener("touchstart", handlerFunction, false);botonSmartphone.addEventListener("touchend", endingFunction, false);function handlerFunction(event){motorOn();}function endingFunction(event){motorOff();}}//Definición de funcionesfunction start(){//cada intervalo de tiempo mueve la navetimer=setInterval(function(){moverNave();}, dt*1000);}function stop(){clearInterval(timer);}function moverNave(){//cambiar velocidad y posicionv +=a*dt;y +=v*dt;//actualizar marcadoresvelocidad.innerHTML=v.toFixed(2);altura.innerHTML=y.toFixed(2);//mover hasta que top sea un 70% de la pantallaif (y<71){document.getElementById("nave").style.top=y+"%";}else{stop();aterrizado=true;finalizarJuego();}}function motorOn(){//el motor da aceleración a la navea=-g;//mientras el motor esté activado gasta combustibleif (timerFuel==null){document.getElementById("imgNave").src="img/GIFnave.gif";timerFuel=setInterval(function(){actualizarFuel();}, 10);}if (c==0){//para que el motor se pare cuando la gasolina este en 0motorOff();}if (aterrizado){//para que el motor se pare una vez la nave aterrizamotorOff();}}function motorOff(){document.getElementById("imgNave").src="img/nave1.png";a=g;clearInterval(timerFuel);timerFuel=null;}function actualizarFuel(){//Restamos combustible hasta que se agotac-=0.1;if (c < 0 ) c=0;combustible.innerHTML=c.toFixed(2);}//Botones play pausefunction play(){stop();start();document.getElementById("play").style.display="none";document.getElementById("pause").style.display="inline-block";}function pause(){stop();document.getElementById("pause").style.display="none";document.getElementById("play").style.display="inline-block";}//Función game over y victoriafunction finalizarJuego(){if (v>5){document.getElementById("gameOver").style.display="inline-block";}else{document.getElementById("userWin").style.display="inline-block";}}//Botón reiniciofunction reiniciarJuego(){stop();document.getElementById("play").style.display="none";document.getElementById("pause").style.display="inline-block";y=10; g=1.622;a=g;dt=0.016683;c=100;v=0;//document.getElementById("fuel").innerHTML=100;start();}
