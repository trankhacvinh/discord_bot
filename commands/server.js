module.exports = {
	name: 'server',
	description: 'Hiện thông tin về server hiện tại.',
	execute(message) {
		if (message.channel.type === 'dm')
			return message.channel.send('PM channel')
		return message.channel.send(`Server name: ${message.guild.name}\nChannel: ${message.channel.id}\nTotal members: ${message.guild.memberCount}`);
	},
};