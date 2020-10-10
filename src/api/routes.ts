import { Router } from "express";
import { Database } from "../database";
import { Db } from "mongodb";
import { Routes } from "./resource/routes";
import { Resources } from '../config';
export class BaseRoutes {
  private router: Router;
  constructor() {
    this.setupRoutes();
    this.router = Router();
  }

  getRouter(): Router {
    return this.router;
  }

  async setupRoutes() {
    const db: Db = await new Database().connectToMongoDb();

    Resources.forEach(element => {
      this.router = this.router.use(element.path, new Routes(db, element.dbCollectionName).getRoutes());
    });
  }
}
