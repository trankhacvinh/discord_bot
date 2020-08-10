'use strict';

/*Begin:import*/
const fs = require('fs');
const Discord = require('discord.js');
const {
    prefix,
    token,
    generalChannel
} = require('./config.json');
const botStatus = require('./botStatus.json');
const logging = require('./logging.js');
const utils = require('./utils.js');
const changeStatus = require('./changeStatus.js');
const client = new Discord.Client();
/*End:import*/

/*Begin:initial*/
client.commands = new Discord.Collection();
client.loops = new Discord.Collection();
/*End:initial*/

/*Begin:shared variables*/
var ecchiLoop = true;
client.loops.set('ecchi', ecchiLoop);
/*End:shared variables*/

/*Begin:import commands*/
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command)
}
/*End:import commands*/

function setRandomStatus() {
    const status = changeStatus.run();
    if (status.kind === 1) {
        client.user.setActivity(status.name)
    } else {
        client.user.setPresence({
            activity: {
                name: status.name,
                type: status.type
            }
        })
    }
    return;
}

client.once('ready', () => {
    logging.write("Server has been started!");
    setRandomStatus();
    setInterval(function () {
        setRandomStatus()
    }, 1800000)
});

client.on('disconnect', function (event) {
    console.log(`The WebSocket has closed and will no longer attempt to reconnect`);
    const channel = client.channels.cache.get(generalChannel);
    channel.send('Bé bị disconnect rồi :((')
});

client.on('guildMemberAvailable', function (member) {
    console.log(`Hi ${member.tag}`);
});

client.on('message', message => {
    if (message.author === client.user || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const commandName = args.shift().toLowerCase();
    const type = message.channel.type;


    /*Begin:excute command*/
    if (client.commands.has(commandName)) {
        logging.write(`- [COMMAND][${type}]`, commandName, args.join(','));
        try {
            client.commands.get(commandName).execute(message, args)
        } catch (error) {
            logging.write(`- [ERROR][${type}]`, `error ${commandName}\n--`, error)
        }
        return
    }
    if (commandName === 'switch') {
        const status = changeStatus.run();
        if (status.kind === 1) {
            client.user.setActivity(status.name)
        } else {
            client.user.setPresence({
                activity: {
                    name: status.name,
                    type: status.type
                }
            })
        }
        return
    }
    /*End:excute command*/


    /*Begin:normal chat*/
    if (type === 'text') {
        //Chat trên kênh text
        if (message.content.includes(client.user.id.toString())) {
            message.channel.send('Đang trong quá trình phát triển nên tạm thời bé ứ trả lời nhé');
            logging.write('- [MENTION][TEXT]', `user ${message.author.username}\n-- `, message.content)
        } else {
            //message.channel.send('Tôi vẫn đang theo dõi. Bạn đang chat trên kênh ' + message.channel.type)
        }
    } else if (type === 'dm') {
        //Chat riêng
        message.channel.send('PM riêng cũng không ích gì đâu nhé. Giờ chưa hỗ trợ nhé.')
    }
    /*End:normal chat*/

});

client.login(token);