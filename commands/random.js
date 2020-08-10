const Discord = require('discord.js')
const fs = require('fs')
const utils = require('../utils.js')
const logging = require('../logging.js')

module.exports = {
    name: 'random',
    description: 'Random hero hoặc số bất kỳ hay một đối tượng trong danh sách.',
    args:true,
    execute(message,args) {
        try {
            const number = Number(args[0])
            let list = []
            let heroes = {}
            let krClass = []
            let krHeroes = []
            if (args[1] === 'hero' || args[1] === 'heroes' || args[1] === 'class') {
                const kingraid = JSON.parse(fs.readFileSync('./kingRaidData.json', 'utf8'))
                krHeroes = kingraid.heroes
                krClass = kingraid.class
            }
            if (number > 0) {
                if (args.length === 2) {
                    if (args[1] === 'hero' || args[1] === 'heroes') {
                        if (krHeroes.length > 0) {

                            if (number >= krHeroes.length) {
                                return message.channel.send(message.author.toString() + ' Có ' + number + ' hero lấy hết làm cái gì???')                            }

                            list = utils.shuffleArray(krHeroes)

                            heroes = {
                                text: '',
                                images: []
                            }
                            let listHeroName = []
                            for (let i = 0; i < number; i++) {
                                listHeroName.push(`**${list[i].name}**(*${list[i].class}*)`)
                                heroes.images.push(list[i].img)
                            }
                            list = null
                            if (listHeroName.length > 0) {
                                heroes.text = ' Kết quả là: ' + listHeroName.join(', ')
                            }
                            listHeroName = null
                            if (heroes.images.length > 0) {
                                message.channel.send(message.author.toString() + heroes.text)
                                for (var i = 0; i < heroes.images.length; i++) {
                                    const webAttachment = new Discord.MessageAttachment(heroes.images[i])
                                    setTimeout(function () {
                                        message.channel.send(webAttachment)
                                    }, i * 1000)
                                }
                                return
                            }
                        } else {
                            return message.channel.send(message.author.toString() + ' Không lấy đượcc danh sách :(')
                        }
                    } else if (args[1] === 'class') {
                        if (krClass.length > 0) {
                            let arr = krClass
                            arr = utils.shuffleArray(arr)
                            let arres = []
                            for (let i = 0; i < number; i++) {
                                arres.push(`**${arr[i]}**`)
                            }
                            arr = null
                            return message.channel.send(message.author.toString() + ' Kết quả là : ' + arres.join(', '))
                        }
                    } else if (args[1].includes('-')) {
                        var splits = args[1].split('-')
                        var num1 = Number(splits[0])
                        var num2 = Number(splits[1])
                        if (num1 >= 0 && num2 >= 0) {
                            if (num1 === num2) {
                                return message.channel.send(`${message.author.toString()} 2 số bằng nhau random gì má?`)
                            } else {
                                var resultar = []
                                if (num1 > num2) {
                                    for (let i = 0; i < number; i++) {
                                        resultar.push(utils.randomMinMax(num2, num1, num2))
                                    }
                                } else if (num1 < num2) {
                                    for (let i = 0; i < number; i++) {
                                        resultar.push(utils.randomMinMax(num1, num2, num1))
                                    }
                                }
                                if (resultar.length > 0) {
                                    return message.channel.send(`${message.author.toString()} Kết quả là **${resultar.join(', ')}**`)
                                }
                            }
                        }
                    }
                } else if (args.length > 2) {
                    if (args[1] === 'hero' || args[1] === 'heroes') {
                        if (krHeroes.length > 0) {

                            if (number >= krHeroes.length) {
                                return message.channel.send(message.author.toString() + ' Có ' + number + ' hero lấy hết làm cái gì???')
                            }

                            list = krHeroes
                            list = utils.shuffleArray(list)
                            var classes = []
                            if (args[2] === 'nam' || args[2] === 'male') {
                                list = list.filter((el) => {
                                    return el.gender === 'male'
                                })
                            } else if (args[2] === 'nữ' || args[2] === 'nu' || args[2] === 'female') {
                                list = list.filter((el) => {
                                    return el.gender === 'female'
                                })
                            } else if (args[2] === 'class' && args.length > 3) {
                                classes = args
                                classes.splice(0, 3)
                            }
                            if (args[3] === 'class' && args.length > 4) {
                                classes = args
                                classes.splice(0, 4)
                            }
                            if (classes.length > 0) {
                                list = list.filter((el) => {
                                    for (let cl in classes) {
                                        if (el.class === classes[cl])
                                            return true
                                    }
                                    return false
                                })
                            }

                            if (list.length > 0) {
                                heroes = {
                                    text: '',
                                    images: []
                                }
                                var listHeroName = []
                                for (let i = 0; i < number; i++) {
                                    listHeroName.push(`**${list[i].name}**(*${list[i].class}*)`)
                                    heroes.images.push(list[i].img)
                                }
                                list = null
                                if (listHeroName.length > 0) {
                                    heroes.text = 'Kết quả là: ' + listHeroName.join(', ')
                                }
                                listHeroName = null
                                if (heroes.images.length > 0) {
                                    message.channel.send(message.author.toString() + heroes.text)
                                    for (var i = 0; i < heroes.images.length; i++) {
                                        const webAttachment = new Discord.MessageAttachment(heroes.images[i])
                                        setTimeout(function () {
                                            message.channel.send(webAttachment)
                                        }, i * 1000)
                                    }
                                    return
                                }
                            } else {
                                return message.channel.send(message.author.toString() + ' Không có hero phù h?p')
                            }
                        } else {
                            return message.channel.send(message.author.toString() + ' Không lấy đượcc danh sách :(')
                        }
                    } else {
                        let array = args
                        array.shift()
                        array = utils.shuffleArray(array)
                        let resultar = []
                        if (number >= array.length) {
                            return message.channel.send(`${message.author.toString()} Có ${array.length} lấy ${number} thì random gì má?`)
                        } else {
                            for (let i = 0; i < number; i++) {
                                resultar.push(array[i])
                            }
                            if (resultar.length > 0) {
                                return message.channel.send(`${message.author.toString()} Kết quả là **${resultar.join(', ')}**`)
                            }
                        }
                    }
                }
            }
        } catch (error) {
            logging.write(error)
            return message.channel.send(message.author.toString() + ' Ae random cái qq gì vậy??')
        } 
    },
};