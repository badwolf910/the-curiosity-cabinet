export const CATEGORIES = [
  { id: 'instruments', name: 'Instruments & Devices', glyph: '⚙', blurb: 'Machines that measured, predicted, or computed.' },
  { id: 'natural', name: 'Natural Wonders', glyph: '❦', blurb: 'Specimens and phenomena from the living and mineral worlds.' },
  { id: 'texts', name: 'Texts & Codes', glyph: '✎', blurb: 'Manuscripts, scripts, and ciphers that carry lost minds.' },
  { id: 'mysteries', name: 'Unsolved Mysteries', glyph: '?', blurb: 'Objects that still refuse to explain themselves.' },
  { id: 'art', name: 'Art & Ornament', glyph: '✦', blurb: 'Beauty made with uncommon obsession.' },
];

// year: negative for BCE; hue drives the specimen-plate tint.
export const ARTIFACTS = [
  {
    wiki: 'Antikythera_mechanism', id: 'antikythera-mechanism', title: 'Antikythera Mechanism', category: 'instruments',
    year: -150, yearLabel: 'c. 150–100 BCE', origin: 'Greece (Aegean Sea)', glyph: '⚙', hue: 38,
    summary: 'A corroded bronze gearbox that modelled the heavens two thousand years before clockwork.',
    story: 'Recovered from a shipwreck off the island of Antikythera in 1901, the device contains at least 30 meshing bronze gears. X-ray tomography revealed inscriptions and a mechanism that tracked the Sun, Moon, eclipse cycles, and the dates of the Panhellenic games. Nothing of comparable complexity appears again in the record for over a thousand years.',
    facts: ['Over 30 surviving gears, some with 223 teeth', 'Predicted eclipses using the Saros cycle', 'Found in 82 fragments'],
    tags: ['astronomy', 'gears', 'shipwreck', 'greece'], related: ['astrolabe', 'voynich-manuscript', 'baghdad-battery'],
  },
  {
    wiki: 'Astrolabe', id: 'astrolabe', title: 'Planispheric Astrolabe', category: 'instruments',
    year: 927, yearLabel: 'c. 10th century CE', origin: 'Islamic Golden Age', glyph: '☉', hue: 30,
    summary: 'A pocket universe in brass, used to tell time, find direction, and cast horoscopes.',
    story: 'The astrolabe projects the celestial sphere onto a flat disc. Scholars in Baghdad and Córdoba refined it into a universal tool: surveying, navigation, finding the direction of Mecca, and telling the hour by day or night. Ornate examples are as much jewellery as science.',
    facts: ['Solves dozens of astronomical problems', 'Interchangeable plates for different latitudes', 'Ancestor of the sextant'],
    tags: ['astronomy', 'navigation', 'brass', 'islamic'], related: ['antikythera-mechanism', 'analytical-engine'],
  },
  {
    wiki: 'Analytical_Engine', id: 'analytical-engine', title: 'Analytical Engine Notes', category: 'instruments',
    year: 1843, yearLabel: '1843', origin: 'London, England', glyph: '∑', hue: 25,
    summary: 'Ada Lovelace imagines a machine that could compose music, long before computers existed.',
    story: 'Charles Babbage designed a programmable mechanical computer that was never completed. Ada Lovelace translated an article about it and added notes three times the length of the original, including what is widely considered the first published algorithm and a startling prophecy that such machines might manipulate symbols beyond numbers.',
    facts: ['Punched cards borrowed from Jacquard looms', 'Notes labelled A through G', 'Never built in Babbage’s lifetime'],
    tags: ['computing', 'mathematics', 'victorian', 'algorithm'], related: ['astrolabe', 'rosetta-stone', 'voynich-manuscript'],
  },
  {
    wiki: 'Rosetta_Stone', id: 'rosetta-stone', title: 'Rosetta Stone', category: 'texts',
    year: -196, yearLabel: '196 BCE', origin: 'Egypt', glyph: '𓂀', hue: 20,
    summary: 'One decree, three scripts, and the key that reopened ancient Egypt.',
    story: 'The same priestly decree is carved in hieroglyphic, Demotic, and Greek. Because scholars could read Greek, they had a foothold. Thomas Young and Jean-François Champollion exploited the parallel text to show that hieroglyphs were partly phonetic, ending 1,400 years of silence.',
    facts: ['Discovered by French soldiers in 1799', 'Champollion announced decipherment in 1822', 'Weighs about 760 kg'],
    tags: ['language', 'egypt', 'decipherment', 'stone'], related: ['voynich-manuscript', 'phaistos-disc', 'analytical-engine'],
  },
  {
    wiki: 'Voynich_manuscript', id: 'voynich-manuscript', title: 'Voynich Manuscript', category: 'mysteries',
    year: 1420, yearLabel: 'Radiocarbon: 1404–1438', origin: 'Central Europe (probable)', glyph: '❀', hue: 95,
    summary: 'An illustrated book in an unknown script that has defeated every codebreaker.',
    story: 'Plants that match no known species, astrological diagrams, and bathing women fill vellum pages written in an alphabet nobody recognises. Cryptographers from both World Wars failed to crack it. Theories range from a lost language, to an elaborate cipher, to an exquisite hoax.',
    facts: ['About 240 vellum pages', 'Held at Yale’s Beinecke Library', 'Statistical patterns resemble natural language'],
    tags: ['cipher', 'botany', 'manuscript', 'unsolved'], related: ['rosetta-stone', 'phaistos-disc', 'antikythera-mechanism'],
  },
  {
    wiki: 'Phaistos_Disc', id: 'phaistos-disc', title: 'Phaistos Disc', category: 'mysteries',
    year: -1700, yearLabel: 'c. 1700 BCE', origin: 'Crete, Minoan', glyph: '◎', hue: 15,
    summary: 'A clay disc stamped with 241 symbols in a spiral, possibly the earliest movable-type print.',
    story: 'Each of the 45 distinct signs was pressed into wet clay with a individual punch, a technique that foreshadows printing by three millennia. Only one disc exists, so there is too little text to decode. It remains a puzzle of language, prayer, or game.',
    facts: ['Found in 1908 in a Minoan palace', 'Text spirals toward the centre', 'Written in no known language'],
    tags: ['minoan', 'script', 'printing', 'unsolved'], related: ['rosetta-stone', 'voynich-manuscript'],
  },
  {
    wiki: 'Baghdad_Battery', id: 'baghdad-battery', title: 'Baghdad Battery', category: 'mysteries',
    year: 150, yearLabel: 'c. 1st–3rd century CE', origin: 'Mesopotamia', glyph: '⚡', hue: 45,
    summary: 'A clay jar with a copper cylinder and iron rod: an ancient battery or just a scroll case?',
    story: 'When filled with acid, replicas generate around a volt. Some argue it was used for electroplating; most archaeologists note the absence of wires and plated objects and suspect it stored scrolls. It endures as a lesson in how evidence and imagination interact.',
    facts: ['About 13 cm tall', 'Replicas produce 0.5 to 2 volts', 'Purpose remains debated'],
    tags: ['electricity', 'pottery', 'debate', 'parthian'], related: ['antikythera-mechanism', 'astrolabe'],
  },
  {
    wiki: 'Lichtenberg_figure', id: 'lichtenberg-figure', title: 'Lichtenberg Figures', category: 'natural',
    year: 1777, yearLabel: 'First observed 1777', origin: 'Göttingen, Germany', glyph: '❋', hue: 60,
    summary: 'Branching fractals of lightning frozen in dust, wood, or acrylic.',
    story: 'Georg Christoph Lichtenberg noticed that electrical discharge across an insulator’s surface drew tree-like patterns in dust. The discovery foreshadowed modern xerography. Today they appear in dielectric breakdown, and in the skin of lightning-strike survivors.',
    facts: ['Fractal geometry before the word existed', 'Seen on skin after lightning strikes', 'Inspired photocopying'],
    tags: ['electricity', 'fractal', 'physics', 'patterns'], related: ['baghdad-battery', 'ammonite'],
  },
  {
    wiki: 'Ammonoidea', id: 'ammonite', title: 'Ammonite Spiral', category: 'natural',
    year: -140000000, yearLabel: '~140 million years ago', origin: 'Global oceans', glyph: '🐚', hue: 35,
    summary: 'The logarithmic spiral of an extinct sea creature, locked in stone.',
    story: 'Ammonites swam in Mesozoic seas for over 300 million years before vanishing alongside the dinosaurs. Their chambered shells grew in a near-perfect logarithmic spiral. Victorian collectors called them snakestones and believed they were coiled serpents turned to rock.',
    facts: ['Survived three mass extinctions', 'Used to date rock layers', 'Some grew over 2 metres wide'],
    tags: ['fossil', 'spiral', 'geology', 'marine'], related: ['lichtenberg-figure', 'mantis-shrimp-eye'],
  },
  {
    wiki: 'Mantis_shrimp', id: 'mantis-shrimp-eye', title: 'Mantis Shrimp Eye', category: 'natural',
    year: 1900, yearLabel: 'Studied from the 20th century', origin: 'Indo-Pacific reefs', glyph: '◉', hue: 160,
    summary: 'Twelve to sixteen colour receptors and the ability to see polarised light.',
    story: 'Humans have three colour receptors; the mantis shrimp has up to sixteen. Rather than discriminating subtle hues, its eyes appear to identify colours instantly, trading nuance for speed. Its circularly polarised vision is unique in the animal kingdom and has inspired new optical sensors.',
    facts: ['Each eye moves independently', 'Sees circular polarised light', 'Strikes with the speed of a bullet'],
    tags: ['vision', 'biology', 'ocean', 'optics'], related: ['ammonite', 'lichtenberg-figure'],
  },
  {
    wiki: 'Book_of_Kells', id: 'book-of-kells', title: 'Book of Kells', category: 'art',
    year: 800, yearLabel: 'c. 800 CE', origin: 'Iona / Kells, Ireland', glyph: '☘', hue: 120,
    summary: 'A gospel manuscript of impossible detail, with cats, mice, and interlace in the margins.',
    story: 'Monks laboured for years over its vellum pages, using pigments from as far as Afghanistan: lapis lazuli. Magnifying glass details include tiny animals playing, and knotwork lines that never break. It is a monument to devotion expressed as pattern.',
    facts: ['Approximately 340 folios', 'Made from calf vellum', 'Includes the famous Chi Rho page'],
    tags: ['illumination', 'manuscript', 'celtic', 'monastic'], related: ['voynich-manuscript', 'rosetta-stone'],
  },
  {
    wiki: 'Leopold_and_Rudolf_Blaschka', id: 'blaschka-glass', title: 'Blaschka Glass Sea Creatures', category: 'art',
    year: 1880, yearLabel: '1863–1890', origin: 'Dresden, Germany', glyph: '✺', hue: 190,
    summary: 'Anatomically exact glass jellyfish and anemones, made when preservation methods failed.',
    story: 'Leopold and Rudolf Blaschka crafted over 10,000 models for universities and museums, because soft-bodied marine animals lose colour and shape in jars. Their lampworking technique died with them, and curators still cannot fully reproduce it.',
    facts: ['Made without moulds', 'Modelled from live specimens', 'Collections at Harvard and Cornell'],
    tags: ['glass', 'marine', 'craft', 'science-art'], related: ['mantis-shrimp-eye', 'ammonite', 'book-of-kells'],
  },
];

export const byId = Object.fromEntries(ARTIFACTS.map((a) => [a.id, a]));
export const categoryById = Object.fromEntries(CATEGORIES.map((c) => [c.id, c]));
export const ALL_TAGS = [...new Set(ARTIFACTS.flatMap((a) => a.tags))].sort();

export function formatYear(y) {
  if (y <= -1000000) return `${Math.round(-y / 1e6)} million years ago`;
  return y < 0 ? `${-y} BCE` : `${y} CE`;
}
