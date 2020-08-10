const axios = require('axios');
const {prefix, server} = require('../config.json');
const help = [
    {
        name: 'Đăng ký',
        des: 'Đăng ký tài khoản bằng cú pháp: `' + prefix +
            'game dangky [tên_acc_viết_liền_không_khoảng_cách] [class]`\nClass gồm: `archer`|`assassin`|`paladin`|`warrior`|`wizard`' +
            '\nVí dụ: `' + prefix + 'game dangky Mèo_con paladin`'
    }, {
        name: 'Thách đấu PvP',
        des: 'Thách đấu với tài khoản khác bằng cú pháp `' + prefix + 'duel pvp @tag_người_muốn_thách_đấu`. Bot sẽ ghi nhận lời khiêu chiến và gửi lại 1 [mã_trận_đấu] để bạn gửi cho đối thủ.'
    },
    {
        name: 'Nhận thách đấu PvP',
        des: 'Chấp nhận thách đấu với tài khoản bằng cú pháp `' + prefix + 'duel ok [mã_trận_đấu]`'
    },
    {
        name: 'Xem thông tin 1 trận đấu',
        des: 'Xem thông tin của trận đấu bằng cú pháp `' + prefix + 'duel info [mã_trận_đấu]`'
    },
    {
        name: 'Xem thống kê thành tích',
        des: 'Xem thống kê thành tích bản thân bằng cú pháp `' + prefix + 'duel thongke` hoặc thống kê của người khác bằng cú pháp `' + prefix + 'duel thongke @tag_người_muốn_xem` '
    }
];
module.exports = {
    name: 'game',
    description: 'Trò chơi :) vui lòng gõ `' + prefix + 'game help` để nhận hỗ trợ chi tiết',
    args: true,
    async execute(message, args) {
        if (args[0] === 'help') {
            let msg = '';
            help.forEach(function (el) {
                msg += `- ${el.name}:\n-- ${el.des}\n`;
            });
            return message.channel.send(message.author.toString() + '\n' + msg);
        }
        if (args[0] === 'dangky') {
            if (args.length > 3)
                return message.channel.send(message.author.toString() + 'Cú pháp đăng ký không đúng. Hãy kiểm tra lại hoặc gõ `' + prefix + 'game help` để xem chi tiết!')
            const userName = args[1];
            const userClass = args[2];
            const data = {
                UserId: message.author.id,
                UserName: userName,
                UserClass: userClass
            };

            await axios.post(server + '/api/register', data).then((result) => {
                message.channel.send(`${message.author.toString()} ${result.data}`);
            })
        }
    },
};