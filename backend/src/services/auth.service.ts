import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { AppDataSource } from '../db/data-source';
import { User } from '../db/entities/user.entity';
import { Login } from 'src/model/auth.model';

export class AuthService {
    private userRepo = AppDataSource.getRepository(User);
    private JWT_SECRET = process.env.JWT_SECRET as string;

    async register(data: User) {
        const { firstName, lastName, email, password } = data;
        const existingUser = await this.userRepo.findOne({ where: { email } });
        if (existingUser) throw new Error('User already exists');

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = this.userRepo.create({ firstName, lastName, email, password: hashedPassword });
        return await this.userRepo.save(user);
    }

    async login(data: Login) {
        const { email, password } = data;
        const user = await this.userRepo.findOne({ where: { email } });
        if (!user) throw new Error('Invalid Credentials');

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) throw new Error('Invalid Credentials');

        const token = jwt.sign({ userId: user.id }, this.JWT_SECRET, { expiresIn: '1d' });
        return { token, user: { id: user.id, email: user.email, firstName: user.firstName, lastName: user.lastName } };
    }
}
