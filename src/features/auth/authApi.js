import apiSlice from "../api/apiSlice";

const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query({
      query: () => ({
        url: "/user",
      }),
      providesTags: ["users"],
    }),
    registerRider: builder.mutation({
      query: (data) => ({
        url: "/user",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["users"],
    }),
    registerLearner: builder.mutation({
      query: (data) => ({
        url: "/user",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["users"],
    }),
  }),
});
export const {
  useGetUserQuery,
  useRegisterRiderMutation,
  useRegisterLearnerMutation,
} = authApi;
