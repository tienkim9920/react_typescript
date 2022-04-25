import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IPostModel } from '../interface/posts.interface';
import { PostModel } from '../model/posts.model';
import { PostService } from '../service/posts.service';
import type { RootState } from './store';

interface PostSliceState {
  posts: PostModel[]
}

const initialState: PostSliceState = {
  posts: []
}

export const getPosts = createAsyncThunk('posts/get', async () => {
  return (await PostService.GetPosts()).data;
})

export const addPosts = createAsyncThunk('posts/add', async (request: IPostModel) => {
  return (await PostService.PostBlogs(request)).data;
})

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    // addPost: (state, action: PayloadAction<PostModel>) => {
    //   state.posts = [
    //     ...state.posts, action.payload
    //   ]
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(getPosts.fulfilled, (state: any, action: any) => {
      state.posts = action.payload;
    });

    builder.addCase(addPosts.fulfilled, (state: any, action: any) => {
      state.posts = [action.payload, ...state.posts];
    })
  },
})

export const { } = postSlice.actions;

export const selectPost = (state: RootState) => state.post.posts;

export default postSlice.reducer;