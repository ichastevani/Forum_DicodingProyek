import { ActionType } from './action';

function threadsReducer(threads = [], action = {}) {
  switch (action.type) {
    case ActionType.RECEIVE_THREADS:
      return action.payload.threads;
    case ActionType.ADD_THREAD:
      return [action.payload.thread, ...threads];
    case ActionType.CHANGE_VOTE_THREAD:
      return threads.map((thread) => {
        if (thread.id === action.payload.threadId) {
          return {
            ...thread,
            upVotesBy: action.payload.voteType === 1
              ? thread.upVotesBy.concat([action.payload.userId])
              : thread.upVotesBy.filter((id) => id !== action.payload.userId),
            downVotesBy: action.payload.voteType === -1
              ? thread.downVotesBy.concat([action.payload.userId])
              : thread.downVotesBy.filter((id) => id !== action.payload.userId),
          };
        }
        return thread;
      });
    default:
      return threads;
  }
}

export default threadsReducer;
