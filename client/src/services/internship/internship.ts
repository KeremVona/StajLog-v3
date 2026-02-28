import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const internship = createApi({
  reducerPath: "internship",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/internship/",
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

export const { useRegisterUserMutation } = internship;
