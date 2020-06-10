import { getRepository } from 'typeorm';
import { Request, Response } from 'express';
import { CourseCategory } from '../entity/CourseCategory';
import { validate } from 'class-validator';

export class CourseCategoryController {
  static getAll = async (req: Request, res: Response): Promise<Response> => {
    try {
      const categories = await getRepository(CourseCategory).find();
      return res.json(categories);
    } catch (err) {
      res.status(500).send('Server Error');
    }
  };

  static getById = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;

    try {
      const category = await getRepository(CourseCategory).findOne(id);
      if (!category) {
        return res.status(404).json({ message: 'Category not found' });
      }
      res.json(category);
    } catch (err) {
      res.status(500).send('Server error');
    }
  };

  static create = async (req: Request, res: Response): Promise<Response> => {
    const { title, type } = req.body;
    const category = new CourseCategory();

    category.title = title;
    category.type = type;

    // validate
    const errors = await validate(category, {
      validationError: { target: false, value: false },
    });
    if (errors.length > 0) {
      return res.status(400).json(errors);
    }

    try {
      await getRepository(CourseCategory).save(category);
    } catch (err) {
      return res.status(409).json({ message: 'Category already exists' });
    }

    //
    res.json(category);
  };

  static update = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const category = await getRepository(CourseCategory).findOne(id);
    if (category) {
      getRepository(CourseCategory).merge(category, req.body);
      const results = await getRepository(CourseCategory).save(category);
      return res.json(results);
    }
    return res.status(400).json({ message: 'Category not found' });
  };

  static delete = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.body;
    try {
      const result = await getRepository(CourseCategory).delete(id);
      return res.json(result);
    } catch (err) {
      return res.status(500).send('Server errror');
    }
  };
}
