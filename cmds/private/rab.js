module.exports = {
    tag: ["раб"],
    button: ["rab"],
    func: async(context, { _user, util, game, vk, car }) => {
    let url = `https://vk.me/-191590148?ref=${_user.uid}`
    let shortref = (await vk.get()._vk.api.utils.getShortLink({ url })).short_url
    return context.send({message: `
Привет ${_user.name}!
👔Твоя задача искать себе рабов, а я буду давать тебе за это награду.
👥Твоя ссылка: ${shortref}
    `, keyboard: game.getPrivateKeyboard()})
    }
    };
    