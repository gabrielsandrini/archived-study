import { Router } from 'express';

import peopleRoutes from '@modules/people/infra/http/routes/people.routes';

const routes = Router();

routes.use('/api', peopleRoutes);

export default routes;
