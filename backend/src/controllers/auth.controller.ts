import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';

const authService = new AuthService();

export class AuthController {
    async register(req: Request, res: Response) {
        try {
            const user = await authService.register(req.body);
            res.status(201).json({ message: 'User registered successfully', user });
        } catch (err: any) {
            res.status(400).json({ message: err.message });
        }
    }

    async login(req: Request, res: Response) {
        try {
            const result = await authService.login(req.body);
            res.json(result);
        } catch (err: any) {
            res.status(400).json({ message: err.message });
        }
    }
}
