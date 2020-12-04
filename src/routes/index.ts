import { Router } from 'express';

import auth from './auth';
import user from './user';
import course from './course';
import courseCategory from './courseCategory';
import courseTag from './courseTag';
import chapter from './chapter';
import language from './language';

const routes = Router();

routes.use('/api/auth', auth);
routes.use('/api/users', user);
routes.use('/api/courses', course);
routes.use('/api/course-categories', courseCategory);
routes.use('/api/course-tags', courseTag);
routes.use('/api/chapters', chapter);
routes.use('/api/languages', language);

export default routes;