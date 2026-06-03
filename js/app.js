const contenido = document.getElementById("contenido");
let carrito = [];
let pedidoActual = {};
let historialPantallas = [];
let ubicacionCliente = "";

function prepararPantalla(titulo) {
    contenido.innerHTML = `<h2>${titulo}</h2>`;
    const btnRegresar = document.createElement("button");
    btnRegresar.textContent = "⬅ Volver";
    btnRegresar.className = "btn-volver";
    btnRegresar.onclick = () => {
        if (historialPantallas.length > 0) {
            const funcionAnterior = historialPantallas.pop();
            funcionAnterior();
        }
    };
    contenido.appendChild(btnRegresar);
    contenido.appendChild(document.createElement("hr"));
}

function iniciarPedido() {
    contenido.innerHTML = "<h1>Menú Principal</h1>";
    pedidoActual = {}; // Limpiar pedido

    catalogo.productos.forEach(prod => {
        const btn = document.createElement("button");
        btn.textContent = prod;
        btn.onclick = () => {
            if (prod === "Crepas") {
                pedidoActual = { nombre: "Crepa", total: 0, ingredientes: [] };
                historialPantallas = [iniciarPedido];
                seleccionarTamano();
            } 
            else if (prod === "Waffles") {
                pedidoActual = { 
                    nombre: "Waffle", 
                    tamano: "Normal", 
                    tipo: "Dulce", 
                    total: catalogo.waffles.precioBase, 
                    ingredientes: [] 
                };
                historialPantallas = [iniciarPedido];
                seleccionarEspecialidadDulce(); // Salto directo
             } 
             else if (prod === "Papas a la francesa") {
                iniciarComidaRapida();
                }
                else if (prod === "Frappé") {
                iniciarFrappes();
                }
                else if (prod === "Gomyboing") {
                 iniciarGomyboing();
                    }
                    else if (prod === "Chicharrón preparado") {
                 iniciarChicharron();
                    }
                    else if (prod === "Dorilocos") {
                    iniciarDorilocos();
                    }
                    else if (prod === "Maruchan") {
                    iniciarMaruchan();
                    }
                    else if (prod === "Café") {
                    iniciarCafe();
                    }
                    else if (prod === "Otros") {
                    iniciarOtros();
                    }
                    else {
                alert(`El apartado de ${prod} estará disponible pronto.`);
            }
        };
        contenido.appendChild(btn);
    });
    renderCarrito();
}

function seleccionarTamano() {
    prepararPantalla("Selecciona el Tamaño");
    catalogo.crepas.tamanos.forEach(t => {
        const btn = document.createElement("button");
        // Solo mostramos el nombre (Normal o Gigante)
        btn.textContent = `${t.nombre}`; 
        btn.onclick = () => {
            pedidoActual.tamano = t.nombre;
            // No sumamos nada al total todavía, solo guardamos el tamaño
            historialPantallas.push(seleccionarTamano);
            seleccionarTipo();
        };
        contenido.appendChild(btn);
    });
}

function seleccionarTipo() {
    prepararPantalla("¿Qué tipo de crepa?");
    catalogo.crepas.tipos.forEach(tipo => {
        const btn = document.createElement("button");
        btn.textContent = tipo;
        btn.onclick = () => {
            pedidoActual.tipo = tipo;
            historialPantallas.push(seleccionarTipo);
            tipo === "Dulce" ? seleccionarEspecialidadDulce() : seleccionarEspecialidadSalada();
        };
        contenido.appendChild(btn);
    });
}

function seleccionarEspecialidadSalada() {
    prepararPantalla("Especialidades Saladas");
    catalogo.crepas.saladas.forEach(opcion => {
        const btn = document.createElement("button");
        const extraGigante = pedidoActual.tamano === "Gigante" ? 25 : 0;
        const precioFinal = opcion.precio + extraGigante;
        btn.textContent = `${opcion.nombre} ($${precioFinal})`;
        btn.onclick = () => {
            pedidoActual.especialidad = opcion.nombre;
            pedidoActual.total = precioFinal;
            finalizarProducto();
        };
        contenido.appendChild(btn);
    });
}

