import { getRepository } from 'typeorm';
import { Request, Response } from 'express';
import { Chapter } from '../entity/Chapter';
import { validate } from 'class-validator';

export class ChapterController {
  static getAllByCourseId = async (req: Request, res: Response): Promise<Response> => {
    const { courseId } = req.params;
    try {
      const courses = await getRepository(Chapter).find({ where: { courseId: courseId } });
      return res.json(courses);
    } catch (err) {
      res.status(500).send('Server Error');
    }
  }

  static create = async (req: Request, res: Response): Promise<Response> => {
    const { title, duration, courseId } = req.body;
    const chapter = new Chapter();

    chapter.title = title;
    chapter.duration = duration;
    chapter.course = courseId;

    // validate
    const errors = await validate(chapter, {
      validationError: { target: false, value: false },
    });
    if (errors.length > 0) {
      return res.status(400).json(errors);
    }

    try {
      const result = await getRepository(Chapter).save(chapter);
      // const data = await getRepository(Chapter).findOne(result.id, { relations: ['courseCategory', 'language'] });
      return res.json(result);
    } catch (err) {
      return res.status(409).json({ message: 'Chapter already exists' });
    }
  }

  // static update = async (req: Request, res: Response): Promise<Response> => {

  // }

  static delete = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.body;
    try {
      const result = await getRepository(Chapter).delete(id);
      return res.json(result);
    } catch (err) {
      return res.status(500).send('Server error');
    }
  }


};