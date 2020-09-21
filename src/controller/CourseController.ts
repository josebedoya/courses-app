import { getRepository } from 'typeorm';
import { Request, Response } from 'express';
import { Course } from '../entity/Course';
import { validate } from 'class-validator';

export class CourseController {
  static getAll = async (req: Request, res: Response): Promise<Response> => {
    try {
      const courses = await getRepository(Course).find();
      return res.json(courses);
    } catch (err) {
      res.status(500).send('Server Error');
    }
  };

  static getById = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;

    try {
      const course = await getRepository(Course).findOne(id);
      if (!course) {
        return res.status(404).json({ message: 'Course not found' });
      }
      res.json(course);
    } catch (err) {
      res.status(500).send('Server error');
    }
  };

  static create = async (req: Request, res: Response): Promise<Response> => {
    const { title, link, courseCategoryId, languageId } = req.body;
    const course = new Course();

    course.title = title;
    course.link = link;
    course.courseCategory = courseCategoryId;
    course.language = languageId;

    // validate
    const errors = await validate(course, {
      validationError: { target: false, value: false },
    });
    if (errors.length > 0) {
      return res.status(400).json(errors);
    }

    try {
      await getRepository(Course).save(course);
    } catch (err) {
      return res.status(409).json({ message: 'Course already exists' });
    }
    //
    res.json(course);
  };

  static update = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const course = await getRepository(Course).findOne(id);
    if (course) {
      getRepository(Course).merge(course, req.body);
      const results = await getRepository(Course).save(course);
      return res.json(results);
    }
    return res.status(400).json({ message: 'Course not found' });
  };

  static delete = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.body;
    try {
      const result = await getRepository(Course).delete(id);
      return res.json(result);
    } catch (err) {
      return res.status(500).send('Server errror');
    }
  };
}
