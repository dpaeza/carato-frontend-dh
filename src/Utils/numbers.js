/**
 * Sorts an numbers array in ascending order.
 * @param {Array<number>} Numbers array to be sorted
 * @returns {Array<number>} Sorted array
 */
export const sortNumbers = (values = []) => {
    return values.sort((a, b) => a - b);
};

/**
 * Randomly shuffles an array.
 * Si se proporciona un valor de `seed`, se realiza un shuffle determinista.
 *
 * @param {Array<string | number>} values Array a ser barajado.
 * @param {number} [seed] Semilla para el generador aleatorio.
 * @returns {Array<string | number>} Array barajado.
 */
export const shuffleArray = (values = [], seed) => {
    // Si no se proporciona semilla, usar el método tradicional
    if (seed === undefined) {
        return values.sort(() => Math.random() - 0.5);
    }

    // Implementación del generador aleatorio basado en semilla (mulberry32)
    function mulberry32(a) {
        return function () {
            let t = (a += 0x6d2b79f5);
            t = Math.imul(t ^ (t >>> 15), t | 1);
            t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
            return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
        };
    }

    // Convertimos la semilla (que puede ser un float) a un entero
    const seedValue = Math.floor(seed * 1000000);
    const random = mulberry32(seedValue);
    const newArray = [...values];

    // Algoritmo Fisher-Yates con el generador aleatorio determinista
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
};
