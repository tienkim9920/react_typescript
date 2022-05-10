import { createAsyncThunk, createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IBlogModel } from '../interface/blogs.interface';
import { BlogModel } from '../model/blogs.model';
import { BlogService } from '../service/blogs.service';
import type { RootState } from './store';

interface BlogSliceState {
  blogs: BlogModel[],
}

const initialState: BlogSliceState = {
  blogs: [],
}

export const getBlogs = createAsyncThunk('blogs/get', async () => {
  return (await BlogService.GetBlogs()).data;
})

// export const addBlogs = createAsyncThunk('blogs/add', async (request: IBlogModel) => {
//   return (await BlogService.AddBlogs(request)).data;
// })

export const patchBlogs = createAsyncThunk('blogs/update', async (request: IBlogModel) => {
  await BlogService.PatchBlogs(request);
  return request;
})

export const deleteBlogs = createAsyncThunk('blogs/delete', async (_id: string) => {
  await BlogService.DeleteBlogs(_id);
  return _id;
})

export const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    addBlogs: (state, action: PayloadAction<BlogModel>) => {
      if (!state.blogs.length){
        return;
      }
      state.blogs = [
        action.payload, ...state.blogs
      ]
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getBlogs.fulfilled, (state: any, action: any) => {
      state.blogs = action.payload;
    });

    // builder.addCase(addBlogs.fulfilled, (state: any, action: any) => {
    //   state.blogs = [action.payload, ...state.blogs];
    // });

    builder.addCase(patchBlogs.fulfilled, (state: any, action: any) => {
      const index = state.blogs.findIndex((el: BlogModel) => el._id === action.payload._id);
      state.blogs[index].body = action.payload.body;
    });

    builder.addCase(deleteBlogs.fulfilled, (state: any, action: any) => {
      state.blogs = [...state.blogs.filter((el: BlogModel) => el._id?.toString() !== action.payload)];
    });
  },
})

export const { addBlogs } = blogSlice.actions;

export const selectBlog = (state: RootState) => state.blog;

// Hoạt động giống với getter bên vuex, tính toán và trả lại dữ liệu
// lưu ý: Khi trong initState đã có dữ liệu vì thằng này là khởi tạo chạy trước useEffect
// Nếu k có dữ liệu ở bên trong thì nó sẽ bị undifield
export const getDetailBlog = () => createSelector(
  (state: RootState) => state.blog.blogs,
  (items) => {
    return items.length;
  }
);;

export default blogSlice.reducer;