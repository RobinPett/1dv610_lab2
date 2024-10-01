/**
 * Tests extracting color values from image.
 * Based on how many colors that should be extracted.
 */

import { ColorPaletteFromPixels } from "../src/js/ColorPaletteFromPixels"
import { testImage } from "./img/testImage"

describe('ColorPaletteFromPixels class test', () => {
    let colorPaletteFromPixels
    let numberOfColorsToExtract = 3
    
    test('Get 3 dominant colors from pixel data', () => {
        const colorPaletteFromPixels = new ColorPaletteFromPixels(testImage, numberOfColorsToExtract)
        const extractedColors = colorPaletteFromPixels.getColorPalette()
        expect(extractedColors.length).toBe(3)
        expect(typeof extractedColors[0]).toBe('object')
    })

    test('Get 5 dominant colors from pixel data', () => {
        numberOfColorsToExtract = 5
        colorPaletteFromPixels = new ColorPaletteFromPixels(testImage, numberOfColorsToExtract)
        const extractedColors = colorPaletteFromPixels.getColorPalette()
        expect(extractedColors.length).toBe(5)
        expect(typeof extractedColors[0]).toBe('object')
    })

    test('Get 10 dominant colors from pixel data', () => {
        numberOfColorsToExtract = 10
        colorPaletteFromPixels = new ColorPaletteFromPixels(testImage, numberOfColorsToExtract)
        const extractedColors = colorPaletteFromPixels.getColorPalette()
        expect(extractedColors.length).toBe(10)
        expect(typeof extractedColors[0]).toBe('object')
    })
})

describe('Colorpalette amount of pixels error test', () => {
    const mockRgbaValues = [[255, 255, 255, 255]]
    const numberOfColorsToExtract = 3

    test('Get Error - Not enough pixels', () => {
        expect(() => new ColorPaletteFromPixels(mockRgbaValues, numberOfColorsToExtract)).toThrow('Pixel data must be above 100 pixels - 10x10px')
    })
})

describe('Colorpalette amount of color palettes error test', () => {
    let numberOfColorsToExtract = 1

    test('Get Error - Too few colors to extract', () => {
        expect(() => new ColorPaletteFromPixels(testImage, numberOfColorsToExtract)).toThrow('A palette must be between 3 and 10 colors')
    })

    numberOfColorsToExtract = 20
    test('Get Error - Too many colors to extract', () => {
        expect(() => new ColorPaletteFromPixels(testImage, numberOfColorsToExtract)).toThrow('A palette must be between 3 and 10 colors')
    })
})
