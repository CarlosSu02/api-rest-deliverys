
import bcrypt from 'bcrypt';
import authService from '../services/auth.service';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

export interface IPayload {
    email: string,
    role: string,
    iat: number,
    exp: number    
}

class AuthUtils {

    public encryptPassword = async (password: string) => {

        const salt = await bcrypt.genSalt(10);

        return bcrypt.hash(password, salt);

    };

    public validatePassword = async (email: string, password: string) => {

        const user = await authService.searchUserByEmail(email).then(info => info?.toJSON());

        if (!user) throw new Error(JSON.stringify({ message: 'User not exists!' }));

        return bcrypt.compare(password, user.password);

    };

    public verifyTokenPayload = (token: string) => {

        const payload = jwt.verify(token, process.env.SECRET_KEY!) as IPayload;

        return payload;

    };
    
}

export default new AuthUtils();
