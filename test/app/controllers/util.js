
const mockRequest = (body, url) => {
  const req = {}
  req.body = body || jest.fn().mockReturnValue(req)
  req.params = jest.fn().mockReturnValue(req)
  req.url = url
  return req
}

const mockResponse = () => {
  const res = {}
  res.send = jest.fn().mockReturnValue(res)
  res.status = jest.fn().mockReturnValue(res)
  res.json = jest.fn().mockReturnValue(res)
  return res
}

module.exports = {
  mockRequest,
  mockResponse
}