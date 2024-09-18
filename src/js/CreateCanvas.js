/**
 * Create canvas from image data.
 */

export class CreateCanvas {
    constructor(image) {
        console.log(image)
        this.createCanvasElement(image)
    }

    createCanvasElement(image) {      
        const canvas = document.createElement('canvas')
        const context = canvas.getContext('2d')
        return context
    }
}