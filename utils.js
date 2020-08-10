var Ultis = (function () {
    function randomMinMax(min, max, thereshold) {
        var rand = Math.round(Math.random() * (max - min)) + thereshold
        return rand
    }

    function randomArray(array) {
        const res = array[Math.floor(Math.random() * array.length)]
        return res
    }

    function randomPercent(percent) {
        var random_boolean = Math.random() >= percent
        return random_boolean
    }

    function shuffle(array) {
        var currentIndex = array.length,
            temporaryValue, randomIndex;
        while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }

    function findNextWord(input, text) {
        var words = text.split(' ');

        var numberIndex = words.findIndex((word) => word == input);
        if (numberIndex + 1 > words) {
            return ''
        }
        var nextWord = words[numberIndex + 1];

        return nextWord
    }

    return {
        randomMinMax: randomMinMax,
        randomArray: randomArray,
        randomPercent: randomPercent,
        shuffleArray: shuffle,
        findNextWord: findNextWord
    }
})()

module.exports = Ultis