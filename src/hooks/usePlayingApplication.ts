import useGetCurrentlyPlaying from './useGetCurrentlyPlaying.ts';
import useOccupied from './useOccupied.ts';
import useScreenTimeout from './useScreenTimeout.ts';

const usePlayingApplication = () => {
  const occupied = useOccupied();

  const { loading, previouslyLoaded, currentlyPlaying } =
    useGetCurrentlyPlaying(occupied);

  const showLoading = !currentlyPlaying && !previouslyLoaded && loading,
    notPlaying = !(currentlyPlaying && occupied);

  useScreenTimeout(notPlaying);

  return {
    currentlyPlaying,
    occupied,
    showLoading,
  };
};

export default usePlayingApplication;
