import { Fonts, fonts } from '../fonts'

const getUrl = async (font: string) => {
  const fontCss = await fetch(`https://fonts.googleapis.com/css2?family=${font}`)
  const css = await fontCss.text()
  const sources = [...css.matchAll(/url\(.*\)/g)]

  if (sources.length === 0) {
    throw 'Could not find src url in font css'
  }

  // Latin should be last src
  const latinUrl = sources.at(-1)?.toString()

  return latinUrl || ''
}

export const loadFont = async (font: Fonts) => {
  if (!font) return

  const url = await getUrl(fonts[font])
  const newFont = new FontFace(font, url)
  await newFont.load()
}
