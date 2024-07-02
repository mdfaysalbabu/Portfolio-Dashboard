// Need to use the React-specific entry point to import createApi
import { baseApi } from '../baseApe'


// Define a service using a base URL and expected endpoints
export const blogsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllBlogs: builder.query({
      query: () => {
        return {
           url:"/blogs",
           method:"GET",
        }
      },
      providesTags:['blogs']
    }),
    getBlogById: builder.query({
      query: (blogId) => {
        return {
           url:`/blogs/blog/${blogId}`,
           method:"GET",
        }
      },
      providesTags:['blogs']
    }),
    createBlog: builder.mutation({
      query: (data) => {
        return {
           url:"/blogs",
           method:"POST",
           data
        }
      },
      invalidatesTags:['blogs']
    }),
    updateBlog: builder.mutation({
      query: (data) => {
        return {
           url:`/blogs/${data?.blogId}`,
           method:"PATCH",
           data:data?.data
        }
      },
      invalidatesTags:['blogs']
    }),
    deleteBlog: builder.mutation({
      query: (blogId:string | undefined) => {
        return {
           url:`/blogs/${blogId}`,
           method:"Delete"
        }
      },
      invalidatesTags:['blogs']
    }),
  
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {useGetAllBlogsQuery,useCreateBlogMutation,useUpdateBlogMutation,useDeleteBlogMutation,useGetBlogByIdQuery} = blogsApi