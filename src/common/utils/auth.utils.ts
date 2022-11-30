
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import usersService from '../../services/users.service';

// testing refreshjwt
import { serialize } from "cookie";

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

        const user = await usersService.searchUserByEmail(email).then(info => info?.toJSON());

        if (!user) throw new Error(JSON.stringify({ code: 404, message: 'User not exists!' }));

        return bcrypt.compare(password, user.password);

    };

    public verifyTokenPayload = (token: string, secretKey: string) => {

        try {

            const payload = jwt.verify(token, secretKey) as IPayload;

            // console.log(payload);

            // if (payload === undefined) console.log('');

            return payload;
            
        } catch (error) {
            
            // console.log('?', error);

            // Para que no muestre solo 'invalid signature' de esta forma se controla el error de verificacion.
            if (error instanceof Error) return error.message;
 
        }

    };

    public createTokenCookie = (type: string, data: {}, secretKey: string, expire: string) => {

        const token = jwt.sign(data, secretKey, { expiresIn: expire });
        
        const serialized = serialize(type, token, {
            httpOnly: true,
            sameSite: 'strict',
            path: '/'
        });

        return { cookie: serialized, token: token };

    };
    
}

export default new AuthUtils();
