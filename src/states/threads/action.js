/* eslint-disable no-alert */
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';

const ActionType = {
  RECEIVE_THREADS: 'RECEIVE_THREADS',
  ADD_THREAD: 'ADD_THREAD',
  CHANGE_VOTE_THREAD: 'CHANGE_VOTE_THREAD',
};

function receiveThreadsActionCreator(threads) {
  return {
    type: ActionType.RECEIVE_THREADS,
    payload: {
      threads,
    },
  };
}

function addThreadActionCreator(thread) {
  return {
    type: ActionType.ADD_THREAD,
    payload: {
      thread,
    },
  };
}

function changeVoteThreadActionCreator({ threadId, voteType, userId }) {
  return {
    type: ActionType.CHANGE_VOTE_THREAD,
    payload: {
      threadId,
      voteType,
      userId,
    },
  };
}

function asyncAddThread({ title, body, category }) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const thread = await api.createThread({ title, body, category });
      dispatch(addThreadActionCreator(thread));
    } catch (error) {
      alert(error.message);
    }
    dispatch(hideLoading());
  };
}

function asyncChangeVoteThread({ threadId, voteType, userId }) {
  return async (dispatch) => {
    dispatch(showLoading());
    dispatch(changeVoteThreadActionCreator({ threadId, voteType, userId }));

    try {
      await api.changeVoteThread({ threadId, voteType });
    } catch (error) {
      alert(error.message);
      // dispatch(changeVoteThreadActionCreator({ threadId, voteType, userId }));
    }
    dispatch(hideLoading());
  };
}

export {
  ActionType,
  receiveThreadsActionCreator,
  addThreadActionCreator,
  asyncChangeVoteThread,
  asyncAddThread,
};
