import { useCallback, useEffect } from 'react';
import { AxiosResponse } from 'axios';

import useRequestLifecycle, {
  RequestLifecycleState,
} from './useRequestLifecycle';

type RequestCallback<T> = () => Promise<AxiosResponse<T | null>>;

interface UseRequest<T> extends RequestLifecycleState<T> {
  loadData: RequestCallback<T>;
}

/**
 * Makes a request on load, returning the data, loading state, and any errors.
 */
export const useRequest = <T>(
  requestCallback: RequestCallback<T>
): UseRequest<T> => {
  const { state, actions } = useRequestLifecycle<T>();

  const loadData = useCallback(() => {
    actions.pending();

    return requestCallback()
      .then((response) => {
        actions.success(response);

        return response;
      })
      .catch((error) => {
        actions.fail(error);

        return error;
      });
  }, [actions, requestCallback]);

  // Reset and load data when the callback changes.
  useEffect(() => {
    void loadData();

    return () => {
      actions.reset();
    };
  }, [actions, loadData]);

  return {
    data: state.data,
    loading: state.loading,
    previouslyLoaded: state.previouslyLoaded,
    error: state.error,
    loadData,
  };
};

export default useRequest;