function seleccionarEspecialidadDulce() {
    prepararPantalla("Especialidad Dulce");
    
        // Si es waffle y regresa, va al inicio. Si es crepa, va al tipo.
        const regresoManual = pedidoActual.nombre === "Waffle" ? iniciarPedido : seleccionarTipo;
        document.querySelector(".btn-volver").onclick = () => {
        historialPantallas.pop();
        regresoManual();
        };

        catalogo.crepas.dulces.forEach(esp => {
            const btn = document.createElement("button");
    
                // Calculamos el precio base según el tamaño
                // Si es Gigante, el extra de la especialidad (35, 45 o 50) se multiplica por 2
                const esGigante = pedidoActual.tamano === "Gigante";
                    const precioCalculado = esGigante ? (esp.extra * 2) : esp.extra;

                         btn.textContent = `${esp.nombre} ($${precioCalculado})`;
    
                                btn.onclick = () => {
                                pedidoActual.especialidad = esp.nombre;
                                     pedidoActual.total = precioCalculado; // Asignamos el precio final directamente
                                        historialPantallas.push(seleccionarEspecialidadDulce);

                                        if (esp.nombre === "Clásica") {
                                             pedidoActual.ingredientes.push("Plátano");
                                                gestionarIngredientes(catalogo.crepas.untables, esp.reglas.u, "Untable", () => {
                                                     gestionarIngredientes(catalogo.crepas.toppings, esp.reglas.t, "Topping", finalizarProducto);
                                                        });
                                                            } else {
                                                                             gestionarIngredientes(catalogo.crepas.frutas, esp.reglas.f, "Fruta", () => {
                                                                             gestionarIngredientes(catalogo.crepas.untables, esp.reglas.u, "Untable", () => {
                                                                                 gestionarIngredientes(catalogo.crepas.toppings, esp.reglas.t, "Topping", () => {
                                                                                     if (esp.reglas.h) {
                                    gestionarIngredientes(catalogo.crepas.helados, esp.reglas.h, "Helado", finalizarProducto);
                            } else {
                                finalizarProducto();
                            }
                        });
                    });
                });
            }
        };
        contenido.appendChild(btn);
    });
}

function gestionarIngredientes(lista, limite, etiqueta, siguiente) {
    let seleccionadosLocal = 0;
    function renderLista() {
        prepararPantalla(`Selecciona ${etiqueta} (${seleccionadosLocal}/${limite})`);
        lista.forEach(item => {
            const btn = document.createElement("button");
            btn.textContent = item;
            btn.onclick = () => {
                pedidoActual.ingredientes.push(item);
                seleccionadosLocal++;
                if (seleccionadosLocal === limite) siguiente();
                else renderLista();
            };
            contenido.appendChild(btn);
        });
    }
    renderLista();
}

function finalizarProducto() {
    carrito.push({ ...pedidoActual });
    pedidoActual = {};
    historialPantallas = [];
    iniciarPedido();
}

