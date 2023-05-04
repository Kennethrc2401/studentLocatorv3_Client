import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";
import { apiSlice } from "../../../app/api/apiSlice"

const mobileAppGameDevelopmentTutorsAdapter = createEntityAdapter({
    sortComparer: (a, b) => (a.completed === b.completed) ? 0 : a.completed ? 1 : -1
})

const initialState = mobileAppGameDevelopmentTutorsAdapter.getInitialState()

export const mobileAppGameDevelopmentTutorsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getMobileAppGameDevelopmentTutors: builder.query({
            query: () => ({
                url: '/mobileAppGameDevelopmentTutors',
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError
                },
            }),
            transformResponse: responseData => {
                const loadedMobileAppGameDevelopmentTutors = responseData.map(mobileAppGameDevelopmentTutor => {
                    mobileAppGameDevelopmentTutor.id = mobileAppGameDevelopmentTutor._id
                    return mobileAppGameDevelopmentTutor
                });
                return mobileAppGameDevelopmentTutorsAdapter.setAll(initialState, loadedMobileAppGameDevelopmentTutors)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'MobileAppGameDevelopmentTutor', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'MobileAppGameDevelopmentTutor', id }))
                    ]
                } else return [{ type: 'MobileAppGameDevelopmentTutor', id: 'LIST' }]
            }
        }),
        addNewMobileAppGameDevelopmentTutor: builder.mutation({
            query: initialMobileAppGameDevelopmentTutor => ({
                url: '/mobileAppGameDevelopmentTutors',
                method: 'POST',
                body: {
                    ...initialMobileAppGameDevelopmentTutor,
                }
            }),
            invalidatesTags: [
                { type: 'MobileAppGameDevelopmentTutor', id: "LIST" }
            ]
        }),
        updateMobileAppGameDevelopmentTutor: builder.mutation({
            query: initialMobileAppGameDevelopmentTutor => ({
                url: '/mobileAppGameDevelopmentTutors',
                method: 'PATCH',
                body: {
                    ...initialMobileAppGameDevelopmentTutor,
                }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'MobileAppGameDevelopmentTutor', id: arg.id }
            ]
        }),
        deleteMobileAppGameDevelopmentTutor: builder.mutation({
            query: ({ id }) => ({
                url: `/mobileAppGameDevelopmentTutors`,
                method: 'DELETE',
                body: { id }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'MobileAppGameDevelopmentTutor', id: arg.id }
            ]
        }),
    }),
})

export const {
    useGetMobileAppGameDevelopmentTutorsQuery,
    useAddNewMobileAppGameDevelopmentTutorMutation,
    useUpdateMobileAppGameDevelopmentTutorMutation,
    useDeleteMobileAppGameDevelopmentTutorMutation,
} = mobileAppGameDevelopmentTutorsApiSlice

// returns the query result object
export const selectMobileAppGameDevelopmentTutorsResult = mobileAppGameDevelopmentTutorsApiSlice.endpoints.getMobileAppGameDevelopmentTutors.select()

// creates memoized selector
const selectMobileAppGameDevelopmentTutorsData = createSelector(
    selectMobileAppGameDevelopmentTutorsResult,
    mobileAppGameDevelopmentTutorsResult => mobileAppGameDevelopmentTutorsResult.data // normalized state object with ids & entities
)

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllMobileAppGameDevelopmentTutors,
    selectById: selectMobileAppGameDevelopmentTutorById,
    selectIds: selectMobileAppGameDevelopmentTutorIds
    // Pass in a selector that returns the mobileAppGameDevelopmentTutor slice of state
} = mobileAppGameDevelopmentTutorsAdapter.getSelectors(state => selectMobileAppGameDevelopmentTutorsData(state) ?? initialState)