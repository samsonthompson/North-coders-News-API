const app = require('../app')
const request = require('supertest')
const db = require('../db/connection')
const seed = require('../db/seeds/seed')
const data = require('../db/data/test-data/index')
const endPoints = require('../endpoints.json')


beforeEach(() => seed(data));
afterAll(() => db.end());

    describe('/api/topics', () => {
        it('should respond with an array of topic objects, each with properties: slug and description', () => {
            return request(app)
            .get('/api/topics')
            .expect(200)
            .then(({body}) => {
                const topics = body.topics
                expect(topics.length).toBeGreaterThan(0)
                topics.forEach((element) => {
                    expect(element).toEqual(
                        expect.objectContaining({
                            slug: expect.any(String),
                            description: expect.any(String)
                        })
                    )
                })
            })
        })
    })


    describe('/api', () => {
        it('should respond with an object describing all the available endpoints on your API', () => {
            return request(app)
            .get('/api')
            .expect(200)
            .then(({body}) => {
                expect(body.endpoints).toEqual(endPoints)    
            })
        })
    })

    describe('/api/articles/:id', () => {
        it('should get an article by _Id and respond with the corresponding article object with the correct properties', () => {
            return request(app)
            .get('/api/articles/1')
            .expect(200)
            .then(({body}) => {
                actualArticle = body.article
                
                const expectedArticle = 
                [{
                    article_id: 1,
                    title: 'Living in the shadow of a great man',
                    topic: 'mitch',
                    author: 'butter_bridge',
                    body: 'I find this existence challenging',
                    created_at: '2020-07-09T20:11:00.000Z',
                    votes: 100,
                    article_img_url: 'https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700'
                }]
                expect(actualArticle).toEqual(expectedArticle) 
            })
        })
        it('should handle a VALID artile_id that doesnt exist with a 404 error', () => {
            return request(app)
            .get('/api/articles/1899991')
            .expect(404) 
            .then(({body}) => {
                expect(body.message).toBe('Article not found')
            })

        })
        it('should handle an INVALID artile_id with the 400 error', () => {
            return request(app)
            .get('/api/articles/banana')
            .expect(400)
            .then(({body}) => {
                expect(body.message).toBe('Invalid request')
            })
        })
    })

