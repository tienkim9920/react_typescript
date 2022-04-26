import { createAsyncThunk, createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IPostModel } from '../interface/posts.interface';
import { PostModel } from '../model/posts.model';
import { PostService } from '../service/posts.service';
import type { RootState } from './store';

interface PostSliceState {
  posts: PostModel[],
  store: PostModel[]
}

const initialState: PostSliceState = {
  posts: [],
  store: [],
}

export const getPosts = createAsyncThunk('posts/get', async () => {
  return (await PostService.GetPosts()).data;
})

export const addPosts = createAsyncThunk('posts/add', async (request: IPostModel) => {
  return (await PostService.AddPosts(request)).data;
})

export const deletePosts = createAsyncThunk('posts/delete', async (id: string) => {
  const res = (await PostService.DeletePosts(id)).data;
  return id;
})

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    addDetail: (state, action: PayloadAction<PostModel>) => {
      state.store = [
        ...state.store, action.payload
      ]
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getPosts.fulfilled, (state: any, action: any) => {
      state.posts = action.payload;
    });

    builder.addCase(addPosts.fulfilled, (state: any, action: any) => {
      state.posts = [action.payload, ...state.posts];
    });

    builder.addCase(deletePosts.fulfilled, (state: any, action: any) => {
      state.posts = [...state.posts.filter((el: PostModel) => el.id?.toString() !== action.payload)];
    });
  },
})

export const { addDetail } = postSlice.actions;

export const selectPost = (state: RootState) => state.post;

// Hoạt động giống với getter bên vuex, tính toán và trả lại dữ liệu
// lưu ý: Khi trong initState đã có dữ liệu vì thằng này là khởi tạo chạy trước useEffect
// Nếu k có dữ liệu ở bên trong thì nó sẽ bị undifield
export const getDetailPost = () => createSelector(
  (state: RootState) => state.post.store,
  (items) => {
    return items.length;
  }
);;

export default postSlice.reducer;