function renderCarrito() {
    const div = document.createElement("div");
    div.className = "carrito-visual";
    div.innerHTML = "<hr><h3>🛒 Carrito</h3>";
    
    let total = 0;
    
    if (carrito.length === 0) {
        div.innerHTML += "<p>El carrito está vacío.</p>";
    }

    carrito.forEach((item, i) => {
        total += item.total;
        const p = document.createElement("p");
        p.style.display = "flex";
        p.style.justifyContent = "space-between";
        p.style.alignItems = "center";

        const notas = item.ingredientes.length > 0 
            ? `<br><small style="color: #666;">(${item.ingredientes.join(", ")})</small>` 
            : "";

        // Contenedor para el texto del producto
        const spanTexto = document.createElement("span");
        spanTexto.innerHTML = `<b>${i+1}. ${item.nombre} ${item.tamano || ""} ${item.especialidad || ""}</b> - $${item.total} ${notas}`;

        // Botón de eliminar
        const btnEliminar = document.createElement("button");
        btnEliminar.textContent = "❌";
        btnEliminar.style.padding = "2px 8px";
        btnEliminar.style.marginLeft = "10px";
        btnEliminar.style.backgroundColor = "#ff4d4d";
        btnEliminar.style.color = "white";
        btnEliminar.style.border = "none";
        btnEliminar.style.borderRadius = "4px";
        btnEliminar.style.cursor = "pointer";
        
        btnEliminar.onclick = () => {
            if(confirm("¿Seguro que quieres eliminar este producto?")) {
                eliminarDelCarrito(i);
            }
        };

        p.appendChild(spanTexto);
        p.appendChild(btnEliminar);
        div.appendChild(p);
    });
    
    const h2 = document.createElement("h2");
        h2.textContent = `Total: $${total}`;
            div.appendChild(h2);
            contenido.appendChild(div);
            
            const tienePendientes = carrito.some(item => item.total === 0);
                if (tienePendientes) {
         const aviso = document.createElement("p");
            aviso.innerHTML = "<small>⚠️ <i>Nota: El total podría cambiar dependiendo de los productos con 'Precio por revisar'.</i></small>";
            aviso.style.color = "#d9534f"; // Un color rojo suave para llamar la atención
            div.appendChild(aviso);
            }
            if (carrito.length > 0) {
    const btnFinalizar = document.createElement("button");
    btnFinalizar.textContent = "✅ Finalizar Pedido";
    btnFinalizar.className = "btn-finalizar";

    btnFinalizar.onclick = () => {
        mostrarFormularioCliente();
    };

    div.appendChild(btnFinalizar);
}
            }
            function eliminarDelCarrito(indice) {
            // El método splice quita elementos de un arreglo usando su posición (índice)
            carrito.splice(indice, 1);
            // Una vez eliminado, volvemos a dibujar el menú para que se actualice la lista visual
            iniciarPedido(); 
                }

                iniciarPedido();
    // --- FLUJO COMIDA RÁPIDA (CORREGIDO) ---

    function iniciarComidaRapida() {
    prepararPantalla(catalogo.comidaRapida.titulo);
    historialPantallas.push(iniciarPedido);

    // CAMBIO AQUÍ: Usamos .opciones en lugar de .productos
    catalogo.comidaRapida.opciones.forEach(prod => {
        const btn = document.createElement("button");
        // Mostrar precio solo si es mayor a 0 para no confundir en Hamburguesa/Combo
        btn.textContent = prod.precio > 0 ? `${prod.nombre} ($${prod.precio})` : prod.nombre;
        
        btn.onclick = () => {
            pedidoActual = { 
                nombre: prod.nombre, 
                total: prod.precio, 
                ingredientes: ["Todo incluido"] 
            };
            
            if (prod.nombre === "Hamburguesa") {
                seleccionarTipoHamburguesa();
            } else if (prod.nombre === "Combo") {
                seleccionarCombo();
            } else if (prod.nombre === "Banderilla") {
                finalizarProducto();
            } else {
                preguntarIngredientes();
            }
        };
        contenido.appendChild(btn);
    });
}

function seleccionarTipoHamburguesa() {
    prepararPantalla("¿Qué tipo de hamburguesa deseas?");
    historialPantallas.push(iniciarComidaRapida);

    // CAMBIO AQUÍ: Verificar que el nombre coincida con el catálogo (tiposHamburguesa)
    catalogo.comidaRapida.tiposHamburguesa.forEach(tipo => {
        const btn = document.createElement("button");
        btn.textContent = `${tipo.nombre} ($${tipo.precio})`;
        btn.onclick = () => {
            pedidoActual.especialidad = tipo.nombre;
            pedidoActual.total = tipo.precio;
            preguntarIngredientes();
        };
        contenido.appendChild(btn);
    });
}

