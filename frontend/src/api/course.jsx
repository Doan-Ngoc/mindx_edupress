import { request } from "../utils/request";

export const createCourse = async (data) => {
  try {
    const response = await request.post("/courses", data);
    return response;
  } catch (error) {
    console.error("Error creating course:", error);
    throw error;
  }
};

export const enrollCourse = async (courseId) => {
    const response = await request.post(`/courses/enroll/${courseId}`);
    return response;
};
