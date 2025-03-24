declare module 'express' {
    import { Express, Request, Response, NextFunction } from 'express-serve-static-core';

    interface Router {
        get(path: string, ...handlers: any[]): this;
        post(path: string, ...handlers: any[]): this;
        put(path: string, ...handlers: any[]): this;
        delete(path: string, ...handlers: any[]): this;
        use(...handlers: any[]): this;
    }

    interface Application extends Express {
        use(path: string | Router | Function, ...handlers: Function[]): this;
        get(path: string, ...handlers: Function[]): this;
        post(path: string, ...handlers: Function[]): this;
        put(path: string, ...handlers: Function[]): this;
        delete(path: string, ...handlers: Function[]): this;
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