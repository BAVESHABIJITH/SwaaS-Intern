import { useState } from "react";
import { api } from "../services/api";

interface PersonalInformation {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  professionalSummary: string;
}
interface Education {
  degree: string;
  institution: string;
  year: string;
  grade: string;
}
interface Experience {
  jobTitle: string;
  company: string;
  duration: string;
  description: string;
}
interface Skills {
  skill: string;
  proficiency: string;
}
interface Projects {
  projectTitle: string;
  techStack: string;
  links: string;
  description: string;
}
interface Content{
  PersonalInformation: PersonalInformation;
  education: Education[];
  experience: Experience[];
  skills: Skills[];
  projects: Projects[];
}
export interface ResumeData {
  title: string;
  content: Content;
}

export const useCreateResume = () => {
  const createResume = async (data: ResumeData) => {
    try {
      const response = await api.post("/users/createResume", data);
      return response.data;
    } catch (error) {
      throw error;
    } 
  };
  return {
    createResume
  };
};

export const getResumes = async () => {
  try {
    const response = await api.get('/users/getMyResumes');
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const getResumeById = async (resumeId: string) => {
  try {
    const response = await api.get(`/users/getResumeById/${resumeId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const updateResumeByID = () => {
  const updatedResume = async (data: ResumeData, resumeId: string) => {
    try {
      const requiredResume = await api.get(`/users/getResumeById/${resumeId}`);
      if(!requiredResume){
        throw new Error("Resume not found");
      }
      const response = await api.put(`/users/updateResume/${resumeId}`,data);
      return response.data;
    } catch (error) {
      throw error;
    } 
  };
  return {
    updatedResume
  };
};
export const deleteResume = async (resumeId: string) => {
  try {
    const response = await api.delete(`/users/deleteResume/${resumeId}`)
    return response.data;
  }
  catch(err){
    throw err;
  }
}
 