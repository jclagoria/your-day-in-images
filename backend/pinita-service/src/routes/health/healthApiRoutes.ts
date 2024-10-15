import { Router, type Response, type Request, type NextFunction } from "express"

export const healthApiRouter = Router()

healthApiRouter.get('/health', async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.status(200).json({ message: 'Api is UP' })
    } catch (err) {
        next(err)
    }
})