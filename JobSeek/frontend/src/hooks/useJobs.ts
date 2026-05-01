import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "./useJobSlice";
import {setJobs,setSelectedJob,addJob,updateJob,deleteJob,setLoading,setError,} from "../store/slices/jobSlice";
import { jobServices } from "../services/jobServices";
import type { Job } from "../store/slices/jobSlice";
import toast from "react-hot-toast";
export interface CreateJobInput {
  title: string;
  description: string;
  company: string;
  location: string;
  salary: string;
  skills: string[];
}
export const useJobs = () => {
const dispatch = useAppDispatch();
const { jobs, selectedJob, loading, error } = useAppSelector(
(state) => state.jobs
);

const createJob = useCallback(
async (data: CreateJobInput) => {
try {
dispatch(setLoading(true));
    const newJob = await jobServices.createJob(data);

    dispatch(addJob(newJob));
    toast.success("Job created successfully!");

    return true;
  } catch (err: any) {
    const message = err.response?.data?.message || "Job creation failed";
    dispatch(setError(message));
    toast.error(message);
    return false;
  } finally {
    dispatch(setLoading(false));
  }
},
[dispatch]


);

const fetchJobs = useCallback(async () => {
try {
dispatch(setLoading(true));
  const response = await jobServices.getJobs();
  dispatch(setJobs(response.jobs));
} catch (err: any) {
  const message = err.response?.data?.message || "Failed to fetch jobs";
  dispatch(setError(message));
  toast.error(message);
} finally {
  dispatch(setLoading(false));
}


}, [dispatch]);

const fetchJobById = useCallback(
async (id: number) => {
try {
dispatch(setLoading(true));

    const job = await jobServices.getJobById(id);

    dispatch(setSelectedJob(job));
  } catch (err: any) {
    const message = err.response?.data?.message || "Failed to fetch job";
    dispatch(setError(message));
    toast.error(message);
  } finally {
    dispatch(setLoading(false));
  }
},
[dispatch]

);

const editJob = useCallback(
async (id: number, data: Job) => {
try {
dispatch(setLoading(true));
    const updatedJob = await jobServices.updateJob(id, data);
    dispatch(updateJob(updatedJob));
    toast.success("Job updated successfully!");
  } catch (err: any) {
    const message = err.response?.data?.message || "Failed to update job";
    dispatch(setError(message));
    toast.error(message);
  } finally {
    dispatch(setLoading(false));
  }
},
[dispatch]


);

const removeJob = useCallback(
async (id: number) => {
try {
dispatch(setLoading(true));
    await jobServices.deleteJob(id);

    dispatch(deleteJob(id));
    toast.success("Job deleted successfully!");
  } catch (err: any) {
    const message = err.response?.data?.message || "Failed to delete job";
    dispatch(setError(message));
    toast.error(message);
  } finally {
    dispatch(setLoading(false));
  }
},
[dispatch]
);
const clearJob = useCallback(() => {
dispatch(setSelectedJob(null));
}, [dispatch]);

return {
jobs,
selectedJob,
loading,
error,
createJob,
fetchJobs,
fetchJobById,
editJob,
removeJob,
clearJob,
};
};
