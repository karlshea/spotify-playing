import { useMemo, useReducer } from 'react';
import { AxiosError, AxiosResponse } from 'axios';
import { produce } from 'immer';

export type RequestLifecycleState<T> = {
  readonly data: T | null;
  readonly loading: boolean;
  readonly previouslyLoaded: boolean;
  readonly error: AxiosError | undefined;
};

export interface RequestLifecycleActions<T> {
  pending: () => void;
  success: (response: AxiosResponse<T | null>) => void;
  fail: (error: AxiosError) => void;
  reset: () => void;
}

export interface UseRequestLifecycle<T> {
  state: RequestLifecycleState<T>;
  actions: RequestLifecycleActions<T>;
}

enum ActionTypes {
  PENDING = 'PENDING',
  SUCCESS = 'SUCCESS',
  FAIL = 'FAIL',
  RESET = 'RESET',
}

type Action<T> =
  | { type: ActionTypes.PENDING }
  | { type: ActionTypes.SUCCESS; payload: T | null }
  | { type: ActionTypes.FAIL; payload: AxiosError }
  | { type: ActionTypes.RESET };

const getDefaultState = <T>(): RequestLifecycleState<T> => ({
  data: null,
  loading: false,
  previouslyLoaded: false,
  error: undefined,
});

const lifecycleReducer = <T>(
  state: RequestLifecycleState<T>,
  action: Action<T>
) =>
  produce(state, (draft) => {
    switch (action.type) {
      case ActionTypes.PENDING:
        draft.loading = true;
        return;
      case ActionTypes.SUCCESS:
        draft.data = produce(draft.data, () => action.payload);
        draft.loading = false;
        draft.previouslyLoaded = true;
        draft.error = undefined;
        return;
      case ActionTypes.FAIL:
        draft.data = null;
        draft.loading = false;
        draft.error = action.payload;
        return;
      case ActionTypes.RESET:
        return getDefaultState();
      default:
        throw new Error('Action not supported');
    }
  });

/**
 * Loading, error, and data states for handling a request.
 */
const useRequestLifecycle = <T>(
  initialState: RequestLifecycleState<T> = getDefaultState()
): UseRequestLifecycle<T> => {
  const [state, dispatch] = useReducer(lifecycleReducer<T>, initialState);

  const actions = useMemo(
    () => ({
      pending: () => dispatch({ type: ActionTypes.PENDING }),
      success: (response: AxiosResponse<T | null>) =>
        dispatch({
          type: ActionTypes.SUCCESS,
          payload: response.data,
        }),
      fail: (error: AxiosError) =>
        dispatch({ type: ActionTypes.FAIL, payload: error }),
      reset: () => dispatch({ type: ActionTypes.RESET }),
    }),
    [dispatch]
  );

  return {
    state,
    actions,
  };
};

export default useRequestLifecycle;
