const botStatus = require('./botStatus.json')
const logging = require('./logging.js')
const utils = require('./utils.js')

function randomStatus() {
    try {
        var type = utils.randomArray(botStatus.type)
        let kind = 0
        let name = ''
        switch (type) {
            case "LISTENING":
                name = utils.randomArray(botStatus.listening)
                break;
            case "PLAYING":
                name = utils.randomArray(botStatus.playing)
                break;
            case "WATCHING":
                name = utils.randomArray(botStatus.watching)
                break;
            case "READING":
                name = utils.randomArray(botStatus.reading)
                type = "WATCHING"
                break;
            case "CUSTOM":
                kind = 1
                var number = utils.randomMinMax(1, 1000, 0)
                var level = 0
                if (number < 250) {
                    level = 1
                    name = utils.randomArray(botStatus.emotion.happy)
                } else if (number < 500) {
                    level = 2
                    name = utils.randomArray(botStatus.emotion.normal)
                } else if (number < 750) {
                    level = 3
                    name = utils.randomArray(botStatus.emotion.sad)
                } else {
                    level = 4
                    name = utils.randomArray(botStatus.emotion.crazy)
                }
                botStatus.status.level = level
                break;
            default:
                return
        }
        return {
            "name": name,
            "type": type,
            "kind": kind
        }
    } catch (error) {
        logging.write(error)
        return {}
    }
}

module.exports = {
    name: 'change_status',
    description: 'BOT status',
    run() {
        return randomStatus()
    },
};