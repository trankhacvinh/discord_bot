const {
    prefix,
    server
} = require('../config.json');
const axios = require('axios')
module.exports = {
    name: 'duel',
    description: 'Thách đấu với tài khoản khác bằng cú pháp `' + prefix + 'duel pvp @tag_người_muốn_thách_đấu`. Bot sẽ ghi nhận lời khiêu chiến và gửi lại 1 [mã_trận_đấu] để bạn gửi cho đối thủ.',
    args: true,
    async execute(message, args) {
        if (args[0] === 'pvp') {
            if (!message.mentions.users.size) {
                return message.channel.send('Thiếu tag người muốn thách đấu. Hãy gõ lại :`' + prefix + 'duel pvp @tag_người_muốn_thách_đấu`');
            }
            const mentionList = message.mentions.users.map(user => {
                return user;
            });
            if (mentionList.length > 0) {
                await axios.post(server + '/api/register-duel', {
                    Uid1: message.author.id,
                    Uid2: mentionList[0].id
                }).then(result => {
                    message.channel.send(`${message.author.toString()} Mã trận đấu: **${result.data}**`);
                    message.channel.send(`${mentionList[0].toString()} Để chấp nhận gõ cú pháp ${prefix}duel ok mã_trận_đấu`);
                });
            } else {
                return message.channel.send(message.author.toString() + ' Thiếu tag người muốn thách đấu. Hãy gõ lại :`' + prefix + 'duel pvp @tag_người_muốn_thách_đấu`');
            }
            return;
        }
        if (args[0] === 'ok') {
            if (args[1] === '') {
                return message.channel.send('Thiếu mã trận đấu');
            } else {
                await axios.post(server + '/api/duel', {
                    Uid1: message.author.id,
                    DuelCode: args[1]
                }).then(result => {
                    const resultMessage = result.data.resultMessage;
                    for (let i = 0; i < resultMessage.length; i += 1900) {
                        const toSend = resultMessage.substring(i, Math.min(resultMessage.length, i + 1900));
                        message.channel.send(toSend);
                    }
                })
            }
        }
    },
};