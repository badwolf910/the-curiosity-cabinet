const PHOTO = 'https://commons.wikimedia.org/wiki/Special:FilePath/Egyptian_Sculpture_Gallery_-_DPLA_-_52dd73569d13e31e42ba8b4a3593a641.jpg?width=1600';
const SOURCE = 'https://commons.wikimedia.org/wiki/File:Egyptian_Sculpture_Gallery_-_DPLA_-_52dd73569d13e31e42ba8b4a3593a641.jpg';

// Decorative vintage photo behind the hero text.
export default function HeroPhoto() {
  return (
    <>
      <div className="hero__photo" style={{ backgroundImage: `url(${PHOTO})` }} aria-hidden="true" />
      <a className="hero__credit" href={SOURCE} target="_blank" rel="noreferrer">
        Photo: Egyptian Sculpture Gallery, lantern slide (public domain, via DPLA)
      </a>
    </>
  );
}
