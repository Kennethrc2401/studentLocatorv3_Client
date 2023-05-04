import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";
import { apiSlice } from "../../../app/api/apiSlice"

const bigDataAnalyticsTutorsAdapter = createEntityAdapter({
    sortComparer: (a, b) => (a.completed === b.completed) ? 0 : a.completed ? 1 : -1
})

const initialState = bigDataAnalyticsTutorsAdapter.getInitialState()

export const bigDataAnalyticsTutorsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getBigDataAnalyticsTutors: builder.query({
            query: () => ({
                url: '/bigDataAnalyticsTutors',
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError
                },
            }),
            transformResponse: responseData => {
                const loadedBigDataAnalyticsTutors = responseData.map(bigDataAnalyticsTutor => {
                    bigDataAnalyticsTutor.id = bigDataAnalyticsTutor._id
                    return bigDataAnalyticsTutor
                });
                return bigDataAnalyticsTutorsAdapter.setAll(initialState, loadedBigDataAnalyticsTutors)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'BigDataAnalyticsTutor', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'BigDataAnalyticsTutor', id }))
                    ]
                } else return [{ type: 'BigDataAnalyticsTutor', id: 'LIST' }]
            }
        }),
        addNewBigDataAnalyticsTutor: builder.mutation({
            query: initialBigDataAnalyticsTutor => ({
                url: '/bigDataAnalyticsTutors',
                method: 'POST',
                body: {
                    ...initialBigDataAnalyticsTutor,
                }
            }),
            invalidatesTags: [
                { type: 'BigDataAnalyticsTutor', id: "LIST" }
            ]
        }),
        updateBigDataAnalyticsTutor: builder.mutation({
            query: initialBigDataAnalyticsTutor => ({
                url: '/bigDataAnalyticsTutors',
                method: 'PATCH',
                body: {
                    ...initialBigDataAnalyticsTutor,
                }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'BigDataAnalyticsTutor', id: arg.id }
            ]
        }),
        deleteBigDataAnalyticsTutor: builder.mutation({
            query: ({ id }) => ({
                url: `/bigDataAnalyticsTutors`,
                method: 'DELETE',
                body: { id }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'BigDataAnalyticsTutor', id: arg.id }
            ]
        }),
    }),
})

export const {
    useGetBigDataAnalyticsTutorsQuery,
    useAddNewBigDataAnalyticsTutorMutation,
    useUpdateBigDataAnalyticsTutorMutation,
    useDeleteBigDataAnalyticsTutorMutation,
} = bigDataAnalyticsTutorsApiSlice

// returns the query result object
export const selectBigDataAnalyticsTutorsResult = bigDataAnalyticsTutorsApiSlice.endpoints.getBigDataAnalyticsTutors.select()

// creates memoized selector
const selectBigDataAnalyticsTutorsData = createSelector(
    selectBigDataAnalyticsTutorsResult,
    bigDataAnalyticsTutorsResult => bigDataAnalyticsTutorsResult.data // normalized state object with ids & entities
)

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllBigDataAnalyticsTutors,
    selectById: selectBigDataAnalyticsTutorById,
    selectIds: selectBigDataAnalyticsTutorIds
    // Pass in a selector that returns the bigDataAnalyticsTutor slice of state
} = bigDataAnalyticsTutorsAdapter.getSelectors(state => selectBigDataAnalyticsTutorsData(state) ?? initialState)