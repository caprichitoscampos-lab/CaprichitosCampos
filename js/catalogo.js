const catalogo = {
    productos: [
        "Crepas", "Waffles", "Frappé", "Papas a la francesa y Hamburguesas", 
        "Gomyboing", "Café", 
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
            { nombre: "Clásica", extra: 40, reglas: { f: 0, u: 1, t: 1 } },
            { nombre: "Moderna", extra: 50, reglas: { f: 1, u: 1, t: 1 } },
            { nombre: "Mixta", extra: 50, reglas: { f: 3, u: 2, t: 2 } },
            { nombre: "Premium", extra: 55, reglas: { f: 2, u: 1, t: 2, h: 1 } }
        ],
        saladas: [
            { nombre: "Hawaiana", precio: 50 },
            { nombre: "Carnes Frias", precio: 55 },
            { nombre: "3 Quesos", precio: 40 }
        ],
        frutas: ["Plátano", "Durazno", "Piña", "Cereza"],
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
            { nombre: "Salchipulpos", precio: 40 },
            { nombre: "Salchipapas", precio: 80},
            { nombre: "Hot Dog", precio: 35 },
            { nombre: "Hot Dog especial", precio: 45},
            { nombre: "Hamburguesa", precio: 0 }, // El precio se define en 'tipos'
            { nombre: "Banderilla", precio: 25 },
            { nombre: "Banderilla de queso", precio: 30 },
            { nombre: "Combo", precio: 0 }  // El precio se define en 'combos'
        ],
        tiposHamburguesa: [
            { nombre: "Sencilla", precio: 60 },
            { nombre: "Especial", precio: 80 },
            { nombre: "Doble", precio: 130 }
        ],
        combos: [
            { nombre: "Hamburguesa sencilla + papas", precio: 100 },
            { nombre: "Hamburguesa especial + papas", precio: 130 },
            { nombre: "Hamburguesa doble + papas", precio: 170 },
            { nombre: "Hot Dog + papas", precio: 70 }
            
        ]
    },

    frappes: {
    titulo: "SELECCIONA EL SABOR DEL FRAPPÉ",
    lista: [
        // Grupo $45
        { nombre: "Chocolate", precio: 50 },
        { nombre: "Vainilla", precio: 50 },
        { nombre: "Fresa", precio: 50 },
        { nombre: "Café", precio: 50 },
        // Grupo $55
        { nombre: "Moka", precio: 60 },
        { nombre: "Cajeta", precio: 60 },
        { nombre: "Mazapán", precio: 60 },
        { nombre: "Oreo", precio: 60 },
        { nombre: "Nutella", precio: 60 },
        // Grupo $50
        { nombre: "Ice de Cereza", precio: 55 },
        { nombre: "Ice de Mora Azul", precio: 55 },
        
        // Grupo $60
        { nombre: "Bubulubu", precio: 65 },
        { nombre: "Pay de Limón", precio: 65 }, 
        { nombre: "Ferrero", precio: 75 }
    ]}, 
    gomyboing: {
        titulo: "PREPARA TU GOMYBOING",
        precio: 35, // Precio general
        sabores: ["Ice Mora", "Ice cereza", "Mango", "Guayaba", "Piña"]
            },
    dorilocos: {
        titulo: "SELECCIONA TUS DORITOS / BOTANA",
        precio: 50,
        sabores: ["Nacho (Rojos)"]
    },
    maruchan: {
        titulo: "SABOR DE LA MARUCHAN",
        precio: 25,
        sabores: ["Camarón Limón y Chile", "Camarón con Chile Habanero", "Pollo"]
    },

    cafe: {
        titulo: "SELECCIONA TU CAFÉ",
        precio: 30,
        sabores: ["Clásico", "Vainilla", "Chocolate", "Moka"]
    },

};
