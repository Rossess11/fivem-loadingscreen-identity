PlayerData = {}

function fadeIn(el, time) {
	el.style.opacity = 0;
  
	var last = +new Date();
	var tick = function() {
	  el.style.opacity = +el.style.opacity + (new Date() - last) / time;
	  last = +new Date();
  
	  if (+el.style.opacity < 1) {
		(window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 16);
	  }
	};
  
	tick();
}

function notificar(texto){
    var contenedorTabla = document.getElementById('notificacion');
    contenedorTabla.innerHTML = "";
    var tabla = '<i class="fa-solid fa-envelope" style="padding-right: 6px; vertical-align: center;"></i><hr>' + texto;
    contenedorTabla.innerHTML = tabla;
  document.getElementById('notificacion').animate([
    // fotogramas clave
    { transform: 'translateY(-200px)' },
    { transform: 'translateY(0px)' }
  ], {
    // opciones de sincronización
    duration: 1000
  });
  setTimeout(() => {
    document.getElementById('notificacion').style.display = 'flex';
  }, 100);
  setTimeout(() => {
    document.getElementById('notificacion').animate([
      // fotogramas clave
      { transform: 'translateY(0px)' },
      { transform: 'translateY(-200px)' }
    ], {
      // opciones de sincronización
      duration: 800
    });
  }, 2500);
  setTimeout(() => {
    document.getElementById('notificacion').style.display = 'none';
  }, 2900);
}

var audio = document.getElementById('ad');

$(function() {
	window.addEventListener('message', function(event) {
		if (event.data.type == "enableui") {
			document.getElementById('mainn').focus();
			if(event.data.enable==true){
				//audio.play();
				if(event.data.don == true){
					document.getElementById('load-personaje').style.display = 'flex';
				}else{
					document.getElementById('add-personaje').style.display = 'flex';
				}
				document.getElementById('mainn').style.display = 'flex';
				var el = document.getElementById('mainn');
				fadeIn(el, 1500);
			}
			if(event.data.enable==false){
				document.getElementById('mainn').style.opacity = "0";
				setTimeout(() => {
					document.getElementById('mainn').style.display = 'none';
					audio.pause();
					$.post('http://ros_identity/closeUi', JSON.stringify({
						action: true
					}));
				}, 2000);
			}
		}
		if(event.data.type=="collectdata") {
			document.getElementById('load-personaje-nombre').textContent = event.data.info.firstname + " " + event.data.info.lastname;
			if(event.data.info.sex=="m"){
				document.getElementById('load-personaje-genero').textContent = "Genero: Hombre"
			}else{
				document.getElementById('load-personaje-genero').textContent = "Genero: Mujer"
			}
			document.getElementById('load-personaje-nacimiento').textContent = "F.Nacimiento: " + event.data.info.dateofbirth;
			document.getElementById('load-personaje-trabajo').textContent = "Trabajo: " + event.data.info.job;
			document.getElementById('load-personaje-cuenta').textContent = "Banco: " + event.data.info.money + "$";
			
		}
	});

	document.onkeyup = function (data) {
		if (data.which == 27) { // Escape key
			$.post('http://ros_identity/escape', JSON.stringify({}));
		}
	};

	// Botone 
	$("#accept").click(function() {
        var date = $("#dateofbirth").val();
		var dateCheck = new Date($("#dateofbirth").val());

		if (dateCheck == "Invalid Date") {
			date == "invalid";
		}

		$.post('http://ros_identity/register', JSON.stringify({
			firstname: $("#firstname").val(),
			lastname: $("#lastname").val(),
			dateofbirth: date,
			sex: $(".sex:checked").val(),
			height: $("#height").val()
		}));
    });

	$("#load").click(function() {
		$.post('http://ros_identity/closeUidep', JSON.stringify({
			action: true
		}));
    });

	$("#discord").click(function() {
		notificar("Encuentra las ultimas novedades en nuestro discord");
    });

	$("#programador").click(function() {
        notificar("Programado por Rossess Development");
    });

	$("#cerrar-pdf").click(function() {
		document.getElementById('pdff').style.opacity = '0';
		document.getElementById('cerrar-pdf').style.opacity = '0';
		setTimeout(() => {
			document.getElementById('pdff').style.display = 'none';
			document.getElementById('cerrar-pdf').style.display = 'none';
		}, 2000);
    });

	$("#normativa").click(function() {
		document.getElementById('pdff').style.display = 'flex';
		document.getElementById('cerrar-pdf').style.display = 'flex';
        var el = document.getElementById('pdff');
		fadeIn(el, 1500);
		var al = document.getElementById('cerrar-pdf');
		fadeIn(al, 1500);
    });

	$("#add-personaje").click(function() {
		document.getElementById('add-personaje-menu').style.display = 'flex';
		var el = document.getElementById('add-personaje-menu');
		fadeIn(el,1500);
    });
});


