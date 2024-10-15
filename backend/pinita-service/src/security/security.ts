import type { NextFunction, Request, Response } from "express"
import helmet, { type HelmetOptions } from "helmet"

export function securityMiddleware(req: Request, res: Response, next: NextFunction) {
    helmet({
        contentSecurityPolicy: {
          useDefaults: true,
          directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", "'unsafe-inline'"],
            styleSrc: ["'self'", "'https:'", "'unsafe-inline'"], // Fixed typo from 'styleSrv' to 'styleSrc'
          },
        },
        dnsPrefetchControl: { allow: true },
        frameguard: { action: 'deny' },
        hsts: {
          maxAge: 60 * 60 * 24 * 365, // One year in seconds
          includeSubDomains: true,
          preload: true,
        },
        ieNoOpen: true,
        noSniff: true,
        permittedCrossDomainPolicies: { permittedPolicies: 'none' },
        referrerPolicy: { policy: 'no-referrer' },
      })(req, res, next)

    res.setHeader('X-XSS-Protection', '1; mode=block');
    next()
}