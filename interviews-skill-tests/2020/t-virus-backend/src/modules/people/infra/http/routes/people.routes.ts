import { Router } from 'express';
import PeopleController from '../controller/PeopleController';
import InfectedController from '../controller/InfectedController';
import TradeController from '../controller/TradeController';

const peopleRouter = Router();
const peopleController = new PeopleController();
const infectedController = new InfectedController();
const tradeController = new TradeController();

peopleRouter.post('/people.json', peopleController.create);
peopleRouter.patch('/people/:id', peopleController.update);
peopleRouter.post(
  '/people/:id/report_infection.json',
  infectedController.create,
);
peopleRouter.post(
  '/people/:id/properties/trade_item.json',
  tradeController.create,
);

export default peopleRouter;
