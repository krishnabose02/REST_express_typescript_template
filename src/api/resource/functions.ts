import { Db, ObjectId } from "mongodb";
import { Request, Response } from "express";
export class Functions {
    constructor(private db: Db, private COLLECTION: string) { }

    // GET
    async getAll(req: Request, res: Response) {
        try {
            const data= await this.db.collection(this.COLLECTION).find({}).toArray();
            return res.send({data});
        } catch (err) {
            return res.status(500).send({ message: 'Internal Server Error', error: err });
        }
    }

    // POST
    async create(req: Request, res: Response) {
        try {
            const data = await this.db.collection(this.COLLECTION).insertOne(req.body);
            return res.send({insertedId: data.insertedId});
        } catch (err) {
            return res.status(500).send({ message: 'Internal Server Error', error: err });
        }
    }

    isValidRequest(req: Request, res: Response): boolean {
        if (!req.params.id) {
            res.status(400).send({ message: 'Missing parameter id' });
            return false;
        }

        try {
            const id = new ObjectId(req.params.id);
            return true;
        } catch (err) {
            res.status(400).send({ message: 'Invalid parameter id' });
            return false;
        }
    }

    // GET
    async read(req: Request, res: Response) {
        try {
            if (!this.isValidRequest(req, res)) {
                return;
            }
            const _id = new ObjectId(req.params.id);
            const data = await this.db.collection(this.COLLECTION).findOne({ _id });
            if (!data) {
                return res.status(404).send({message: 'No data found!'});
            }
            return res.send({ data });
        } catch (err) {
            return res.status(500).send({ message: 'Internal Server Error', error: err });
        }
    }

    // PUT
    async update(req: Request, res: Response) {
        try {
            if (!this.isValidRequest(req, res)) {
                return;
            }
            if (Object.keys(req.body).length === 0) {
                return res.status(400).send({message: 'No body specified!'});
            }
            const _id = new ObjectId(req.params.id);
            const data = await this.db.collection(this.COLLECTION).updateOne({ _id }, {$set: req.body}, {upsert: true});
            return res.send({ data });
        } catch (err) {
            return res.status(500).send({ message: 'Internal Server Error', error: err });
        }
    }

    // DELETE
    async delete(req: Request, res: Response) {
        try {
            if (!this.isValidRequest(req, res)) {
                return;
            }
            const _id = new ObjectId(req.params.id);
            const data = await this.db.collection(this.COLLECTION).deleteOne({ _id });
            return res.send({ data });
        } catch (err) {
            return res.status(500).send({ message: 'Internal Server Error', error: err });
        }
    }
}
