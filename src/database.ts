import { MongoClient, Db } from "mongodb";
import { Data } from './config';
export class Database {
  private url: string = Data.DATABASE_URL;
  private client: MongoClient = new MongoClient(this.url);
  private dbname = Data.DATABASE_NAME;
  constructor() {
    this.connectToMongoDb();
  }

  async connectToMongoDb(): Promise<Db> {
    try {
      if (!this.client || !this.client.isConnected()) {
        this.client = await MongoClient.connect(this.url, {
          useUnifiedTopology: true,
        });
      }
    } catch (err) {
      // console.log(err);
    }
    return this.client.db(this.dbname);
  }
}
