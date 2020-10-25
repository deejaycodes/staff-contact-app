const express = require('express')
const router = express.Router()
const staffController = require('../controllers/staffControllers')
const staff= new staffController()
const auth = require('../middleware/auth')

router.post('/addcontact',(req,res)=> {
    staff.addContact(req,res)
})

router.get('/all',(req,res)=> {
    staff.readContact(req,res)
})

router.get('/title', (req,res)=> {
    staff.readContactByCategories(req,res)
})

router.patch('/update/:id',auth,(req,res)=>{
    staff.updateStaffContacts(req,res)
})

router.delete('/delete/:id',auth,(req,res)=>{
 staff.deleteOneContact(req,res)
})

module.exports = router