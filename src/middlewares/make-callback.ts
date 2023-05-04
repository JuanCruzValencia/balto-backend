import * as Sentry from "@sentry/node";
import { Request, Response } from "express";
import { Http2ServerResponse } from "http2";

export default (controller) => (req: Request, res: Response) => {
  const httpRequest = {
    body: req.body,
    query: req.query,
    params: req.params,
    ip: req.ip,
    method: req.method,
    path: req.path,
    user: req.user,
    logger: req.logger,
    source: {
      ip: req.ip,
      browser: req.get("User-Agent"),
    },
    headers: {
      "Content-Type": req.get("Content-Type"),
      Referer: req.get("referer"),
      "User-Agent": req.get("User-Agent"),
    },
  };

  // req.user coming from 'policies/token.js',
  // after the JWT token is parsed
  if (req.user) {
    Sentry.setUser(req.user);
  } else {
    Sentry.configureScope((scope) => scope.setUser(null));
  }

  controller(httpRequest)
    .then((httpResponse: Http2ServerResponse) => {
      res.set("Content-Type", "application/json");
      res.type("json");
      const body = {
        success: true,
        code: 200,
        data: httpResponse,
      };
      res.status(200).send(body);
    })
    .catch((error: any) => {
      Sentry.captureException(error);
      res.status(400).send({
        success: false,
        code: 400,
        error: {
          description: e.message,
        },
      });
    });
};
