import api from './api';
import type { Job } from "../store/slices/jobSlice";
import type {CreateJobInput} from '../hooks/useJobs';
export const jobServices = {
   createJob: async (data: CreateJobInput) => {
        const response = await api.post('/jobs/createJob', data);
        return response.data;
   },
   getJobs: async () => {
        const response = await api.get('/jobs/getMyJobs');
        return response.data;
   },
   getMyJobs: async () => {
        const response = await api.get('/jobs/getMyJobs');
        return response.data;
   },
   getJobById: async (id: number) => {
        const response = await api.get(`/jobs/getJobById/${id}`);
        return response.data.job;
   },
   updateJob: async (id: number, data: Job) => {
        const response = await api.put(`/jobs/editJob/${id}`, data);
        return response.data;
   },
   deleteJob: async (id: number) => {
        const response = await api.delete(`/jobs/deleteJob/${id}`);
        return response.data;
   },
};