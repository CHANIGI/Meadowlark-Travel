'use strict'

const { default: JestHasteMap } = require('jest-haste-map')
const { default: test } = require('node:test')
const handlers = require('../handlers')

test('home page renders', () => {
  const req = {}
  const res = {render: jest.fn()}
  handlers.home(req, res)
  expect(res.render.mock.calls.length).toBe(1)           
  expect(res.render.mock.calls[0][0]).toBe('home')
})

test('about page renders with fortune', () => {
  const req = {}
  const res = {render: jest.fn()}
  handlers.about(req, res)
  expect(res.render.mock.calls.length).toBe(1)
  expect(res.render.mock.calls[0][0].toBe('about'))
  expect(res.render.mock.calls[0][1])
  .toEqual(expect.objectContainig({fortune: expect.stringMatching(/\W/)}))
})

