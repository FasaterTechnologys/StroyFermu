module.exports = {
tag: ["Снять деньги"],
button: ["doxodbiznes"],
func: async(context, { _user, util, game, vk, car, db, biznes, toplv, user }) => {
    if(_user.biznes != -1) {
        if(Number(_user.doxod) == 0) return context.send("Баланс бизнеса пуст")
        db.get().collection('users').updateOne({ uid: context.peerId }, { $set: { doxod: 0 } , $inc: { balance: +Number(_user.doxod)  } });
        const puser = await user.getUser(context.peerId);
        context.send(`${_user.name} ты снял с бизнеса: $${util.number_format(_user.doxod)}.`)
        context.send({message:`🏢 Твой бизнес "${biznes[puser.biznes].name}".\n💳 Баланс бизнеса: $${util.number_format(puser.doxod)}.\n🚚 Запас топлива: 🛢${puser.toplv == -1 ? "Нету." : `${puser.toplvdoxod} | $${toplv[puser.toplv].doxod}/ч.`}\n💵 Чистый доход: $${util.number_format(Number(biznes[puser.biznes].doxod))}/мин.\n🌲 Стройматериалов на складе: ${util.number_format(Number(puser.strmat))}/${util.number_format(Number(biznes[puser.biznes].stm) / 2)}.`, attachment: biznes[puser.biznes].attachmnent, keyboard: game.getBiznes()})
    }
}
};
