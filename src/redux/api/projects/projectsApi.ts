// Need to use the React-specific entry point to import createApi
import { baseApi } from '../baseApe'


// Define a service using a base URL and expected endpoints
export const projectsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllProjects: builder.query({
      query: () => {
        return {
           url:"/projects",
           method:"GET",
        }
      },
      providesTags:['projects']
    }),
    createProject: builder.mutation({
      query: (data) => {
        return {
           url:"/projects",
           method:"POST",
           data
        }
      },
      invalidatesTags:['projects']
    }),
    deleteProject: builder.mutation({
      query: (projectId:string | undefined) => {
        return {
           url:`/projects/${projectId}`,
           method:"Delete"
        }
      },
      invalidatesTags:['projects']
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {useGetAllProjectsQuery,useCreateProjectMutation,useDeleteProjectMutation} = projectsApi