function seleccionarCombo() {
    prepararPantalla("Selecciona tu Combo (Incluye Papas)");
    historialPantallas.push(iniciarComidaRapida);

    catalogo.comidaRapida.combos.forEach(combo => {
        const btn = document.createElement("button");
        btn.textContent = `${combo.nombre} ($${combo.precio})`;
        btn.onclick = () => {
            pedidoActual.especialidad = combo.nombre;
            pedidoActual.total = combo.precio;
            preguntarIngredientes();
        };
        contenido.appendChild(btn);
    });
}

function preguntarIngredientes() {
    prepararPantalla(`¿Deseas ${pedidoActual.especialidad || pedidoActual.nombre} con todos los ingredientes?`);
    
    const btnSi = document.createElement("button");
    btnSi.textContent = "SÍ (Todo incluido)";
    btnSi.className = "btn-si"; // Para que puedas darle estilo verde en CSS
    btnSi.onclick = () => finalizarProducto();
    
    const btnNo = document.createElement("button");
    btnNo.textContent = "NO (Quitar algunos)";
    btnNo.className = "btn-no"; // Para que puedas darle estilo rojo en CSS
    btnNo.onclick = () => {
        const sin = prompt("Especifica qué ingredientes deseas RETIRAR:");
        if (sin) {
            pedidoActual.ingredientes = [`TODO EXCEPTO: ${sin}`];
        }
        finalizarProducto();
    };

    contenido.appendChild(btnSi);
    contenido.appendChild(btnNo);
}
function iniciarFrappes() {
    prepararPantalla(catalogo.frappes.titulo);
    historialPantallas.push(iniciarPedido);

    catalogo.frappes.lista.forEach(sabor => {
        const btn = document.createElement("button");
        btn.textContent = `${sabor.nombre} ($${sabor.precio})`;
        
        btn.onclick = () => {
            pedidoActual = { 
                nombre: "Frappé", 
                especialidad: sabor.nombre, 
                total: sabor.precio, 
                ingredientes: [] 
            };
            finalizarProducto(); // Se va directo al carrito
        };
        contenido.appendChild(btn);
    });
}
function iniciarGomyboing() {
    prepararPantalla(catalogo.gomyboing.titulo);
    historialPantallas.push(iniciarPedido);

    catalogo.gomyboing.sabores.forEach(sabor => {
        const btn = document.createElement("button");
        btn.textContent = sabor;
        btn.onclick = () => {
            pedidoActual = { 
                nombre: "Gomyboing", 
                especialidad: sabor, 
                total: catalogo.gomyboing.precio, 
                ingredientes: ["Todo incluido"] 
            };
            preguntarIngredientesGomy();
        };
        contenido.appendChild(btn);
    });
}

function preguntarIngredientesGomy() {
    prepararPantalla(`¿Deseas el Gomyboing de ${pedidoActual.especialidad} con todos los ingredientes?`);
    
    // Botón SÍ
    const btnSi = document.createElement("button");
    btnSi.textContent = "SÍ (Con todo)";
    btnSi.style.backgroundColor = "#d4edda";
    btnSi.onclick = () => finalizarProducto();
    
    // Botón NO
    const btnNo = document.createElement("button");
    btnNo.textContent = "NO (Quitar algo)";
    btnNo.style.backgroundColor = "#f8d7da";
    btnNo.onclick = () => {
        const sin = prompt("Especifica qué deseas RETIRAR (ej: sin miguelito, sin gomitas):");
        if (sin) {
            pedidoActual.ingredientes = [`TODO EXCEPTO: ${sin}`];
        }
        finalizarProducto();
    };

    contenido.appendChild(btnSi);
    contenido.appendChild(btnNo);
}
function iniciarChicharron() {
    // Definimos el pedido actual de inmediato porque solo hay un tipo de chicharrón
    pedidoActual = { 
        nombre: "Chicharrón Preparado", 
        total: catalogo.chicharron.precio, 
        ingredientes: ["Todo incluido"] 
    };
    
    preguntarIngredientesChicharron();
}

