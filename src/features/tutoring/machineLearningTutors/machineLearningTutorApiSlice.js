import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";
import { apiSlice } from "../../../app/api/apiSlice"

const machineLearningTutorsAdapter = createEntityAdapter({
    sortComparer: (a, b) => (a.completed === b.completed) ? 0 : a.completed ? 1 : -1
})

const initialState = machineLearningTutorsAdapter.getInitialState()

export const machineLearningTutorsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getMachineLearningTutors: builder.query({
            query: () => ({
                url: '/machineLearningTutors',
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError
                },
            }),
            transformResponse: responseData => {
                const loadedMachineLearningTutors = responseData.map(machineLearningTutor => {
                    machineLearningTutor.id = machineLearningTutor._id
                    return machineLearningTutor
                });
                return machineLearningTutorsAdapter.setAll(initialState, loadedMachineLearningTutors)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'MachineLearningTutor', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'MachineLearningTutor', id }))
                    ]
                } else return [{ type: 'MachineLearningTutor', id: 'LIST' }]
            }
        }),
        addNewMachineLearningTutor: builder.mutation({
            query: initialMachineLearningTutor => ({
                url: '/machineLearningTutors',
                method: 'POST',
                body: {
                    ...initialMachineLearningTutor,
                }
            }),
            invalidatesTags: [
                { type: 'MachineLearningTutor', id: "LIST" }
            ]
        }),
        updateMachineLearningTutor: builder.mutation({
            query: initialMachineLearningTutor => ({
                url: '/machineLearningTutors',
                method: 'PATCH',
                body: {
                    ...initialMachineLearningTutor,
                }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'MachineLearningTutor', id: arg.id }
            ]
        }),
        deleteMachineLearningTutor: builder.mutation({
            query: ({ id }) => ({
                url: `/machineLearningTutors`,
                method: 'DELETE',
                body: { id }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'MachineLearningTutor', id: arg.id }
            ]
        }),
    }),
})

export const {
    useGetMachineLearningTutorsQuery,
    useAddNewMachineLearningTutorMutation,
    useUpdateMachineLearningTutorMutation,
    useDeleteMachineLearningTutorMutation,
} = machineLearningTutorsApiSlice

// returns the query result object
export const selectMachineLearningTutorsResult = machineLearningTutorsApiSlice.endpoints.getMachineLearningTutors.select()

// creates memoized selector
const selectMachineLearningTutorsData = createSelector(
    selectMachineLearningTutorsResult,
    machineLearningTutorsResult => machineLearningTutorsResult.data // normalized state object with ids & entities
)

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllMachineLearningTutors,
    selectById: selectMachineLearningTutorById,
    selectIds: selectMachineLearningTutorIds
    // Pass in a selector that returns the machineLearningTutor slice of state
} = machineLearningTutorsAdapter.getSelectors(state => selectMachineLearningTutorsData(state) ?? initialState)