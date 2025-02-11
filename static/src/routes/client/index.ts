import { FastifyPluginAsync } from 'fastify';

const client: FastifyPluginAsync = async (fastify, _opts): Promise<void> => {
  fastify.get('/', async function (request, _reply) {
    const client = { name: 'foo', age: 31 };

    request.log.info(client);
    return client;
  });
};

export default client;
