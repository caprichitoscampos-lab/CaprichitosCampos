const catalogo = {
    productos: [
        "Crepas", "Waffles", "Frappé", "Papas a la francesa y Hamburguesas", 
        "Gomyboing", "Chicharrón preparado", "Café", 
        "Maruchan", "Dorilocos", "Otros"
    ],

    crepas: {
        precioBase: 0,
    tamanos: [
        { nombre: "Normal", multiplicador: 1 }, 
        { nombre: "Gigante", multiplicador: 2 } 
    ],
        tipos: ["Dulce", "Salada"],
        dulces: [
            { nombre: "Clásica", extra: 35, reglas: { f: 0, u: 1, t: 1 } },
            { nombre: "Moderna", extra: 45, reglas: { f: 1, u: 1, t: 1 } },
            { nombre: "Mixta", extra: 50, reglas: { f: 3, u: 2, t: 2 } },
            { nombre: "Premium", extra: 50, reglas: { f: 2, u: 1, t: 2, h: 1 } }
        ],
        saladas: [
            { nombre: "Hawaiana", precio: 45 },
            { nombre: "Carnes Frias", precio: 50 },
            { nombre: "3 Quesos", precio: 40 }
        ],
        frutas: ["Plátano", "Durazno", "Piña", "Fresa", "kiwi", "Cereza"],
        untables: ["Nutella", "Philadelphia", "Cajeta", "Lechera", "Mermelada de Fresa", "Crema pastelera"],
        toppings: ["Chispas de chocolate", "Chispas de colores", "Oreo", "Coco rallado", "Hershys Chocolate", "Hershys Fresa", "Maple", "Maple chicle", "Lunetas", "Bombón"],
        helados: ["Fresa"]
    },

    waffles: {
        precioBase: 45
    },

    // --- AQUÍ AGREGAS LA NUEVA SECCIÓN ---
    comidaRapida: {
        titulo: "PAPAS A LA FRANCESA Y COMIDA RÁPIDA",
        opciones: [
            { nombre: "Papas a la francesa", precio: 45 },
            { nombre: "Salchipulpos", precio: 35 },
            { nombre: "Salchipapas", precio: 75},
            { nombre: "Hot Dog", precio: 35 },
            { nombre: "Hot Dog especial", precio: 45},
            { nombre: "Hamburguesa", precio: 0 }, // El precio se define en 'tipos'
            { nombre: "Banderilla", precio: 25 },
            { nombre: "Combo", precio: 0 }  // El precio se define en 'combos'
        ],
        tiposHamburguesa: [
            { nombre: "Sencilla", precio: 50 },
            { nombre: "Especial", precio: 70 },
            { nombre: "Doble", precio: 120 }
        ],
        combos: [
            { nombre: "Hamburguesa sencilla + papas", precio: 90 },
            { nombre: "Hamburguesa especial + papas", precio: 120 },
            { nombre: "Hamburguesa doble + papas", precio: 160 },
            { nombre: "Hot Dog + papas", precio: 70 }
            
        ]
    },

    frappes: {
    titulo: "SELECCIONA EL SABOR DEL FRAPPÉ",
    lista: [
        // Grupo $45
        { nombre: "Chocolate", precio: 45 },
        { nombre: "Vainilla", precio: 45 },
        { nombre: "Fresa", precio: 45 },
        { nombre: "Café", precio: 45 },
        // Grupo $55
        { nombre: "Moka", precio: 55 },
        { nombre: "Cajeta", precio: 55 },
        { nombre: "Mazapán", precio: 55 },
        { nombre: "Oreo", precio: 55 },
        { nombre: "Nutella", precio: 55 },
        // Grupo $50
        { nombre: "Ice de Cereza", precio: 50 },
        { nombre: "Ice de Mora Azul", precio: 50 },
        
        // Grupo $60
        { nombre: "Bubulubu", precio: 60 },
        { nombre: "Pay de Limón", precio: 60 }
    ]}, 
    gomyboing: {
        titulo: "PREPARA TU GOMYBOING",
        precio: 35, // Precio general
        sabores: ["Ice Mora", "Ice cereza", "Mango"]},
        chicharron: {
        titulo: "CHICHARRÓN PREPARADO",
        precio: 35
    },
    dorilocos: {
        titulo: "SELECCIONA TUS DORITOS / BOTANA",
        precio: 45,
        sabores: ["Nacho (Rojos)"]
    },
    maruchan: {
        titulo: "SABOR DE LA MARUCHAN",
        precio: 25,
        sabores: ["Camarón Limón y Chile", "Camarón con Chile Habanero", "Pollo", "Carne de Res"]
    },

    cafe: {
        titulo: "SELECCIONA TU CAFÉ",
        precio: 30,
        sabores: ["Clásico"]
    },

};
