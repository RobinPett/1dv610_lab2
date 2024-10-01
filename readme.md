# Color-Palette-Extractor
### ⚠️ Disclaimer - Developed for a school project - Module will not be maintained

## Description
Extracts color palettes from images to be used in a browser environment.
- Enter a image URL, extract pixels, generate color palettes in different styles.


## Installation
 > npm install color-palette-extractor
 
 Make sure the module is imported in a script which is loaded in a html page for it to have access to the DOM. 

 ## Dependencies
 Color Palette Extractor is not dependent on any other modules to run.
 It must howerver run in a browser environment to have access to the DOM to create Image and Canvas elements.

## Usage examples

```javascript
  import { colorPaletteExtractor } from "color-palette-extractor"

  const imageUrl = 'https://server.com/image.jpg'

  // Load and start extraction
  const image = colorPaletteExtractor.loadImage(imageURL)
  const pixels = await image.getPixels()
  const colorPalette = paletteExtractor.startExtraction(pixels, 5)

  const palette = colorPalette.getColorPalette()
```
To get diffent palettes you can use:

```javascript
const brightPalette = colorPalette.getBrightPalette()
const darkPalette = colorPalette.getDarkPalette()
const mutedPalette = colorPalette.getMutedPalette()
```

To present the color palette you can use:

```javascript
// Get a div with the palette. Set size of each colored div.
const paletteDiv = paletteExtractor.presentPalette(palette, 100)

// Present in your own html document
const body = document.querySelector('body')
body.append(paletteDiv)
```

## Bug report

## Known issues
- Generating palettes can be slow - optimizing needed
- Image links can fail if the server has origin controll
- Images with just a few colors can't extract multiple colors

## License
GNU GENERAL PUBLIC LICENSE
@Robin Pettersson 2024


