// Test initiating class with and whithout image url

import http from 'node:http'
import fs from 'node:fs'
import path, { resolve } from 'node:path'
import { ImageToPixels } from '../src/js/ImageToPixels'

let httpImageServer
const imagePath = path.resolve(__dirname, 'img/circle.png')
const imageToPixelsScript = path.resolve(__dirname, '../src/js/index.js')

describe('ImageToPixels class', () => {

    beforeAll(async () => {
        // Create a mock http server to serve image
        httpImageServer = http.createServer((req, res) => {
            // Serve script file to load modules
            if (req.url === '/js/index.js') {
                fs.readFile(imageToPixelsScript, (error, data) => {
                    if (error) {
                        res.writeHead(404)
                        res.end(JSON.stringify(error))
                        return
                    }
                    res.writeHead(200, { 'Content-Type': 'application/javascript' })
                    res.end(data)
                })
                // Serve image file
            } else if (req.url === '/img/circle.png') {
                fs.readFile(imagePath, (error, data) => {
                    if (error) {
                        res.writeHead(404)
                        res.end(JSON.stringify(error))
                        return
                    }
                    res.writeHead(200, { 'Content-Type': 'image/png' })
                    res.end(data)
                })
            }

        }).listen(8080)
    
        // Ensure the server is running before the test starts
    await new Promise((resolve) => httpImageServer.on('listening', resolve))
    })

    afterAll(async() => {
        await new Promise((resolve) => httpImageServer.close(resolve))
    })



    it('should fetch image and create image element', async () => {
        await page.setContent(`
            <html>
                <head>
                    <title>Test page</title>
                    <script type='module' src='http://localhost:8080/js/index.js'></script>
                </head>
                <body>
                    <h1>Test page</h1>
                </body>
            </html>
            `)

        // Wait for script to load
        await page.waitForFunction(() => typeof window.ImageToPixels !== 'undefined')
        
        const test = await page.evaluate(() => {
            const imageToPixels = new window.ImageToPixels()
            return imageToPixels.getTest()
        })

        expect(test).toBe('Test ok')
    }, 10000)
})