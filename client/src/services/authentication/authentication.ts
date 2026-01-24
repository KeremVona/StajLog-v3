import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authentication = createApi({
  reducerPath: "authentication",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/authentication/",
  }),
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (newUser) => ({
        url: "register",
        method: "POST",
        body: newUser,
      }),
    }),
  }),
});

export const { useRegisterUserMutation } = authentication;
