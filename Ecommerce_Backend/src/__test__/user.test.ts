import supertest from 'supertest'
import server from '../app'

describe("User routes test",()=>{
    test('should get a list of users', async () => {
        const res = await supertest(server).get('/user/')
        expect(res.status).toEqual(200)
        expect(res.type).toEqual(expect.stringContaining('json'))
        expect(res.body).toHaveProperty('users')
      });
})