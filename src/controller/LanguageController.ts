import { getRepository } from 'typeorm';
import { Request, Response } from 'express';
import { Language } from '../entity/Language';
import { validate } from 'class-validator';

export class LanguageController {
  static getAll = async (req: Request, res: Response): Promise<Response> => {
    try {
      const languages = await getRepository(Language).find();
      return res.json(languages);
    } catch (err) {
      res.status(500).send('Server Error');
    }
  };

  static getById = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
      const language = await getRepository(Language).findOne(id);
      if (!language) {
        return res.status(404).json({ message: 'Language not found' });
      }
      res.json(language);
    } catch (err) {
      res.status(500).send('Server error');
    }
  };

  static create = async (req: Request, res: Response) => {
    const { title, code } = req.body;
    const language = new Language();

    language.title = title;
    language.code = code;

    // validate
    const errors = await validate(language, {
      validationError: { target: false, value: false },
    });
    if (errors.length > 0) {
      return res.status(400).json(errors);
    }

    try {
      await getRepository(Language).save(language);
    } catch (err) {
      return res.status(409).json({ message: 'Language already exists' });
    }

    //
    res.json({ message: 'Language created' });
  };
}
