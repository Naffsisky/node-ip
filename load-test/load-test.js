import http from 'k6/http'
import { check, sleep } from 'k6'
import { Counter, Gauge, Rate, Trend } from 'k6/metrics'

// Custom metrics
const myCounter = new Counter('total_requests') // Menghitung total permintaan
const myGauge = new Gauge('current_response_time') // Melacak waktu respons saat ini
const myRate = new Rate('successful_requests') // Menghitung rasio permintaan sukses
const myTrend = new Trend('response_time_distribution') // Menganalisis distribusi waktu respons

export const options = {
  stages: [
    { duration: '30s', target: 1000 },
    { duration: '3m', target: 1000 },
    { duration: '30s', target: 0 },
  ],
  ext: {
    influxdb: {
      pushInterval: '10s', // meningkatkan interval flush ke 10 detik
    },
  },
}

export default function () {
  const response = http.get('http://target_url') // Ganti target_url dengan URL

  // Menambahkan data ke custom metrics
  myCounter.add(1) // Tambah 1 untuk setiap permintaan yang dilakukan
  myGauge.add(response.timings.duration) // Set nilai gauge ke waktu respons saat ini
  myRate.add(response.status === 200) // Tambahkan true jika status 200, false jika tidak
  myTrend.add(response.timings.duration) // Tambahkan waktu respons ke distribusi trend

  // Mengecek status dan waktu respons
  check(response, {
    'status is 200': (r) => r.status === 200,
    'response time < 200ms': (r) => r.timings.duration < 200,
  })

  // random sleep
  sleep(Math.random() * 2)
}
