/**
 * Crea una función obtenerDatos() que simule una llamada a una API con setTimeout y
 * usar async/await para esperar el resultado.
 */
function simularPeticionAPI() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("Datos recibidos correctamente");
        }, 5000);
    });
}

async function obtenerDatos() {
    try {
        const resultado = await simularPeticionAPI();
        console.log(resultado);
    } catch (error) {
        console.error("Error al obtener los datos:", error);
    }
}

// Llamada a la función async
obtenerDatos();
