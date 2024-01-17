const app = require('../app')
const request = require('supertest')
const db = require('../db/connection')
const seed = require('../db/seeds/seed')
const data = require('../db/data/test-data/index')
const endPoints = require('../endpoints.json')
const jestsorted = require('jest-sorted')

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

    describe('/api/article/:id', () => {
        it('should get an article by _Id and respond with the corresponding article object with the correct properties', () => {
            return request(app)
            .get('/api/article/1')
            .expect(200)
            .then(({body}) => {
                const [article] = body.article
                expect(article).toMatchObject({
                    article_id: expect.any(Number),
                    title: expect.any(String),
                    topic: expect.any(String),
                    author: expect.any(String),
                    body: expect.any(String),
                    created_at: expect.any(String),
                    votes: expect.any(Number),
                    article_img_url: expect.any(String)

                })
            })
        })
        it('should handle a VALID artile_id that doesnt exist with a 404 error', () => {
            return request(app)
            .get('/api/article/1899991')
            .expect(404) 
            .then(({body}) => {
                expect(body.message).toBe('Article not found')
            })

        })
    })

    describe('/api/articles', () => {
        it(`it should responds with an articles array of article objects, each of which should have the correct properties`, () => {
            return request(app)
            .get('/api/articles')
            .expect(200)
            .then(({body}) => {
                const articles = body.articles
                expect(articles.length).toBeGreaterThan(0)
                expect(articles).toBeSortedBy('created_at', {descending: true})
                articles.forEach((article) => { 
                expect(article).toMatchObject({
                    author: expect.any(String),
                    title: expect.any(String),
                    article_id: expect.any(Number),
                    topic: expect.any(String),
                    created_at: expect.any(String),
                    votes: expect.any(Number),
                    article_img_url: expect.any(String),
                    comment_count: expect.any(String)
                  })
                })
            })
        })
    })

    describe('/api/articles/:article_id/comments', () => {
        it('should respond with an array of comments for a given article_id of which each comment should have the correct properties', () => {
            return request(app)
            .get('/api/articles/3/comments')
            .expect(200)
            .then(({body}) => {
                const comments = body.comments
                expect(comments.length).toBeGreaterThan(0)
                expect(comments).toBeSortedBy('created_at', {descending: true})
                comments.forEach((comment) => { 
                    expect(comment).toMatchObject({
                        comment_id: expect.any(Number),
                        votes: expect.any(Number),
                        created_at: expect.any(String),
                        author: expect.any(String),
                        body: expect.any(String),
                        article_id: expect.any(Number)
                      })
                    })
                 })
            })
            it('should handle a VALID artile_id responding with an empty array with a 404 error', () => {
                return request(app)
                .get('/api/articles/4/comments')
                .expect(404) 
                .then(({body}) => {
                    expect(body.message).toBe('No comments found for this article') // i don't know if its proper practice to allow for information error messages or whether to stick to standardised "Not found" type of langauge
                })
            })
            it('should handle a VALID artile_id not currenntly indexed in the database with a 404 error', () => {
                return request(app)
                .get('/api/articles/476/comments')
                .expect(404) 
                .then(({body}) => {
                    expect(body.message).toBe(`Article ID doesn't currently exist`)
                })
            })
    })