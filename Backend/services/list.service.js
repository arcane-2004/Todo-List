const listModel = require('../models/list.model');

module.exports.createList = async({
    todo, userId
})=>{
    if(!todo || !userId){
        throw new Error('All fields are required');
    }

    const list = await listModel.create({
        todo,
        userId
    })
    return list;
}