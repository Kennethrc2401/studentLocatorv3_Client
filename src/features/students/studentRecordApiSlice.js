import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice"

const studentRecordsAdapter = createEntityAdapter({
    sortComparer: (a, b) => (a.completed === b.completed) ? 0 : a.completed ? 1 : -1
})

const initialState = studentRecordsAdapter.getInitialState()

export const studentRecordsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getStudentRecords: builder.query({
            query: () => ({
                url: '/studentRecords',
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError
                },
            }),
            transformResponse: responseData => {
                const loadedStudentRecords = responseData.map(studentRecord => {
                    studentRecord.id = studentRecord._id
                    return studentRecord
                });
                return studentRecordsAdapter.setAll(initialState, loadedStudentRecords)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'StudentRecord', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'StudentRecord', id }))
                    ]
                } else return [{ type: 'StudentRecord', id: 'LIST' }]
            }
        }),
        addNewStudentRecord: builder.mutation({
            query: initialStudentRecord => ({
                url: '/studentRecords',
                method: 'POST',
                body: {
                    ...initialStudentRecord,
                }
            }),
            invalidatesTags: [
                { type: 'StudentRecord', id: "LIST" }
            ]
        }),
        updateStudentRecord: builder.mutation({
            query: initialStudentRecord => ({
                url: '/studentRecords',
                method: 'PATCH',
                body: {
                    ...initialStudentRecord,
                }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'StudentRecord', id: arg.id }
            ]
        }),
        deleteStudentRecord: builder.mutation({
            query: ({ id }) => ({
                url: `/studentRecords`,
                method: 'DELETE',
                body: { id }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'StudentRecord', id: arg.id }
            ]
        }),
    }),
})

export const {
    useGetStudentRecordsQuery,
    useAddNewStudentRecordMutation,
    useUpdateStudentRecordMutation,
    useDeleteStudentRecordMutation,
} = studentRecordsApiSlice

// returns the query result object
export const selectStudentRecordsResult = studentRecordsApiSlice.endpoints.getStudentRecords.select()

// creates memoized selector
const selectStudentRecordsData = createSelector(
    selectStudentRecordsResult,
    studentRecordsResult => studentRecordsResult.data // normalized state object with ids & entities
)

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllStudentRecords,
    selectById: selectStudentRecordById,
    selectIds: selectStudentRecordIds
    // Pass in a selector that returns the studentRecord slice of state
} = studentRecordsAdapter.getSelectors(state => selectStudentRecordsData(state) ?? initialState)