function preguntarIngredientesChicharron() {
    prepararPantalla("¿Deseas el Chicharrón Preparado con todos los ingredientes?");
    historialPantallas.push(iniciarPedido);

    // Botón SÍ
    const btnSi = document.createElement("button");
    btnSi.textContent = "SÍ (Con todo)";
    btnSi.style.backgroundColor = "#d4edda";
    btnSi.onclick = () => finalizarProducto();
    
    // Botón NO
    const btnNo = document.createElement("button");
    btnNo.textContent = "NO (Quitar algo)";
    btnNo.style.backgroundColor = "#f8d7da";
    btnNo.onclick = () => {
        const sin = prompt("Especifica qué deseas RETIRAR (ej: sin cueritos, sin col, sin crema):");
        if (sin) {
            pedidoActual.ingredientes = [`TODO EXCEPTO: ${sin}`];
        }
        finalizarProducto();
    };

    contenido.appendChild(btnSi);
    contenido.appendChild(btnNo);
}
function iniciarDorilocos() {
    prepararPantalla(catalogo.dorilocos.titulo);
    historialPantallas.push(iniciarPedido);

    catalogo.dorilocos.sabores.forEach(sabor => {
        const btn = document.createElement("button");
        btn.textContent = sabor;
        btn.onclick = () => {
            pedidoActual = { 
                nombre: "Dorilocos", 
                especialidad: sabor, // Aquí guardamos si son Nacho, Pizzerola, etc.
                total: catalogo.dorilocos.precio, 
                ingredientes: ["Todo incluido"] 
            };
            preguntarIngredientesDorilocos();
        };
        contenido.appendChild(btn);
    });
}

function preguntarIngredientesDorilocos() {
    prepararPantalla(`¿Deseas los ${pedidoActual.especialidad} preparados con todo?`);
    
    const btnSi = document.createElement("button");
    btnSi.textContent = "SÍ (Con todo)";
    btnSi.style.backgroundColor = "#d4edda";
    btnSi.onclick = () => finalizarProducto();
    
    const btnNo = document.createElement("button");
    btnNo.textContent = "NO (Quitar algo)";
    btnNo.style.backgroundColor = "#f8d7da";
    btnNo.onclick = () => {
        const sin = prompt("Especifica qué deseas RETIRAR:");
        if (sin) {
            pedidoActual.ingredientes = [`TODO EXCEPTO: ${sin}`];
        }
        finalizarProducto();
    };

    contenido.appendChild(btnSi);
    contenido.appendChild(btnNo);
}

// --- FLUJO MARUCHAN ---
function iniciarMaruchan() {
    prepararPantalla(catalogo.maruchan.titulo);
    historialPantallas.push(iniciarPedido);

    catalogo.maruchan.sabores.forEach(sabor => {
        const btn = document.createElement("button");
        btn.textContent = sabor;
        btn.onclick = () => {
            pedidoActual = { 
                nombre: "Maruchan", 
                especialidad: sabor, 
                total: catalogo.maruchan.precio, 
                ingredientes: [] 
            };
            finalizarProducto();
        };
        contenido.appendChild(btn);
    });
}

