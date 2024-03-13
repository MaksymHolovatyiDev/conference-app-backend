import 'reflect-metadata';
import express from 'express';
import {useExpressServer} from 'routing-controllers';

import {IServes} from 'types/servers';
import {controllers} from 'app/domain';

const PORT = 3000;

export class Tcp implements IServes {
  private static instance: Tcp;

  private routePrefix = '/api';
  private server = express();

  constructor() {
    if (!Tcp.instance) {
      Tcp.instance = this;
    }
    return Tcp.instance;
  }

  async init() {
    const {server, routePrefix} = this;

    useExpressServer(server, {
      routePrefix,
      controllers,
      cors: true,
      defaultErrorHandler: true,
    });

    return new Promise<boolean>((resolve: any) => {
      server.listen(PORT || 8080, () => {
        console.log(`Tcp service started! Port ${PORT}!`);

        return resolve(true);
      });
    });
  }
}