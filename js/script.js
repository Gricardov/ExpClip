$(document).ready(function () {

	$("#btnIniciar").click(function () {

		// Primero compruebo que los campos estén llenos
		if ($('#codigoSujeto').val() == "" || $('#edadSujeto').val() == "") {

			alert("Hay campos vacíos")

		} else {

			// Primero lo primero. Debe mostrarse el marco y ocultarse la pantalla de inicio	
			$("#inicio").hide();
			$("#marco").show();

			// Datos del usuario
			const codigoSujeto = $('#codigoSujeto').val();
			const edadSujeto = $('#edadSujeto').val();
			const sexoSujeto = $('input[name=sexo]:checked').val();

			// Valores de inicialización. SE PUEDEN MODIFICAR

			// Para el cronómetro
			const cronometroMinutos = 0;
			const cronometroSegundos = 2;

			// Tipos de aparición (no tocar). MANCHA=1 y SIRENA=2
			const MANCHA = 1;
			const SIRENA = 2;

			// Información sobre las apariciones (formato: [Segundos de aparición, tipo de aparición])
			const infoimg1 = [[15, MANCHA], [35, SIRENA], [60, SIRENA], [90, MANCHA]];
			const infoimg2 = [[15, SIRENA], [35, MANCHA], [60, MANCHA], [90, SIRENA]];
			const infoimg3 = [[15, MANCHA], [35, SIRENA], [60, MANCHA], [90, SIRENA]];
			const infoimg4 = [[15, SIRENA], [35, MANCHA], [60, SIRENA], [90, MANCHA]];
			const infoimg5 = [[15, MANCHA], [35, MANCHA], [60, SIRENA], [90, SIRENA]];
			const infoimg6 = [[15, SIRENA], [35, SIRENA], [60, MANCHA], [90, MANCHA]];
			const infoimg7 = [[15, MANCHA], [35, MANCHA], [60, SIRENA], [90, SIRENA]];
			const infoimg8 = [[15, MANCHA], [35, SIRENA], [60, SIRENA], [90, MANCHA]];

			// Tiempos de transición para el desplazamiento del círculo y el cuadrado hacia el clip
			const transicionCirculo = 1;
			const transicionCuadrado = 2;

			// Tiempo de retraso para que se oculte la mancha, se reinicie el clip, se detenga las transiciones y se muestren las figuras después de que la figura llegue al clip (ms)
			const retrasoCirculo = 500;
			const retrasoCuadrado = 4000;

			const retrasoDetieneTemblorImagenAV = 500;
			const retrasoDetieneTemblorImagenAN = 4000;

			// Ancho y alto que se debe restar de la posición central del puntero para que se muestre la marca de selección (px)
			const toleranciaPuntero = 10;

			// Radio de la selección (px)
			const radioSeleccion = 20;

			// Propociones de las coordenadas de todas las imágenes (Se tocan si sabes como hacerlo). Dado que su último parámetro (verdadero y falso) pueden cambiar, son declarados como var
			// Formato: [xinicial, yinicial, xfinal, yfinal, encontrado]
			var infodifimg1 = [[68.67, 28, 70.12, 30.33, 0], [81.08, 29, 82.83, 30.16, 0], [74.53, 55.66, 75.52, 58, 0], [69.36, 63.50, 74.53, 70.16, 0], [82.37, 60, 84.90, 64.5, 0]];
			var infodifimg2 = [[74.41, 4.66, 77.65, 7.33, 0], [59.31, 43.5, 66.77, 46.5, 0], [74.61, 58.5, 80.09, 63.16, 0], [55.05, 82.83, 58.40, 87.5, 0], [68.82, 91.33, 72.17, 93.33, 0]];
			var infodifimg3 = [[62.28, 36.83, 66.08, 40.33, 0], [82.29, 42.83, 83.21, 45.5, 0], [91.81, 34, 92.57, 36.33, 0], [72.48, 48.33, 73.24, 54.66, 0], [62.51, 88.66, 63.04, 91.5, 0]];
			var infodifimg4 = [[79.1, 18, 83.05, 24.5, 0], [74.23, 29.33, 75.22, 32, 0], [60.15, 55, 63.65, 62.83, 0], [73.39, 57, 75.90, 62.8, 0], [77.58, 65.33, 78.11, 66.83, 0]];
			var infodifimg5 = [[70.12, 23.5, 76.21, 31.16, 0], [87.32, 30.5, 89.83, 33.33, 0], [73.62, 59.16, 74.91, 60.33, 0], [94.17, 81.33, 98.73, 84.33, 0], [52.39, 58.33, 58.47, 66.33, 0]];
			var infodifimg6 = [[63.34, 37.66, 64.26, 39.83, 0], [70.57, 51.33, 71.79, 54.83, 0], [77.73, 51.33, 78.34, 52.66, 0], [64.94, 85.5, 65.70, 87.33, 0], [86.25, 88.5, 88.99, 90, 0]];
			var infodifimg7 = [[73.77, 23.83, 80.47, 26.66, 0], [65.78, 28.83, 68.21, 35, 0], [52.92, 33.16, 59.23, 46.83, 0], [61.90, 43.83, 65.09, 50.66, 0], [69.51, 69.50, 74.30, 78, 0], [80.01, 80, 88.99, 86, 0], [75.06, 87.83, 86.71, 96.66, 0], [82.52, 53.5, 86.78, 62.83, 0]];
			var infodifimg8 = [[71.87, 2, 74.07, 15.83, 0], [74.30, 32.5, 77.5, 40.33, 0], [71.56, 50.83, 74.68, 56.5, 0], [96.53, 31.5, 99.42, 39.16, 0], [83.89, 62.16, 86.33, 66.16, 0]];
			//var infodifimg8=[[71.87,2,74.07,15.83,0],[74.30,32.5,77.5,40.33,0],[71.56,50.83,74.68,56.5,0],[96.53,31.5,99.42,39.16,0],[70.57,71.50,89.45,96,0]];

			// Variables y constantes del programa, NO SE TOCAN

			// Constantes del programa que representan órdenes en los arreglos de datos

			// Índices de arreglos de información de proporción de posición de coordenadas
			const PROPXINIC = 0;
			const PROPYINIC = 1;
			const PROPXFIN = 2;
			const PROPYFIN = 3;
			const ENCONTRADO = 4;

			// Índices de arreglo para obtener la información sobre los clics del usuario [DÓNDE, NIMAGEN, MINUTOS, SEGUNDOS]
			const NIMAGEN = 0;
			const DONDE = 1;
			const MINUTOS = 2;
			const SEGUNDOS = 3;

			// Arreglo que contiene las informaciones sobre los clics del usuario. A este arreglo se van agregando nuevos arreglos en tiempo de ejecución
			var arregloInfoSujeto = [];

			// Arreglo que contiene información de las apariciones y los tiempos
			var arregloInfo = [infoimg1, infoimg2, infoimg3, infoimg4, infoimg5, infoimg6, infoimg7, infoimg8];

			//Arreglo que contiene información de las proporciones en las que se encuentran las diferencias de las imágenes
			var arregloPropDif = [infodifimg1, infodifimg2, infodifimg3, infodifimg4, infodifimg5, infodifimg6, infodifimg7, infodifimg8];

			// Constantes que representan a los valores verdadero y falso
			const FALSO = 0;
			const VERDADERO = 1;

			// Constantes que representan a los elementos cuadrado, círculo, altavoz verde y altavoz naranja. Por estándar, estos valores servirán para traducir los archivos a un .txt
			const CUADRADO = 1;
			const CIRCULO = 2;
			const AV = 3;
			const AN = 4;

			// Número de imagen actual. Se usa en el arreglo, no puede ser 0. Mínimo 1
			var imgActual = 1;

			// Estado actual de la mancha y la sirena
			var mostrandoMancha = false;
			var temblandoImagen = false;
			var sonandoSirena = false;
			var sonandoAltavozVerde = false;
			var sonandoAltavozNaranja = false;

			// Validan si se está ejecutando alguna transición
			var enTransicionCirculo = false;
			var enTransicionCuadrado = false;

			// Guarda el número de marcas realizadas en cada imagen. Estos se usarán como id para borrarlas al final y reiniciar el contador
			var numMarcasActuales = 1;

			// Variables del cronómetro
			var minutosTranscurridos;
			var segundosTranscurridos;

			// Inicia el cronómetro	
			iniciarCronometro();

			function iniciarCronometro() {

				// Lo inicio con el tiempo establecido
				minutosTranscurridos = cronometroMinutos;
				segundosTranscurridos = cronometroSegundos;

				// Obtengo el arreglo de informaciones sobre apariciones, dependiendo de la imagen en que se encuentre
				var infoimg = arregloInfo[imgActual - 1];

				/*
				// Calcula a cuántos minutos y segundos equivalen los segundos especificados
				var minuto_mancha=Math.floor(tiempo_aparicion_mancha/60);
				var segundo_mancha=Math.round(((tiempo_aparicion_mancha/60)-(minuto_mancha))*60);
				*/

				// Actualiza el contador cada segundo
				var x = setInterval(function () {

					if (segundosTranscurridos == -1) {

						minutosTranscurridos--;
						segundosTranscurridos = 59;

					}

					// Muestra el resultado en el div
					$("#txtcronometro").text(minutosTranscurridos + "m " + segundosTranscurridos + "s ");

					//Verifica si ya es tiempo de mostrar la mancha o la sirena.
					determinarAccion(minutosTranscurridos, segundosTranscurridos, infoimg);

					// Si termina, que realice una acción
					if (minutosTranscurridos == 0 && segundosTranscurridos == 0) {

						clearInterval(x);

						if (arregloInfo.length >= (imgActual + 1)) {
							//document.getElementById("cronometro").innerHTML = "Listo";
							siguienteImagen();

						} else {
							// Si entra aquí, significa que ya terminó de iterar todas las imágenes. Por lo tanto, es momento de ocultar el marco actual y mostrar la ventana final
							$("#marco").hide();
							$("#fin").show();

						}



						// Siempre borro las marcas que el usuario ha hecho
						borrarMarcas();
					}

					segundosTranscurridos--;

				}, 1000);

			}

			function determinarAccion(minutos, segundos, infoimg) {

				for (i = 0; i < infoimg.length; i++) {

					// Obtengo el arreglo actual
					var arrayactual = infoimg[i];

					// Obtengo el tiempo en segundos
					var segundosaparicion = arrayactual[0];

					// Calculo si ya es tiempo de mostrar algo
					if ((cronometroSegundos + (cronometroMinutos * 60)) - (segundos + (minutos * 60)) == segundosaparicion) {

						// Si ya es tiempo de mostrar algo, obtengo el tipo de aparición
						var tipoaparicion = arrayactual[1];

						if (tipoaparicion == MANCHA) {

							mostrarMancha();

						} else {

							sonarSirenaYTemblarImagen();

						}


					}

				}

			}

			function agregarInfoSujeto(donde, minutos, segundos) {

				arregloInfoSujeto.push([imgActual, donde, minutos, segundos + 1]);

			}

			function generarArchivo() {
				//alert(arregloInfoSujeto);

				var descripcion = "Datos: \r\n \r\n";
				descripcion += "Código asignado: " + codigoSujeto + "\r\n";
				descripcion += "Edad: " + edadSujeto + "\r\n";
				descripcion += "Sexo: " + sexoSujeto + "\r\n \r\n";

				// Para poder separar por subtitulos los números de imágenes, creo una variable numimgrep que siempre va a tener el primer valor del arreglo	

				if (arregloInfoSujeto[0]) {

					var numimgrep = arregloInfoSujeto[0][NIMAGEN];

					descripcion += "Imagen " + numimgrep + ": \r\n \r\n";

					// Itero el arreglo arregloInfoSujeto para obtener la información
					for (i = 0; i < arregloInfoSujeto.length; i++) {

						// Obtengo los valores del arreglo actual
						var numimg = arregloInfoSujeto[i][NIMAGEN];
						var donde = arregloInfoSujeto[i][DONDE];
						var minutos = arregloInfoSujeto[i][MINUTOS];
						var segundos = arregloInfoSujeto[i][SEGUNDOS];

						if (numimgrep != numimg) {

							// Coloco un nuevo subtítulo de imagen	
							descripcion += "\r\n" + "Imagen " + numimg + ": \r\n \r\n";
							numimgrep = numimg;

						}

						descripcion += minutos + "m : " + segundos + "s -> Clic en ";

						switch (donde) {

							case CUADRADO:
								descripcion += "cuadrado";
								break;

							case CIRCULO:
								descripcion += "círculo";
								break;

							case AV:
								descripcion += "altavoz verde";
								break;

							default:
								descripcion += "altavoz naranja";

						}

						descripcion += "\r\n";

					}
				} else {
					descripcion+="El sujeto no presionó ningún control"
				}
				var blob = new Blob([descripcion], { type: "text/plain;charset=utf-8" });
				saveAs(blob, "sujeto.txt");


			}


			// Animaciones y gráficos

			function siguienteImagen() {

				// Actualizo el contador
				imgActual++;

				// Actualizo la imagen de las diferencias

				$("#imgimagen").attr("src", "img/" + imgActual + ".jpg");

				// Vuelvo a iniciar el cronómetro
				iniciarCronometro();

				//alert("Siguiente");

			}

			function mostrarMancha() {

				if (!mostrandoMancha) {

					$("#imgmancha").show();
					//$("#imgmancha").css("z-index","3");
					mostrandoMancha = true;

				}

			}

			function ocultarMancha() {

				if (mostrandoMancha) {
					$("#imgmancha").hide();
					mostrandoMancha = false;

				}

			}

			function ocultarManchaReiniciarClipDetenerTransicionMostrarCuadradoDespuesDe(despuesDeMs) {

				//if (mostrandoMancha){

				setTimeout(function () {

					$("#imgmancha").hide();
					mostrandoMancha = false;

					//Reinicio el clip			
					mostrarSerio();

					//Indico que la transición ya terminó
					enTransicionCuadrado = false;

					mostrarCuadrado();

				}, despuesDeMs);

				//}

			}

			function ocultarManchaReiniciarClipDetenerTransicionMostrarCirculoDespuesDe(despuesDeMs) {

				//if (mostrandoMancha){

				setTimeout(function () {

					$("#imgmancha").hide();
					mostrandoMancha = false;

					//Reinicio el clip			
					mostrarSerio();

					//Indico que la transición ya terminó
					enTransicionCirculo = false;

					mostrarCirculo();

				}, despuesDeMs);

				//}

			}

			function ocultarReiniciarCirculo() {

				x = 0;
				y = 0;

				$("#circulo").css({
					'-webkit-transform': 'translate(' + x + 'px,' + y + 'px)',
					'-moz-transform': 'translate(' + x + 'px,' + y + 'px)',
					'-ms-transform': 'translate(' + x + 'px,' + y + 'px)',
					'-o-transform': 'translate(' + x + 'px,' + y + 'px)',
					'transform': 'translate(' + x + 'px,' + y + 'px)',
					'transition': 'none',
					'visibility': 'hidden'

				});

			}

			function ocultarReiniciarCuadrado() {

				x = 0;
				y = 0;

				$("#cuadrado").css({
					'-webkit-transform': 'translate(' + x + 'px,' + y + 'px)',
					'-moz-transform': 'translate(' + x + 'px,' + y + 'px)',
					'-ms-transform': 'translate(' + x + 'px,' + y + 'px)',
					'-o-transform': 'translate(' + x + 'px,' + y + 'px)',
					'transform': 'translate(' + x + 'px,' + y + 'px)',
					'transition': 'none',
					'visibility': 'hidden'

				});

			}

			function mostrarCirculo() {

				// Lo vuelvo visible			
				$("#circulo").css('visibility', 'visible');

			}

			function mostrarCuadrado() {

				// Lo vuelvo visible			
				$("#cuadrado").css('visibility', 'visible');

			}

			function sonarSirenaYTemblarImagen() {

				if (!sonandoSirena) {

					$("#sonidoSirena")[0].play();

					sonandoSirena = true;

					temblarImagen();
				}
			}

			function detenerSirena() {

				if (sonandoSirena) {

					$("#sonidoSirena")[0].pause();
					$("#sonidoSirena")[0].currentTime = 0;
					sonandoSirena = false;
				}
			}

			function sonarAltavozVerde() {

				$("#sonidoAltavozVerde")[0].play();
				sonandoAltavozVerde = true;


			}

			function sonarAltavozNaranja() {

				$("#sonidoAltavozNaranja")[0].play();
				sonandoAltavozNaranja = true;

			}


			function detenerAltavoces() {

				if (sonandoAltavozVerde) {

					$("#sonidoAltavozVerde")[0].pause();
					$("#sonidoAltavozVerde")[0].currentTime = 0;
					sonandoAltavozVerde = false;
				}

				if (sonandoAltavozNaranja) {

					$("#sonidoAltavozNaranja")[0].pause();
					$("#sonidoAltavozNaranja")[0].currentTime = 0;
					sonandoAltavozNaranja = false;
				}

			}

			function temblarImagen() {

				$("#imgimagen").effect("shake", { direction: "up", times: 20, distance: 10 }, 500, function () {

					// Tiembla la imagen mientras esté sonando la sirena o la variable temblandoImagen sea verdadera
					if (temblandoImagen || sonandoSirena) {
						temblarImagen();
						temblandoImagen = true;
					}

				});

			}

			function detenerTemblarImagenDespuesDeMs(despuesDeMs) {

				// Solo cambia el valor de temblando imagen después de cierto tiempo para que sea leída por temblarImagen()
				setTimeout(function () {

					temblandoImagen = false;
					temblandoImagen = false;
					temblandoImagen = false;

				}, despuesDeMs);

			}

			function mostrarAlegre() {

				//Cambio la imagen del clip
				$("#imgclip").attr("src", "img/clipalegre.png");

				/*
				setTimeout(function(){
				
				mostrarSerio();
			  
				},durante*1000);
				*/
			}

			function mostrarSerio() {

				//Cambio la imagen del clip
				$("#imgclip").attr("src", "img/clip.png");

			}

			function mostrarTriste() {

				//Cambio la imagen del clip
				$("#imgclip").attr("src", "img/cliptriste.png");

				/*
				setTimeout(function(){
				
				mostrarSerio();
			  
				},durante*1000);
				*/
			}

			function borrarMarcas() {

				for (i = 0; i < numMarcasActuales; i++) {

					$("#mark" + (i + 1)).remove();

				}

				// Reinicio el contador de marcas actuales
				numMarcasActuales = 0;
			}

			// Cálculos

			// Calcula la posición exacta el elemento pasado como parámetro
			function posicionExacta(el) {
				var xPos = 0;
				var yPos = 0;

				while (el) {
					if (el.tagName == "BODY") {
						// deal with browser quirks with body/window/document and page scroll
						var xScroll = el.scrollLeft || document.documentElement.scrollLeft;
						var yScroll = el.scrollTop || document.documentElement.scrollTop;

						xPos += (el.offsetLeft - xScroll + el.clientLeft);
						yPos += (el.offsetTop - yScroll + el.clientTop);
					} else {
						// for all other non-BODY elements
						xPos += (el.offsetLeft - el.scrollLeft + el.clientLeft);
						yPos += (el.offsetTop - el.scrollTop + el.clientTop);
					}

					el = el.offsetParent;
				}
				return {
					x: xPos,
					y: yPos
				};
			}

			// Calcula si las proporciones indicadas se encuentran dentro de algún límite de la imagen actual para poder seleccionar una diferencia
			function contieneDiferencias(propAncho, propAlto) {

				//Obtengo el arreglo actual
				var infodifimg = arregloPropDif[imgActual - 1];

				for (i = 0; i < infodifimg.length; i++) {

					// Obtengo el arreglo de números que contienen las proporciones
					var infodif = infodifimg[i];

					// Primero pregunto si se encuentra dentro de los límites del eje X
					if (propAncho >= infodif[PROPXINIC] && propAncho <= infodif[PROPXFIN]) {

						// Si entra aquím es porque se encuentra dentro de los límites de X, ahora hay que preguntar para el eje Y
						if (propAlto >= infodif[PROPYINIC] && propAlto <= infodif[PROPYFIN]) {

							// Se encontró la diferencia. Ahora se pregunta si ha sido marcada como encontrada
							if (infodif[ENCONTRADO] == FALSO) {

								infodif[ENCONTRADO] = VERDADERO;

								return true;

							} else {
								// Si la diferencia ya había sido encontrada, que devuelva false de una, así no hacemos trabajar de más a la máquina
								return false;

							}
						}

					}



				}
				return false;
			}


			// Timeouts



			// Listeners

			$("#circulo").click(function () {

				// Valido si no hay una transición del cuadrado ya en marcha
				if (!enTransicionCirculo) {

					// Manipula la variable enTransicionCirculo hasta el tiempo en que la transición debería terminar
					enTransicionCirculo = true;

					// Obtengo el elemento origen y el objetivo     
					var objetivo = document.querySelector("#imgclip");

					var origen = document.querySelector("#circulo");

					// Obtengo sus posiciones reales  
					var posobj = posicionExacta(objetivo);

					var posorig = posicionExacta(origen);

					// Calculo la diferencias entre sus posiciones para indicar la distancia a recorrer. Para posicionarlo en el centro uso (W-w)/2 y (H-h)/2

					var x = (posobj.x - posorig.x) + ((objetivo.clientWidth - origen.clientWidth) / 2);
					var y = (posobj.y - posorig.y) + ((objetivo.clientHeight - origen.clientHeight) / 2);

					$(this).css({
						'-webkit-transform': 'translate(' + x + 'px,' + y + 'px)',
						'-moz-transform': 'translate(' + x + 'px,' + y + 'px)',
						'-ms-transform': 'translate(' + x + 'px,' + y + 'px)',
						'-o-transform': 'translate(' + x + 'px,' + y + 'px)',
						'transform': 'translate(' + x + 'px,' + y + 'px)',
						'transition': 'all ' + transicionCirculo + 's ease'

					});

					// Y agrego la información
					agregarInfoSujeto(CIRCULO, minutosTranscurridos, segundosTranscurridos);

					setTimeout(function () {
						// Muestro el clip triste
						mostrarTriste();

						// Oculto la mancha después de un tiempo
						ocultarManchaReiniciarClipDetenerTransicionMostrarCirculoDespuesDe(retrasoCirculo);

						ocultarReiniciarCirculo();


					}, transicionCirculo * 1000);
				}
			});

			$("#cuadrado").click(function () {

				// Valido si no hay una transición del cuadrado ya en marcha
				if (!enTransicionCuadrado) {

					// Manipula la variable enTransicionCuadrado hasta el tiempo en que la transición debería terminar
					enTransicionCuadrado = true;

					// Obtengo el elemento origen y el objetivo     
					var objetivo = document.querySelector("#imgclip");

					var origen = document.querySelector("#cuadrado");

					// Obtengo sus posiciones reales  
					var posobj = posicionExacta(objetivo);

					var posorig = posicionExacta(origen);

					// Calculo la diferencias entre sus posiciones para indicar la distancia a recorrer. Para posicionarlo en el centro uso (W-w)/2 y (H-h)/2

					var x = (posobj.x - posorig.x) + ((objetivo.clientWidth - origen.clientWidth) / 2);
					var y = (posobj.y - posorig.y) + ((objetivo.clientHeight - origen.clientHeight) / 2);

					$(this).css({
						'-webkit-transform': 'translate(' + x + 'px,' + y + 'px)',
						'-moz-transform': 'translate(' + x + 'px,' + y + 'px)',
						'-ms-transform': 'translate(' + x + 'px,' + y + 'px)',
						'-o-transform': 'translate(' + x + 'px,' + y + 'px)',
						'transform': 'translate(' + x + 'px,' + y + 'px)',
						'transition': 'all ' + transicionCuadrado + 's ease'
					});

					// Y agrego la información
					agregarInfoSujeto(CUADRADO, minutosTranscurridos, segundosTranscurridos);

					setTimeout(function () {

						// Muestro el clip alegre
						mostrarAlegre();

						// Oculto la mancha después de un tiempo
						ocultarManchaReiniciarClipDetenerTransicionMostrarCuadradoDespuesDe(retrasoCuadrado);

						ocultarReiniciarCuadrado();

					}, transicionCuadrado * 1000);
				}
			});

			$("#av").click(function () {

				// Primero va este método porque verifica si la sirena está sonando en ese momento
				detenerTemblarImagenDespuesDeMs(retrasoDetieneTemblorImagenAV);
				detenerSirena();
				sonarAltavozVerde();

				// Muestro el clip triste
				mostrarTriste();

				// Y agrego la información
				agregarInfoSujeto(AV, minutosTranscurridos, segundosTranscurridos);

			});

			$("#an").click(function () {

				// Primero va este método porque verifica si la sirena está sonando en ese momento
				detenerTemblarImagenDespuesDeMs(retrasoDetieneTemblorImagenAN);
				detenerSirena();
				sonarAltavozNaranja();

				// Muestro el clip alegre
				mostrarAlegre();

				// Y agrego la información
				agregarInfoSujeto(AN, minutosTranscurridos, segundosTranscurridos);
			});

			// Detecta cuando se presiona la imagen principal para poder verificar sus coordenadas y pintar los puntitos
			$("#imgimagen").click(function (e) {

				// Solo se va a poder pintar si la mancha no se está mostrando
				if (!mostrandoMancha) {

					var posX = $(this).offset().left, posY = $(this).offset().top;

					// Obtengo las posiciones relativas de la imagen
					var posrelx = (e.pageX - posX);
					var posrely = (e.pageY - posY);

					var anchoactual = $(this).outerWidth();
					var altoactual = $(this).outerHeight();

					// Con estos datos, obtengo las proporciones		 
					var propAncho = (posrelx * 100 / anchoactual);
					var propAlto = (posrely * 100 / altoactual);

					//alert("proporción ancho: "+(posrelx*100/anchoactual)+"% proporción alto "+(posrely*100/altoactual)+"%");
					numMarcasActuales++;

					// Pregunto si la selección actual está dentro de las proporciones indicadas por la variable arregloPropDif
					if (contieneDiferencias(propAncho, propAlto)) {

						// Si lo está, pinta las marcas sobre la imagen		
						mark = $("<span>").css({
							'position': 'absolute',
							'border': 'solid 2px black',
							'border-radius': '20px',
							'content:': '\25CF',
							'background-color': 'red',
							'width': radioSeleccion + 'px',
							'height': radioSeleccion + 'px',
							'z-index': '3',
							top: e.pageY - toleranciaPuntero,
							left: e.pageX - toleranciaPuntero
						});

						$(mark).attr('id', "mark" + numMarcasActuales);
						$(mark).addClass('mark');
						$(mark).css('display', 'none');
						$("#marco").append(mark);
						$(mark).hover(mark_focus, mark_unfocus);
						$(mark).show('slow');

					}
				}

			});

			function mark_focus(e) {
				$(this).addClass('focused-mark');

			}

			function mark_unfocus(e) {
				$(this).removeClass('focused-mark');

			}

			// Detecta cuando se pulsa el botón de descarga para generar el archivo
			$("#descarga").click(function (e) {
				generarArchivo();

			});

			// Detecta cuando los sonidos terminan de reproducirse
			$("#sonidoSirena").on("ended", function () {
				sonandoSirena = false;
			});

			$("#sonidoAltavozVerde").on("ended", function () {
				mostrarSerio();
			});

			$("#sonidoAltavozNaranja").on("ended", function () {
				mostrarSerio();
			});

		}
	});
});