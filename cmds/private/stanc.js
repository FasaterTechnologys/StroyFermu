module.exports = {
tag: ["станции"],
button: ["stanc"],
func: async(context, { _user, util, game, vk, car }) => {
return context.send({message: `
Выбери тип станции
`, keyboard: game.getStanc()})
}
};
