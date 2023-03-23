import apiSlice from "../api/apiSlice";

const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query({
      query: () => ({
        url: `/user`,
      }),
      providesTags: ["users"],
    }),
    getUserInfo: builder.query({
      query: () => ({
        url: `/user/info?userStatue=learner&limit=10&sort=age&page=3&fields=fullName`,
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
  useGetUserInfoQuery,
  useRegisterRiderMutation,
  useRegisterLearnerMutation,
} = authApi;
