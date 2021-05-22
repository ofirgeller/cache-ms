import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from './../src/app.module';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';

const endpoint = '/'

describe('AppController (e2e)', () => {
  let app: NestFastifyApplication;

  beforeAll(async () => {

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication<NestFastifyApplication>(
      new FastifyAdapter(),
    );

    await app.init();
    await app.getHttpAdapter().getInstance().ready();
  });

  beforeEach(async () => {
    await app.inject({
      url: endpoint + '/reset'
    })
  });

  it('returns 404 for non-existing key', async () => {
    const result = await app
      .inject({
        method: 'GET',
        url: endpoint,
        query: { key: 'key1' }
      });

    expect(result.statusCode).toEqual(404);
  })

  it('round trips a value, delte it and fail to retrive it', async () => {
    const setResult = await app
      .inject({
        method: 'POST',
        url: endpoint,
        query: { key: 'key1', value: 'val1' }
      });

    expect(setResult.statusCode).toBe(201);

    const getResult = await app
      .inject({
        method: 'GET',
        url: endpoint,
        query: { key: 'key1' }
      });

    expect(getResult.statusCode).toEqual(200);

    const deleteResult = await app
      .inject({
        method: 'DELETE',
        url: endpoint,
        query: { key: 'key1' }
      });

    expect(deleteResult.statusCode).toEqual(204);

    const afterDeleteGetResult = await app
      .inject({
        method: 'GET',
        url: endpoint,
        query: { key: 'key1' }
      });

    expect(afterDeleteGetResult.statusCode).toEqual(404);

  })

});
