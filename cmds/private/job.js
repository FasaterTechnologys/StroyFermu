module.exports = {
tag: ["работа"],
button: ["job"],
func: async(context, { _user, util, game, vk, car }) => {
return context.send({message: `
🕹Выбери где хочешь работать, на выбор у тебя 3 работы🏢
`, keyboard: game.getJob()})
}
};
