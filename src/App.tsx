import './App.css';
import CurrentlyPlaying from './components/CurrentlyPlaying.tsx';
import Loading from './components/Loading.tsx';
import NotPlaying from './components/NotPlaying.tsx';
import usePlayingApplication from './hooks/usePlayingApplication.ts';

const App = () => {
  const { currentlyPlaying, occupied, showLoading } = usePlayingApplication();

  if (showLoading) {
    return <Loading />;
  }

  if (!currentlyPlaying || !occupied) {
    return <NotPlaying />;
  }

  return <CurrentlyPlaying currentlyPlaying={currentlyPlaying} />;
};

export default App;
