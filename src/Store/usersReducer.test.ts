import usersReducer, {
  InitStateType,
  actions,
  followTrack,
} from "./usersReducer";
import { followUser, unfollowUser, FollowType } from "../API/getApi";
let state: InitStateType;
beforeEach(() => {
  state = {
    users: [
      {
        id: 0,
        name: "Ilu",
        photos: { large: null, small: null },
        followed: false,
        status: "jjj",
      },
      {
        id: 1,
        followed: true,
        name: "Ilya Voronov",
        status: "hey there!",
        photos: { small: null, large: null },
      },
      {
        id: 2,
        followed: false,
        name: "Voronov",
        status: "hey",
        photos: { small: null, large: null },
      },
    ],
    currentPage: 1,
    totalCount: 0,
    pageSize: 10,
    isLoading: false,
    followFetch: [],
  };
});

test("follow user", () => {
  const newState = usersReducer(state, actions.follow(2));
  expect(newState.users[0].followed).toBeFalsy();
  expect(newState.users[1].followed).toBeTruthy();
  expect(newState.users[2].followed).toBeTruthy();
});

test("unfollow user", () => {
  const newState = usersReducer(state, actions.unfollow(1));
  expect(newState.users[0].followed).toBeFalsy();
  expect(newState.users[1].followed).toBeFalsy();
  expect(newState.users[2].followed).toBeFalsy();
});

jest.mock("../API/getApi");
const followMock = followUser;
const unfollowMock = unfollowUser;
const followResult: FollowType = { data: {}, messages: [], resultCode: 0 };
// @ts-ignore
followMock.mockReturnValue(followResult);
test("success follow thunk", async () => {
  const thunk = followTrack(1, false);
  const getStateMock = jest.fn();
  const dispatchMock = jest.fn();

  await thunk(dispatchMock, getStateMock, {});
  expect(dispatchMock).toBeCalledTimes(3);
});

//@ts-ignore
unfollowMock.mockReturnValue(followResult)
test("success unfollow thunk", async () => {
  const thunk = followTrack(1, true);
  const getStateMock = jest.fn();
  const dispatchMock = jest.fn();

  await thunk(dispatchMock, getStateMock, {});
  expect(dispatchMock).toBeCalledTimes(3);
});
