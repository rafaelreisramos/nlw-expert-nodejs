import fastify from 'fastify'
import { createPoll } from './routes/create-poll'
import { getPoll } from './routes/get-poll'

const app = fastify({ logger: true })
app.register(createPoll)
app.register(getPoll)
app.listen({ port: 3333 }, () => console.log('Http server running'))
