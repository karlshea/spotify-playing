import spotifyDj from '../../assets/spotify-dj.png';

const PlaylistDJ = () => (
  <div
    className="current-playlist current-playlist--dj"
    style={{ backgroundImage: `url(${spotifyDj})` }}
  ></div>
);

export default PlaylistDJ;
