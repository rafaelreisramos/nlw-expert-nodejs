import { randomUUID } from 'node:crypto'
import { z } from 'zod'
import { prisma } from '../../lib/prisma'
import { FastifyInstance } from 'fastify'
import { redis } from '../../lib/redis'

export async function voteOnPoll(app: FastifyInstance) {
  app.post('/polls/:pollId/vote', async (request, reply) => {
    const voteOnPollParams = z.object({
      pollId: z.string().uuid(),
    })
    const voteOnPollBody = z.object({
      pollOptionId: z.string().uuid(),
    })
    const { pollId } = voteOnPollParams.parse(request.params)
    const { pollOptionId } = voteOnPollBody.parse(request.body)
    let sessionId = request.cookies.sessionId
    if (!sessionId) {
      sessionId = randomUUID()
      reply.setCookie('sessionId', sessionId, {
        path: '/',
        maxAge: 60 * 60 * 24 * 30, // 30 days
        signed: true,
        httpOnly: true,
      })
    }
    const userPreviousVoteOnPoll = await prisma.vote.findUnique({
      where: {
        pollId_sessionId: {
          sessionId,
          pollId,
        },
      },
    })
    if (userPreviousVoteOnPoll) {
      if (userPreviousVoteOnPoll.pollOptionId === pollOptionId)
        return reply
          .status(400)
          .send({ message: 'You already voted on this poll.' })
      await prisma.vote.delete({
        where: {
          id: userPreviousVoteOnPoll.id,
        },
      })
      await redis.zincrby(pollId, -1, userPreviousVoteOnPoll.pollOptionId)
    }
    await prisma.vote.create({
      data: {
        sessionId,
        pollId,
        pollOptionId,
      },
    })
    await redis.zincrby(pollId, 1, pollOptionId)
    return reply.status(201)
  })
}
