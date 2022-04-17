module.exports = {
    tag: ["Бизнес"],
    button: ["ferm"],
    func: async(context, { vk, _user, game, ferm, util , db, toplv}) => {
      
      if(_user.ferm != -1) {
        context.send({message:`Привет ${_user.name}!\n🕹 Твоя ферма: "${ferm[_user.ferm].name}".\n💳 Баланс кошелька: ${_user.stc} STC | ${ferm[_user.ferm].doxod}/мин.\n⚡ Запас энергии: ${_user.toplv == -1 ? "Нету" : `${_user.toplvdoxod} | ${toplv[_user.toplv].doxod} / ч`}.`, attachment: ferm[_user.ferm].attachmnent, keyboard: game.getFerma()})
      }else{
      db.get().collection('users').updateOne({ uid: _user.uid }, { $set: { menu: 1, } });
      let str = ""
      for(let i = 0; i < ferm.length; i++){
        str += `${i + 1} •  Ферма: ${ferm[i].name}
Доход: ${ferm[i].doxod} STC/мин,
Затрата энергии: ${ferm[i].energ}
----------------
Стоимость: $${util.number_format(ferm[i].stm)}
\n\n\n
`
      }
      context.send({ message:`
Фермы:
  
${str}
Запомни! Если не будет энергии то бизнес не будет приносить прибыль!
  `, keyboard: game.getFi() });
     
    let id = await context.question(`Выбери ферму:`);
    db.get().collection('users').updateOne({ uid: context.peerId }, { $set: { menu: 0 } });
    if(id.toLowerCase() == "назад") return
    if(ferm[Number(id) -1] == undefined )  return context.send({ message:"Вы вернулись в меню", keyboard: game.getPrivateKeyboard() })
    if(Number(ferm[Number(id)-1].stm) > _user.balance ) return context.send({message: `Тебе не хватает $${util.number_format(Number(ferm[Number(id)-1].stm) - _user.balance)}\nЗаработай их нажав на кнопку Работа`, keyboard: game.getPrivateKeyboard()})
    context.send({message:`Ты точно хочешь купить ферму "${ferm[Number(id)-1].name}" за $${util.number_format(ferm[Number(id)-1].stm)}?`, attachment: ferm[Number(id)-1].attachmnent, keyboard: game.getTrue("ферма")})
    let truep = await context.question(`Нажми подтвердить:`);
    if(truep.toLowerCase() == "подтвердить"){
      db.get().collection('users').updateOne({ uid: context.peerId }, { $set: { ferm: (Number(id) -1), balance: _user.balance - Number(ferm[Number(id)-1].stm) } });
    return context.send({ message:`Вы купили ферму ${ferm[Number(id)-1].name} за $${util.number_format(ferm[Number(id)-1].stm)}`, keyboard: game.getPrivateKeyboard() })
    }
       }
    } 
  };
  
  