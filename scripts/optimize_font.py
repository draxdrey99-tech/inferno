"""Generate the Latin Archivo weight range actually used by the site.

Requires fonttools and brotli. Original font and SIL OFL remain in the
Fontsource dependency; license is also copied into docs/licenses.
"""
from pathlib import Path
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont
from fontTools import subset

source = Path('node_modules/@fontsource-variable/archivo/files/archivo-latin-wght-normal.woff2')
font = TTFont(source)
font = instantiateVariableFont(font, {'wght': (400, 800)}, inplace=True)
if 'gvar' in font:
    variations = font['gvar'].variations
    font['gvar'].variations = {name: variations.get(name, []) for name in font.getGlyphOrder()}
options = subset.Options()
options.flavor = 'woff2'
options.layout_features = ['*']
subsetter = subset.Subsetter(options=options)
subsetter.populate(unicodes=list(range(0x100)) + list(range(0x2000, 0x2070)) + list(range(0x20A0, 0x20D0)) + [0x131, 0x152, 0x153, 0x2BC, 0x2C6, 0x2DA, 0x2DC, 0x2212])
subsetter.subset(font)
output = Path('public/fonts/archivo-latin-400-800.woff2')
output.parent.mkdir(parents=True, exist_ok=True)
font.flavor = 'woff2'
font.save(output)
print(f'{source.stat().st_size} -> {output.stat().st_size} bytes')
