const { prefix } = require('../config.json');
module.exports = {
	name: 'help',
	description: `Hiện thông tin về những lệnh được hỗ trợ. Gõ **${prefix}help [command]** để xem chi tiết từng lệnh.`,
	execute(message) {
		var commands = message.client.commands;
		var str = '';
		commands.forEach(function (el) {
			str += `**${prefix}${el.name}**\t${el.description}\n`
		})
		message.channel.send(`All available commands:\n${str}`)
	},
};