import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

type Status = "ACTIVE" | "CLOSED" | "DRAFT";

export interface Job {
id: number;
title: string;
description: string;
company: string;
location: string;
salary: string;
skills: string[];
status: Status;
recruiterId: number;
}

interface JobState {
jobs: Job[];
selectedJob: Job | null;
loading: boolean;
error: string | null;
success: boolean;
}

const initialState: JobState = {
jobs: [],
selectedJob: null,
loading: false,
error: null,
success: false,
};

const jobSlice = createSlice({
name: 'jobs',
initialState,
reducers: {
setJobs: (state, action: PayloadAction<Job[]>) => {
state.jobs = action.payload;
state.loading = false;
state.error = null;
},
setSelectedJob: (state, action: PayloadAction<Job | null>) => {
  state.selectedJob = action.payload;
},

addJob: (state, action: PayloadAction<Job>) => {
  state.jobs.push(action.payload);
  state.loading = false;
  state.error = null;
  state.success = true;
},

updateJob: (state, action: PayloadAction<Job>) => {
  const index = state.jobs.findIndex(job => job.id === action.payload.id);

  if (index !== -1) {
    state.jobs[index] = action.payload;
  }

  if (state.selectedJob?.id === action.payload.id) {
    state.selectedJob = action.payload;
  }

  state.loading = false;
  state.error = null;
  state.success = true;
},

deleteJob: (state, action: PayloadAction<number>) => {
  state.jobs = state.jobs.filter(job => job.id !== action.payload);

  if (state.selectedJob?.id === action.payload) {
    state.selectedJob = null;
  }

  state.loading = false;
  state.error = null;
},

setLoading: (state, action: PayloadAction<boolean>) => {
  state.loading = action.payload;
},

setError: (state, action: PayloadAction<string | null>) => {
  state.error = action.payload;
  state.loading = false;
},

clearSelectedJob: (state) => {
  state.selectedJob = null;
},

resetSuccess: (state) => {
  state.success = false;
}

}
});

export const {setJobs,setSelectedJob,addJob,updateJob,deleteJob,setLoading,setError,clearSelectedJob,resetSuccess} = jobSlice.actions;

export default jobSlice.reducer;
