import * as express from 'express';
import {Logger} from '@ziqquratu/ziqquratu';
import {post, get, router, ControllerFactory, del} from '@ziqquratu/tashmetu';
import * as path from 'path';
import * as fs from 'fs';
import * as multer from 'multer';


export interface DiskContentRouterConfig {
  destination: (postId: string) => string;
  fieldName: string;
}

class DiskContentRouter {
  private upload: express.RequestHandler;

  public constructor(private config: DiskContentRouterConfig) {
    const storage = multer.diskStorage({
      destination: (req, file, cb) => {
        const path = config.destination(req.params.id);
        fs.mkdirSync(path, { recursive: true })
        cb(null, path);
      },
      filename: (req, file, cb) => {
        cb(null, file.originalname);
      }
    });
    this.upload = multer({ storage: storage }).single('image');
  }

  public toString() {
    return `disk content at '${this.config.destination(':postId')}' using field '${this.config.fieldName}'`;
  }

  @get('/:id')
  public async listFiles(req: express.Request, res: express.Response): Promise<any> {
    return this.readDir(req.params.id);
  }

  @get('/:id/:file')
  public downloadFile(req: express.Request, res: express.Response) {
    res.sendfile(this.filePath(req.params.id, req.params.file));
  }

  @post('/:id')
  public uploadFile(req: express.Request, res: express.Response) {
    this.upload(req, res, (err) => {
      console.log(err);
      res.send(err);
    })
  }

  @del('/:id/:file')
  public deleteFile(req: express.Request, res: express.Response) {
    try {
      fs.unlinkSync(this.filePath(req.params.id, req.params.file));
      res.status(200).json({});
    } catch (err) {
      res.status(500).send(err);
    }
  }

  private filePath(postId: string, fileName: string): string {
    return path.join(this.config.destination(postId), fileName);
  }

  readDir(postId: string) {
    try {
      return fs.readdirSync(this.config.destination(postId));
    } catch (err) {
      return [];
    }
  }
}

export class DiskContentRouterFactory extends ControllerFactory {
  constructor(private config: DiskContentRouterConfig) {
    super('tashmetu.Logger');
  }

  public create(): Promise<any> {
    return this.resolve(async (logger: Logger) => {
      return new DiskContentRouter(this.config);
    });
  }
}

export const diskContent = (config: DiskContentRouterConfig) =>
  router(new DiskContentRouterFactory(config));
