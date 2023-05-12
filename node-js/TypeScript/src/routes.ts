import { Request, Response } from "express";
import CreateCourseServide from "./CreateCourse";

export function createCourse(request: Request, response: Response) {
    CreateCourseServide.execute({
        name:"Nodejs", 
        duration:12, 
        educator:"John"})
    return response.send()
}