import useBacklightTimeout from './useBacklightTimeout.ts';
import useGetCurrentlyPlaying from './useGetCurrentlyPlaying.ts';
import useOccupied from './useOccupied.ts';

const usePlayingApplication = () => {
  const occupied = useOccupied();

  const { loading, previouslyLoaded, currentlyPlaying } =
    useGetCurrentlyPlaying(occupied);

  const showLoading = !currentlyPlaying && !previouslyLoaded && loading,
    notPlaying = !(currentlyPlaying && occupied);

  useBacklightTimeout(notPlaying);

  return {
    currentlyPlaying,
    occupied,
    showLoading,
  };
};

export default usePlayingApplication;
