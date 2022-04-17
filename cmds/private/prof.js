module.exports = {
tag: ["проф"],
button: ["nocommand"],
func: async(context, { _user, util, game, vk, car }) => {
let str = ""
let attachment = 0

if(_user.car != "") {
    attachment = Number(_user.penis)
    str = "\n🚗Твоя машина: "
}
return context.send({message: `
Привет ${_user.name}!
💰 Твой баланс $${util.number_format(_user.balance)}
💳 Твой кошелёк ${util.number_format(_user.stc)} STC
${str}
`, attachment: str != "" ? car[attachment].attachment : "photo-208942376_457239216", keyboard: game.getPrivateKeyboard()})
}
};
