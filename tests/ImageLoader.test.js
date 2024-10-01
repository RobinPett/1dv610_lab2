/**
 * Test for extracting pixels from images.
 * Mocked ImageElement and CanvasElement in setup.js
 * ChatGPT was used to get help with mocking.
 */

import { ImageToPixels } from '../src/js/ImageToPixels'

describe('ImageToPixels class test', () => {
    let imageToPixels

    beforeAll(() => {
        imageToPixels = new ImageToPixels('mockUrl')
    })

    test('Extracting pixels from image', async () => {
        const pixels = await imageToPixels.getPixels()
        expect(Array.isArray(pixels)).toBe(true)
        expect(pixels.length).toBeGreaterThan(0)
    })

    test('Get image info', async () => {
        const imageElement = imageToPixels.getImageElement()

        expect(typeof imageElement).toBe('object')
    })
})