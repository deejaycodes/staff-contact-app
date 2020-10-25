const expect = require('expect')
const request = require('supertest')
const Developer = require('../model/worker')
const app = require('../index')


describe('POST/contacts', () => {
    it('should expect error',(done)=>{
        request(app)
        .post('/staff/addcontact')
        .send({})
        .expect(400)
        .end((err,res)=>{
            if(err){
                return done(err)
            }
            Developer.find().then((contacts)=>{
                expect(contact.length).toBe(0)
            })
            done()
        })
    })
})

describe('GET/contacts', () => {
    it('should get contacts',(done)=>{
        request(app)
        .get('/staff/all')
        .expect(200)
        .end(done)
    })
})
describe('delete/contacts',()=> {
it('should update the app', (done)=> {
    request(app)
    .patch('/staff/delete')
    .expect(200)
    .end(done)
})
})
describe('Patch/contacts',()=> {
    it('should update contacts',(done)=> {
        request(app)
        .patch(app)
        .expect(200)
        .end(done)
    })
})
