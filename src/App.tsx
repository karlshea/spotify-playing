import './App.css';
import CurrentlyPlaying from './components/CurrentlyPlaying.tsx';
import Loading from './components/Loading.tsx';
import NotPlaying from './components/NotPlaying.tsx';
import useGetCurrentlyPlaying from './hooks/useGetCurrentlyPlaying.ts';
import useOccupied from './hooks/useOccupied.ts';

const App = () => {
  const { loading, previouslyLoaded, currentlyPlaying } =
    useGetCurrentlyPlaying();

  const occupied = useOccupied();

  if (!currentlyPlaying && !previouslyLoaded && loading) {
    return <Loading />;
  }

  if (!currentlyPlaying || !occupied) {
    return <NotPlaying />;
  }

  return <CurrentlyPlaying currentlyPlaying={currentlyPlaying} />;
};

export default App;
