import { Request, Response, NextFunction } from 'express';

export function responseMiddleware(req: Request, res: Response, next: NextFunction) {
    const originalJson = res.json;
    res.json = function (data) {
        if (data &&!(data as any).code) {
            const newData = {
                code: 0,
                data,
            };
            return originalJson.call(this, newData);
        }
        return originalJson.call(this, data);
    };
    next();
}