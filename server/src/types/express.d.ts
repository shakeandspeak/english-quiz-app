declare module 'express' {
    import { Express, Request, Response, NextFunction } from 'express-serve-static-core';

    interface Router {
        use: Function;
        get: Function;
        post: Function;
        put: Function;
        delete: Function;
    }

    interface Application extends Express {
        use(path: string, handler: Router | Function): this;
        get(path: string, handler: Function): this;
        post(path: string, handler: Function): this;
        put(path: string, handler: Function): this;
        delete(path: string, handler: Function): this;
    }

    function express(): Application;
    namespace express {
        export function Router(): Router;
        export function json(): Function;
        export function urlencoded(options: any): Function;
        export { Request, Response, NextFunction };
    }

    export = express;
} 