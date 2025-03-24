declare module 'express' {
    import { Express, Request, Response, NextFunction } from 'express-serve-static-core';

    interface Handler {
        (req: Request, res: Response, next: NextFunction): void;
    }

    interface Router {
        use(handler: Handler | Router): this;
        use(path: string, handler: Handler | Router): this;
        get(path: string, handler: Handler): this;
        post(path: string, handler: Handler): this;
        put(path: string, handler: Handler): this;
        delete(path: string, handler: Handler): this;
    }

    interface Application extends Express {
        use(handler: Handler | Router): this;
        use(path: string, handler: Handler | Router): this;
        get(path: string, handler: Handler): this;
        post(path: string, handler: Handler): this;
        put(path: string, handler: Handler): this;
        delete(path: string, handler: Handler): this;
    }

    function express(): Application;
    namespace express {
        export function Router(): Router;
        export function json(): Handler;
        export function urlencoded(options?: any): Handler;
        export { Request, Response, NextFunction };
    }

    export = express;
} 