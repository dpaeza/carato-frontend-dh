/**
 * Sorts an numbers array in ascending order.
 * @param {Array<number>} Numbers array to be sorted
 * @returns {Array<number>} Sorted array
 */
export const sortNumbers = (values = []) => {
    return values.sort((a,b) => a - b);
}

/**
 * Randomly shuffles an array
 * @param {Array<(string | number)>} Array to be shuffled
 * @returns {Array<(string | number)>} Shuffled array
 */
export const shuffleArray = (values = []) => {
    return values.sort(() => Math.random() - 0.5);
}
