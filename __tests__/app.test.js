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

    describe('/api/articles', () => {
        it('should get an article by _Id and respond with the corresponding article object with the correct properties', () => {
            return request(app)
            .get('/api/articles/1')
            .expect(200)
            .then(({body}) => {
                const article = body.article
                console.log(article)
                expect(article.length).toEqual(1)
                article.forEach((element) => {
                    expect(element).toEqual(
                        expect.objectContaining({
                            author: expect.any(String),
                            title: expect.any(String),
                            article_id: expect.any(Number),
                            body: expect.any(String),
                            topic: expect.any(String),
                            created_at: expect.any(String),
                            votes: expect.any(Number),
                            article_img_url: expect.any(String),
                        })
                    )
                })
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
        it.only('should handle an INVALID artile_id with the 400 error', () => {
            return request(app)
            .get('/api/articles/banana')
            .expect(400)
            .then(({body}) => {
                expect(body.message).toBe('Invalid request')
            })
        })
    })

