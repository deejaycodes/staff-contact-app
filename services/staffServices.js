const Worker= require('../model/worker')
class staffServices {
    addStaff(data){
     return Worker.create(data)
    }
    async readStaff(){
        const allContact= await Worker.find()
        return allContact
    }
    async readStaffByTitle(title){
        const contact = await Worker.find({title})
        return contact   
    }
    async updateStaff(_id,data){
        const newContact= await Worker.findByIdAndUpdate({_id},{$set:data})
    return newContact;
    }

    async deleteOneContact(_id){
        const contact = await Worker.findByIdAndDelete(_id)
        return contact
    }
}
module.exports=staffServices