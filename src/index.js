import express from 'express'
import requestIp from 'request-ip'

const app = express()
const port = 5077

app.get('/', async (req, res) => {
  try {
    const { publicIpv4 } = await import('public-ip')

    const ip4 = await publicIpv4()
    const clientIp = requestIp.getClientIp(req)

    res.send(`
      Your client IP address is: ${clientIp}
      Your server public IPv4 is: ${ip4}
      SERVER BACKUP
    `)

    console.info(`Client IP: ${clientIp}`)
  } catch (error) {
    console.error('Error fetching IP:', error)
    res.status(500).send('Unable to retrieve IP address: ' + error.message)
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
