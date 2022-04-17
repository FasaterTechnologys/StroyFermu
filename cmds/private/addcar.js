module.exports = {
    tag: ["caradd"],
    button: ["biznesd"],
    func: async(context, { vk, _user, game, biznes, util , db}) => {
    let i = 0;
    let pens = []
    while(true){
        i++;
        let id = await context.question(`Введи название`);
        if(id == "стоп") console.log(pens)
        let attachment = await context.question(`Введи сслыку на фото`);
        let shans = await context.question(`Введи редкость`);
        pens[i] = {name: id, attachment: attachment, shans: shans}


    }
      
    
    } 
};
  
  