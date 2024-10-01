## Testrapport
Tester från Jest

![test-coverage](/tests/results/test-coverage.PNG)

Hela ColorPaletteFromPixels testas och lyckas med allt.
ImageToPixels testas igenom men stora delar som testas är skapandet av HTMLImageElement och HTMLCanvasElement vilket i nuläget mockas vilket resulterar i att hälften av koden inte körs i testerna för det.