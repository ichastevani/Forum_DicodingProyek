import { describe, beforeEach, afterEach, it, vi, expect } from 'vitest';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';
import { asyncRegisterUser } from './action';

const payloadRegister = { 
  name: 'Abdullah',
  email: 'email@example.com', 
  password: 'secret' 
}

const fakeUserResponse = {
  id: "john_doe",
  name: "John Doe",
  email: "john@example.com",
  avatar: "https://generated-image-url.jpg"
};

const fakeErrorResponse = new Error('Ups, something went wrong');

describe('asyncRegisterUser thunk', () => {
  beforeEach(() => {
    // Mocking window.alert globally in a Node.js environment
    global.alert = vi.fn();  // Mock alert globally
    api._register = api.register;
  });
 
  afterEach(() => {
    // Restore original API functions
    api.register = api._register;
 
    // delete backup data
    delete api._register;
    delete global.alert;  // Clean up the mock alert
  });

  it('should dispatch action correctly when data fetching success', async () => {
    // arrange
    // stub implementation
    api.register = () => Promise.resolve(fakeUserResponse);
    // mock dispatch
    const dispatch = vi.fn();
 
    // action
    await asyncRegisterUser(payloadRegister)(dispatch);
 
    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch action and call alert correctly when data fetching failed', async () => {
    // arrange
    // stub implementation
    api.register = () => Promise.reject(fakeErrorResponse);
    // mock dispatch
    const dispatch = vi.fn();
 
    // action
    await asyncRegisterUser(payloadRegister)(dispatch);
 
    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
    expect(global.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
  });
});
