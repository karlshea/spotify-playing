import './App.css';

import CurrentlyPlaying from './components/CurrentlyPlaying.tsx';
import NotPlaying from './components/NotPlaying.tsx';
import Status from './components/Status.tsx';
import usePlayingApplication from './hooks/usePlayingApplication.ts';

const App = () => {
  const { currentlyPlaying, occupied, showLoading } = usePlayingApplication();

  if (showLoading) {
    return <Status message="Loading" />;
  }

  if (!currentlyPlaying || !occupied) {
    return <NotPlaying />;
  }

  return <CurrentlyPlaying currentlyPlaying={currentlyPlaying} />;
};

export default App;
