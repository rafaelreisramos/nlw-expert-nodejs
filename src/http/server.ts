import fastify from 'fastify'
import { createPoll } from './routes/create-poll'

const app = fastify({ logger: true })
app.register(createPoll)
app.listen({ port: 3333 }, () => console.log('Http server running'))
