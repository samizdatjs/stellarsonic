import * as express from 'express';
import {Logger} from '@ziqquratu/ziqquratu';
import {get, router, ControllerFactory, put} from '@ziqquratu/tashmetu';
import * as fs from 'fs';
import * as yaml from 'js-yaml';

class YamlFileRouter {
  public constructor(private path: string) {}

  @get('/')
  public async getDocument(req: express.Request, res: express.Response): Promise<any> {
    return await yaml.safeLoad(fs.readFileSync(this.path, 'utf-8'));
  }

  @put('/')
  public async saveDocument(req: express.Request, res: express.Response) {
    fs.writeFileSync(this.path, await yaml.safeDump(req.body));
    return {};
  }
}

export class YamlFileRouterFactory extends ControllerFactory {
  constructor(private path: string) {
    super('tashmetu.Logger');
  }

  public create(): Promise<any> {
    return this.resolve(async (logger: Logger) => {
      return new YamlFileRouter(this.path);
    });
  }
}

export const yamlFile = (path: string) =>
  router(new YamlFileRouterFactory(path));
