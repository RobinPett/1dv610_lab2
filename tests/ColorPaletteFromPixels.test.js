// Tests extracting color values from image.
// Based on how many colors that shoudl be extracted.

import { ColorPaletteFromPixels } from "../src/js/ColorPaletteFromPixels"

// Setup mock pixels Red, green and blue
const redPixel = [255, 0, 0, 255]
const greenPixel = [0, 255, 0, 255]
const bluePixel = [0, 0, 255, 255]

const pixels = [redPixel, greenPixel, bluePixel]

const mockRgbaValues = []

for (let i = 0; i < 100; i++) {
    pixels.forEach(pixel => {
        mockRgbaValues.push(pixel)
    })
}
const numberOfColorsToExtract = 3

describe('ColorPaletteFromPixels class test', () => {
    let colorPaletteFromPixels
    beforeAll(() => {
        colorPaletteFromPixels = new ColorPaletteFromPixels(mockRgbaValues, numberOfColorsToExtract)
    })  
    test('Get 3 dominatn colors from pixel data', () => {
        const extractedColors = colorPaletteFromPixels.getDominantColors()
        expect(extractedColors.length).toBe(3)
        expect(typeof extractedColors[0]).toBe('object')
    })
})
