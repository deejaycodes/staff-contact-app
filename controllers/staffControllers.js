const staffServices= require('../services/staffServices')
const Staff=new staffServices()

  class staffController {
      
      async addContact(req,res){
          const {name,email,cellphone}=req.body
          let {title}= req.body
        
    
          const params= {
              title,
              name,
              email,
              cellphone
          }
          if (isNaN(params.cellphone)) {
              return res.status(400).send({error:"please only insert a number into cellphone path"})
          }
          try {
              const newContact= await Staff.addWorker(params)
              if (!newContact) {
                 return res.status(400).send({
                      code:400,
                      error:true,
                      message:"Cannot add Contact, please make sure you entered the require details{name,emails} ",
                      data:newContact
                  })
              }
              //generateAuthtoken is a mongoose method that was used under the model with a mongoose
              const token = await newContact.generateAuthtoken()
              return res.status(201).send({
                error: false,
                code: 200,
                message: 'Contact  added Succesfully',
                data: newContact,
                token
            })
          } catch (error) {
              res.status(500).send({
                    error:true,
                    message:"internal server error",
                    errormessage:error
                })
              }
          }
          

          async readContact(req,res){
            try {
              const allContact= await Staff.readWorker()
                if(!allContact){
                    res.status(404).send({
                        code:404,
                        message:'file not found',
                        error:true
                    })
                }
                res.status(200).send({
                    code:200,
                    data:allContact,
                    error:false,
                    message:"All contact found"
                })
            } catch (error) {
                res.status(500).send({
                    error:true,
                    code:500,
                    errormessage:error
                })
            }
          }

         
          async readContactByCategories(req,res){
            let {title}= req.body
            title= title.trim()
            const params = {title}
        
            const contact = await Staff.readWorkerByTitle(params.title)
            try {
                if (contact.length===0) {
                    return res.status(404).send({
                        code:404,
                        error:true,
                        message:"no contact found,check your input for proper spacing,e.g('senior staff')"
                    })
               }
            } catch (error) {
                res.status(500).send({
                    error:true,
                    code:500,
                    errormessage:error
                })
            }
        
            res.send(contact)
        }

       async updateWorkerContacts(req,res){
           const _id = req.params.id
           const {title,email,cellphone,name} = req.body
           const allowedUpdates ={
               title,
               email,
               cellphone,
               name
           }
           try {
            const updatedContact=await Staff.updateWorker(_id,allowedUpdates)
            if(!updatedContact){
                return res.status(404).send({
                    code:404,
                    message:'file not found',
                    error:true,
                })
            }
            res.status(201).send({
             code:200,
             error:false,
             message:"Contact updated sucessfully",
             data:updatedContact

            })
           } catch (error) {
               res.status(500).send({
                   code:500,
                   error:false,
                   message:'Server error',
                   errormessage:error
               })
           }
    }


    async deleteOneContact(req,res){
        const _id= req.params.id
        try {
            const contact =await Staff.deleteOneContact(_id)
            if (!contact) {
                return res.status(404).send({
                    code:404,
                    error:true,
                    message:"no contact found,"
                })
            }
            res.status(200).send({
                code:200,
                error:false,
                message:"Contact deleted sucessfully",
                data:contact
        })
    }catch (error) {
            res.status(500).send({
                code:500,
                error:false,
                message:'internal Server error',
                errormessage:error
            })
        }
    }
    
   }

  
module.exports = staffController