import type { NextFunction, Request, Response } from "express";
import type { UserService } from "../api/services/user.services";



export class AuthMiddleware {
    constructor(
        private authService: UserService
    ) { }

    handle = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const authHeader = req.headers.authorization;

            if (!authHeader) {
                return res.status(401).json({ error: "Não autorizado" });
            }

            const [type, token] = authHeader.split(" ");

            if (type !== "Bearer" || !token) {
                return res.status(401).json({ error: "Não autorizado" });
            }

            const user = await this.authService.authenticate(token);

            if(!user){
                return res.status(401).json({ error: "Não autorizado" });
            }
            req.user = user

            return next();
        } catch {
            return res.status(401).json({ error: "Não autorizado" });
        }
    };
}
