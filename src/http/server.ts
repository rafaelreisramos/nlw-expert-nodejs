import dotenv from 'dotenv'
dotenv.config()
import fastify from 'fastify'
import cookie from '@fastify/cookie'
import { createPoll } from './routes/create-poll'
import { getPoll } from './routes/get-poll'
import { voteOnPoll } from './routes/vote-on-poll'

const app = fastify({ logger: true })
app.register(cookie, {
  secret: process.env.APP_SECRET,
  hook: 'onRequest',
  parseOptions: {},
})
app.register(createPoll)
app.register(getPoll)
app.register(voteOnPoll)
app.listen({ port: 3333 }, () => console.log('Http server running'))
