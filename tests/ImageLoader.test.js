// Test initiating class with and whithout image url

import http from 'node:http'
import fs from 'node:fs'
import path from 'node:path'
import { ImageLoader } from "../src/js/ImageLoader"

let httpImageServer

beforeEach(async () => {
    httpImageServer = http.createServer((request, res) => {
        const imagePath = path.resolve(__dirname, 'img/circle.png')
        fs.readFile(imagePath, (error, data) => {
            if (error) {
                res.writeHead(500, { 'Content-Type': 'text/plain' })
                res.end('Error loading image')
                return
            }

            res.writeHead(200, { 'Content-Type': 'image/png' })
            res.end(data)
        })
    })
    httpImageServer.listen(8080)
})

afterEach(async () => {
    httpImageServer.close()
})

describe('Fetch image from sevrer', () => {
    it('should fetch image from server', async () => {
        const response = await fetch('http://localhost:8080')

        expect(response.headers.get('Content-Type')).toBe('image/png')
        const imageURL = await response.arrayBuffer()
        const imageBuffer = Buffer.from(imageURL)

        console.log(imageBuffer)
    })
})