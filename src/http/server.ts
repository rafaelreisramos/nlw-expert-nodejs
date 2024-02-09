import fastify from 'fastify'
import cookie from '@fastify/cookie'
import websocket from '@fastify/websocket'
import { createPoll } from './routes/create-poll'
import { getPoll } from './routes/get-poll'
import { voteOnPoll } from './routes/vote-on-poll'
import { pollResults } from './ws/poll-results'

const app = fastify({ logger: true })
app.register(cookie, {
  secret: process.env.APP_SECRET,
  hook: 'onRequest',
  parseOptions: {},
})
app.register(websocket)
app.register(createPoll)
app.register(getPoll)
app.register(voteOnPoll)
app.register(pollResults)
app.listen({ port: 3333 }, () => console.log('Http server running.'))
