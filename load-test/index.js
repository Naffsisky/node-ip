const axios = require('axios')
const { performance } = require('perf_hooks')

// Konfigurasi
const url = 'http://lb.prinafsika.world'
const numberOfRequests = 200 // Jumlah permintaan yang akan dikirimkan
const requestInterval = 200 // Waktu tunggu antara setiap permintaan (ms)

// Variabel untuk menyimpan hasil
let responses = {}
let latencies = []

const sendRequest = async () => {
  const startTime = performance.now()

  try {
    const response = await axios.get(url)
    const endTime = performance.now()
    const latency = endTime - startTime

    const serverIP = response.data.match(/Your server public IPv4 is: (\S+)/)[1]

    // Menyimpan latensi dan jumlah permintaan untuk server yang merespons
    if (!responses[serverIP]) {
      responses[serverIP] = { count: 0, totalLatency: 0 }
    }

    responses[serverIP].count += 1
    responses[serverIP].totalLatency += latency
    latencies.push(latency)

    console.log(`Request to ${serverIP} | Latency: ${latency.toFixed(2)} ms`)
  } catch (error) {
    console.error('Error:', error.message)
  }
}

const runTest = async () => {
  console.log(`Starting load test with ${numberOfRequests} requests...`)

  for (let i = 0; i < numberOfRequests; i++) {
    await sendRequest()
    await new Promise((resolve) => setTimeout(resolve, requestInterval))
  }

  // Menampilkan hasil
  console.log('\n=== Load Test Results ===')
  Object.keys(responses).forEach((ip) => {
    const { count, totalLatency } = responses[ip]
    const avgLatency = totalLatency / count
    console.log(`Server ${ip} received ${count} requests. Average Latency: ${avgLatency.toFixed(2)} ms`)
  })

  // Menentukan server yang paling banyak menerima request
  const mostHitServer = Object.keys(responses).reduce((a, b) => (responses[a].count > responses[b].count ? a : b))
  console.log(`\nServer with the most requests: ${mostHitServer}`)
}

runTest()
