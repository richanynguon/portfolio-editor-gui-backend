import { Request, Response } from 'express';
import DataLoader = require('dataloader');


export interface MyContext {
  req: Request,
  res: Response,
}