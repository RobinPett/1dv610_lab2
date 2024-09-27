// Tests extracting color values from image.
// Based on how many colors that shoudl be extracted.

import { ColorPaletteFromPixels } from "../src/js/ColorPaletteFromPixels"

const redPixel = [255, 0, 0, 255]
const greenPixel = [0, 255, 0, 255]
const bluePixel = [0, 0, 255, 255]

const mockRgbaValues = [ redPixel, greenPixel, bluePixel, redPixel, greenPixel, bluePixel, redPixel, greenPixel, bluePixel, redPixel, greenPixel, bluePixel ]
const numberOfColorsToExtract = 3

describe('ColorPaletteFromPixels class test', () => {
    test('Extracting colors from rgba values', () => {
        const colorPaletteFromPixels = new ColorPaletteFromPixels(mockRgbaValues, numberOfColorsToExtract)
        const extractedColors = colorPaletteFromPixels.getDominantColors()

        expect(extractedColors.length).toBe(3)
        expect(typeof extractedColors[0]).toBe('object')
    })
})
