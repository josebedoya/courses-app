import { getRepository } from 'typeorm';
import { Request, Response } from 'express';
import { CourseTag } from '../entity/CourseTag';
import { validate } from 'class-validator';

export class CourseTagController {
  static getAll = async (req: Request, res: Response): Promise<Response> => {
    try {
      const tags = await getRepository(CourseTag).find();
      return res.json(tags);
    } catch (err) {
      res.status(500).send('Server Error');
    }
  };

  static getById = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
      const tag = await getRepository(CourseTag).findOne(id);
      if (!tag) {
        return res.status(404).json({ message: 'Tag not found' });
      }
      res.json(tag);
    } catch (err) {
      res.status(500).send('Server error');
    }
  };

  static create = async (req: Request, res: Response) => {
    const { title } = req.body;
    const tag = new CourseTag();

    tag.title = title;

    // validate
    const errors = await validate(tag, {
      validationError: { target: false, value: false },
    });
    if (errors.length > 0) {
      return res.status(400).json(errors);
    }

    try {
      await getRepository(CourseTag).save(tag);
    } catch (err) {
      return res.status(409).json({ message: 'Tag already exists' });
    }

    //
    res.json({ message: 'Tag created' });
  };
}
