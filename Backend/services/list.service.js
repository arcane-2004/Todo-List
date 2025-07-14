const listModel = require('../models/list.model');

module.exports.createList = async({
    todo, user
})=>{
    if(!todo || !user){
        throw new Error('All fields are required');
    }

    const list = await listModel.create({
        todo,
        user,
    })
    return list;
}