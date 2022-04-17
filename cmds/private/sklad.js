module.exports = {
tag: ["склад"],
button: ["sklad"],
func: async(context, { _user, util, game, vk, car,biznes }) => {
    if(_user.biznes != -1) {
        let time = biznes[_user.biznes].stm / 2 / (100000000 / 50000)
        let timeset = Number(_user.strmat) / time
        let clock = "c"
        let str  = `${util.number_format(timeset)} м`
        if(timeset >= 60) {
            clock = "ч"
            timeset = timeset / 60
            str = `${util.number_format(timeset)} ч ${util.number_format(timeset * 60 % 60)} м`
        }
        if(timeset >= 24 && clock == "ч") {
            clock = "д"
            timeset = timeset / 24
            str = `${util.number_format(timeset)} д ${util.number_format(timeset%24)} ч`
        }

        context.send({message:`
Привет ${_user.name}!
🏢 Твой бизнес "${biznes[_user.biznes].name}".
💵 Чистый доход: $${util.number_format(Number(biznes[_user.biznes].doxod))}/мин.
🌲 Стройматериалов на складе: ${util.number_format(Number(_user.strmat))}/${util.number_format(Number(biznes[_user.biznes].stm) / 2)}.
🕢 Переработка полностью завершится через ${str}.`, attachment: biznes[_user.biznes].attachmnent, keyboard: game.getBiznes()})
    }
}
};
