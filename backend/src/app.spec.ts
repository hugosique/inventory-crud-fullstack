import { expect, test, describe } from 'vitest'
import { app } from './app'

describe('App', () => {
  test('should return hello world', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/'
    })

    expect(response.statusCode).toBe(200)
    expect(response.json()).toEqual({ hello: 'world' })
  })
})
