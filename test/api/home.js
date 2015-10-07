import app from '../../app'
import request from 'supertest'

describe('index', function () {
  it('says 25in25', function () {
    request(app)
      .get('/')
      .expect(200)
      .expect(/25in25/)
  })
})
