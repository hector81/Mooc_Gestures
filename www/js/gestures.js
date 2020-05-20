var app = {
    // Application Constructor
	inicio: function() {
		this.iniciaBotones();
		this.iniciaFastClick();
		this.iniciaHammer();
    },
	//manejadores 
    iniciaFastClick: function() {
        FastClick.attach(document.body);//arrancamos el click, attache significa poner dentro del body
    },
	
	iniciaBotones: function() {
        var botonClaro = document.querySelector('#claro');
		var botonOscuro = document.querySelector('#oscuro');
		//addEventListener es un escuchador de elementos, en este caso click y lanza entonces la funcion
		botonClaro.addEventListener('click',this.ponloClaro,false);
		botonOscuro.addEventListener('click',app.ponloOscuro,false);
    },
	
	iniciaHammer: function() {
		//le decimos en que zona actue hammer js
        var zona = document.getElementById('zona-gestos');
        var hammertime = new Hammer(zona);//iniciamos hammer
		//poner las opciones en marcha
		hammertime.get('pinch').set({ enable : true });
		hammertime.get('rotate').set({ enable : true });
		
		//detecta el final de la animacion y le pone al id gestos ninguna clase
		zona.addEventListener('webkitAnimationEnd', function(e){
			zona.className = '';
		});
		
		//activaciones
		hammertime.on('doubletap', function(ev){
			zona.className = 'doubletap';
		});
		
		//activaciones
		hammertime.on('press', function(ev){
			zona.className = 'press';
		});
		
		//activaciones
		hammertime.on('swipe', function(ev){
			var clase = undefined;
			direccion = ev.direction;
			
			if (direccion == 4) clase = 'swipe-derecha';
			if (direccion == 2) clase = 'swipe-izquierda';
			
			zona.className = clase;
		});
		
		//activaciones
		hammertime.on('rotate', function(ev){
			var umbral = 25;
			if (ev.distance > umbral) zona.className = 'rotate';
		});
		
		
    },
	
	//manejadores que cojen el body y le pone background
	//classname es la forma de referirse al class del estilo
    ponloClaro: function() {
        document.body.className = 'claro';
    },
	
	ponloOscuro: function() {
        document.body.className = 'oscuro';
    },
    
};

//app.inicio();//llamamos al inicio

//DomContentLoADED CARGADO EL CONTENIDO DEL DOM (QUE EL CSS Y HTML ESTEN CARGADOS)
//en esta linea nos aseguramos que exista un addEventListener
if('addEventListener' in document){
	document.addEventListener('DOMContentLoaded', function(){
		FastClick.attach(document.body);//arrancamos el click, attache significa poner dentro del body
		app.inicio();//llamamos al inicio
	}, false);
}
