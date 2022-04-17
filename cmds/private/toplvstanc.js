module.exports = {
    tag: ["Топливные станции"],
    button: ["toplvnstanc"],
    func: async(context, { vk, _user, game, toplv, util , db}) => {
      
      if(_user.toplv != -1) {
        await context.send({message:`Привет ${_user.name}!\n🛢 Твоя топливная станция: "${toplv[_user.toplv].name}".\n🧰 Запас топлива: ${util.number_format(_user.toplvdoxod)}🛢.\n🔄 Оборот: ${toplv[_user.toplv].doxod}🛢/ч.\n💰 Сумма налога: $${util.number_format(_user.nalog)}.\n${_user.nalog > toplv[_user.toplv].stm * 50 /100 ? "❗ Высокая сумма налога! Станция отключена ❗": "" }`, attachment: toplv[_user.toplv].attachmnent, keyboard: game.getStancInfo("selltoplvn")})
      }else{
      db.get().collection('users').updateOne({ uid: _user.uid }, { $set: { menu: 1, } });
      let str = ""
      for(let i = 0; i < toplv.length; i++){
        str += `${i + 1} •  Топливная станция: ${toplv[i].name}
  Доход: ${util.number_format(toplv[i].doxod)}🛢/мин,
  ----------------
  Стоимость: $${util.number_format(toplv[i].stm)}
  \n\n\n
  `
      }
      context.send({ message:`
      Топливная станции:
  
  ${str}
  
  `, keyboard: game.getFri() });
     
    let id = await context.question(`Выбери топливную станцию:`);
    db.get().collection('users').updateOne({ uid: context.peerId }, { $set: { menu: 0 } });
    if(id.toLowerCase() == "назад") return
    if(toplv[Number(id) -1] == undefined ) return context.send({ message:"Вы вернулись в меню", keyboard: game.getPrivateKeyboard() })
    if(Number(toplv[Number(id)-1].stm) > _user.balance ) return context.send({message: `Тебе не хватает $${util.number_format(Number(toplv[Number(id)-1].stm) - _user.balance)}\nЗаработай их нажав на кнопку Работа`, keyboard: game.getPrivateKeyboard()})
    context.send({message:`Ты точно хочешь купить топливную станцию "${toplv[Number(id)-1].name}" за $${util.number_format(toplv[Number(id)-1].stm)}?`, attachment: toplv[Number(id)-1].attachmnent, keyboard: game.getTrue("Топливные станции")})
    let truep = await context.question(`Нажми подтвердить:`);
    if(truep.toLowerCase() == "подтвердить"){
      db.get().collection('users').updateOne({ uid: context.peerId }, { $set: { toplv: (Number(id) -1), balance: _user.balance - Number(toplv[Number(id)-1].stm) } });
    return context.send({ message:`Вы купили топливную станцию ${toplv[Number(id)-1].name} за $${util.number_format(toplv[Number(id)-1].stm)}`, keyboard: game.getPrivateKeyboard() })
    }
       }
    } 
  };
  
  