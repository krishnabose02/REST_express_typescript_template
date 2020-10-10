import express from "express";
import { Db } from "mongodb";
import { Auth } from "../../middlewares/auth";
import { Functions } from "./functions";

export class Routes {
  /*
   * A specific resource path has 5 endpoints
   * 1. GET - RESOURCE_PATH/
   *          gives a list of all the resources of this type
   *
   * 2. GET - /RESOURCE_PATH/:id
   *          gives the user object of a single user having _id as :id
   *
   * 3. POST - /RESOURCE_PATH
   *           creates a resource of this type
   *
   * 4. PUT - /RESOURCE_PATH/:id
   *          Updates the resource object having _id as :id
   *
   * 5. DELETE - /RESOURCE_PATH/:id
   *          Deletes the resource object having _id as :id
   */

  private functions: Functions;

  constructor(private db: Db, private DB_COLLECTION_NAME: string) {
    this.functions = new Functions(db, this.DB_COLLECTION_NAME);
  }

  getRoutes() {
    const auth = new Auth().verifyToken;

    return (
      express
        .Router()
        .get('/', (req, res) => {
            this.functions.getAll(req, res);
        })
        .post('/', (req, res) => {
            this.functions.create(req, res);
        })
        .get("/:id", (req, res) => {
          this.functions.read(req, res);
        })
        .put("/:id", (req, res) => {
          this.functions.update(req, res);
        })
        .delete('/:id', (req, res) => {
          this.functions.delete(req, res);
        })
    );
  }
}
