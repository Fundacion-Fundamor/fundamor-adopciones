class Utils {
        /**
     *  Converts "juana garcía" into "Juana García".
     *  @param {Array} An array containing the items.
     */
         static toTitleCase(phrase) {
            if (phrase && phrase.length > 0) {
                return phrase
                    .toLowerCase()
                    .split(' ')
                    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(' ');
            }
    
            return phrase;
        };
    }

    /**
 * @type {Utils}
 */
export default Utils;
