const app = require('./../index')
const supertest = require('supertest')
const request = supertest(app)

describe('Articles Test Endpoints', () => {
    const getUserAuthorizationToken = async () => {
        const userData = {
            user: {
                username: 'test-user',
                email: 'test-user@test.pl',
                password: 'password',
            }
        };

        const { body: res } = await request.post('/api/users').send(userData);
        if (res?.user?.token) {
            return res.user.token;
        }

        const { body: user } = await request.post('/api/users/login').send({
            user: {
                email: userData.user.email,
                password: userData.user.password,
            }
        });
        return user?.user?.token;
    };

    const createMatureContentArticle = async () => {
        const matureContentArticleData = {
            article: {
                slug: 'test-mature-content',
                title: 'test-mature-content',
                description: 'test-mature-content',
                body: 'test-mature-content',
                isMatureContent: true,
            }
        }
        await request.post('/api/users').send(matureContentArticleData);
    }

    it('should get a list of mature articles', async () => {
        const token = await getUserAuthorizationToken();
        await createMatureContentArticle();

        const res = await request
            .get('/api/articles/mature')
            .set({ Authorization: `Token ${token}` })

        const articles = res.body.articles;

        expect(res.status).toBe(200);
        expect(articles.length).toBeGreaterThan(0);
        articles.forEach(article => {
            expect(article.title).toBeDefined();
            expect(article.slug).toBeDefined();
            expect(article.description).toBeDefined();
            expect(article.body).toBeDefined();
            expect(article.isMatureContent).toBeDefined();
            expect(article.isMatureContent).toBeTruthy();
        });
    })
})
