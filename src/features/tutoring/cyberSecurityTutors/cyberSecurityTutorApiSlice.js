import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";
import { apiSlice } from "../../../app/api/apiSlice"

const cyberSecurityTutorsAdapter = createEntityAdapter({
    sortComparer: (a, b) => (a.completed === b.completed) ? 0 : a.completed ? 1 : -1
})

const initialState = cyberSecurityTutorsAdapter.getInitialState()

export const cyberSecurityTutorsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getCyberSecurityTutors: builder.query({
            query: () => ({
                url: '/cyberSecurityTutors',
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError
                },
            }),
            transformResponse: responseData => {
                const loadedCyberSecurityTutors = responseData.map(cyberSecurityTutor => {
                    cyberSecurityTutor.id = cyberSecurityTutor._id
                    return cyberSecurityTutor
                });
                return cyberSecurityTutorsAdapter.setAll(initialState, loadedCyberSecurityTutors)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'CyberSecurityTutor', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'CyberSecurityTutor', id }))
                    ]
                } else return [{ type: 'CyberSecurityTutor', id: 'LIST' }]
            }
        }),
        addNewCyberSecurityTutor: builder.mutation({
            query: initialCyberSecurityTutor => ({
                url: '/cyberSecurityTutors',
                method: 'POST',
                body: {
                    ...initialCyberSecurityTutor,
                }
            }),
            invalidatesTags: [
                { type: 'CyberSecurityTutor', id: "LIST" }
            ]
        }),
        updateCyberSecurityTutor: builder.mutation({
            query: initialCyberSecurityTutor => ({
                url: '/cyberSecurityTutors',
                method: 'PATCH',
                body: {
                    ...initialCyberSecurityTutor,
                }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'CyberSecurityTutor', id: arg.id }
            ]
        }),
        deleteCyberSecurityTutor: builder.mutation({
            query: ({ id }) => ({
                url: `/cyberSecurityTutors`,
                method: 'DELETE',
                body: { id }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'CyberSecurityTutor', id: arg.id }
            ]
        }),
    }),
})

export const {
    useGetCyberSecurityTutorsQuery,
    useAddNewCyberSecurityTutorMutation,
    useUpdateCyberSecurityTutorMutation,
    useDeleteCyberSecurityTutorMutation,
} = cyberSecurityTutorsApiSlice

// returns the query result object
export const selectCyberSecurityTutorsResult = cyberSecurityTutorsApiSlice.endpoints.getCyberSecurityTutors.select()

// creates memoized selector
const selectCyberSecurityTutorsData = createSelector(
    selectCyberSecurityTutorsResult,
    cyberSecurityTutorsResult => cyberSecurityTutorsResult.data // normalized state object with ids & entities
)

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllCyberSecurityTutors,
    selectById: selectCyberSecurityTutorById,
    selectIds: selectCyberSecurityTutorIds
    // Pass in a selector that returns the cyberSecurityTutor slice of state
} = cyberSecurityTutorsAdapter.getSelectors(state => selectCyberSecurityTutorsData(state) ?? initialState)