// --- FLUJO CAFÉ ---
function iniciarCafe() {
    prepararPantalla(catalogo.cafe.titulo);
    historialPantallas.push(iniciarPedido);

    catalogo.cafe.sabores.forEach(sabor => {
        const btn = document.createElement("button");
        btn.textContent = sabor;
        btn.onclick = () => {
            pedidoActual = { 
                nombre: "Café", 
                especialidad: sabor, 
                total: catalogo.cafe.precio, 
                ingredientes: [] 
            };
            finalizarProducto();
        };
        contenido.appendChild(btn);
    });
}
function iniciarOtros() {
    // 1. Preguntamos qué producto es
    const nombreProducto = prompt("¿Qué producto deseas agregar?");
    
    // Si cancelan o dejan vacío, regresamos
    if (!nombreProducto) return;

    // 2. Lo agregamos al pedido con precio 0 y nota especial
    pedidoActual = { 
        nombre: "OTRO:", 
        especialidad: nombreProducto, 
        total: 0, // Se queda en 0 para no alterar la suma automática incorrectamente
        ingredientes: ["Precio por revisar"] 
    };

    finalizarProducto();
}
function mostrarFormularioCliente() {
    contenido.innerHTML = `
    <h2>Datos del Cliente</h2>

    <label>Nombre:</label>
    <input type="text" id="nombreCliente">

    <label>Teléfono:</label>
    <input type="tel" id="telefonoCliente">

    <label>Dirección de referencia:</label>
    <textarea id="direccionCliente"></textarea>

    <br><br>

    <button id="btnUbicacion">
        📍 Compartir ubicación
    </button>

    <p id="estadoUbicacion"></p>

    <br>

<button id="btnCancelar">
    ❌ Editar Carrito
</button>
    <button id="btnContinuar">
        Continuar
    </button>
`;
    document.getElementById("btnContinuar").onclick = generarResumenPedido;

    document.getElementById("btnUbicacion").onclick =
    obtenerUbicacion;
    document.getElementById("btnCancelar").onclick = () => {
        iniciarPedido();
    };
    document.getElementById("btnEditarPedido").onclick = () => {
    iniciarPedido();
};
}
function generarResumenPedido() {

    const nombre = document.getElementById("nombreCliente").value;
    const telefono = document.getElementById("telefonoCliente").value;
    const direccion = document.getElementById("direccionCliente").value;

    if (!nombre || !telefono || !direccion) {
        alert("Completa todos los campos.");
        return;
    }

    let total = 0;

    let resumen = `
CLIENTE
Nombre: ${nombre}
Teléfono: ${telefono}
Dirección: ${direccion}
`;

    // Agregar ubicación si existe
    if (ubicacionCliente) {
        resumen += `
Ubicación GPS:
${ubicacionCliente}
`;
    }

    resumen += `

PEDIDO:
`;

    carrito.forEach((item, i) => {

        total += item.total;

        resumen += `
${i + 1}. ${item.nombre}
${item.especialidad || ""}
${item.tamano || ""}
Precio: $${item.total}
`;

        if (item.ingredientes && item.ingredientes.length > 0) {
            resumen += `Detalles: ${item.ingredientes.join(", ")}\n`;
        }

        resumen += "\n";
    });

    resumen += `
TOTAL: $${total}
`;

    // Solo para depuración (puedes quitarlo después)
    console.log("Ubicación guardada:", ubicacionCliente);

    mostrarResumenFinal(resumen);
}

function mostrarResumenFinal(resumen) {

    contenido.innerHTML = `
        <h2>Resumen del Pedido</h2>

        <pre style="
            text-align:left;
            white-space:pre-wrap;
            background:#f5f5f5;
            padding:10px;
            border-radius:8px;
        ">${resumen}</pre>

        <button id="btnWhatsapp">
            📲 Enviar por WhatsApp
        </button>

        <button id="btnRegresarResumen">
            ⬅ Regresar
        </button>
    `;

    document.getElementById("btnWhatsapp").onclick = () => {
        enviarWhatsapp(resumen);
    };

    document.getElementById("btnRegresarResumen").onclick = () => {
        mostrarFormularioCliente();
    };
}
function enviarWhatsapp(resumen) {

    const numeroNegocio = "7224558514";

    const mensaje = encodeURIComponent(resumen);

    window.open(
        `https://wa.me/${numeroNegocio}?text=${mensaje}`,
        "_blank"
    );
}

function obtenerUbicacion() {

    const estado = document.getElementById("estadoUbicacion");

    if (!navigator.geolocation) {
        estado.textContent = "Tu navegador no soporta geolocalización.";
        return;
    }

    estado.textContent = "Obteniendo ubicación...";

    navigator.geolocation.getCurrentPosition(

        (posicion) => {

            const lat = posicion.coords.latitude;
            const lng = posicion.coords.longitude;

            ubicacionCliente =
    `https://www.google.com/maps?q=${lat},${lng}`;

console.log("Ubicación:", ubicacionCliente);

estado.innerHTML =
    "✅ Ubicación capturada correctamente";
        }

    );
}