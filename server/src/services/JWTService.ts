import jwt from 'jsonwebtoken';
import createError from 'http-errors';
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET ?? '';

class JWTService {
    static signWrapper(payload: any) {
        return new Promise((resolve, reject) => {
            jwt.sign({ payload }, accessTokenSecret, {}, (err, token) => {
                if (err) {
                    reject(new createError.InternalServerError('Internal server error'));
                }
                resolve(token);
            });
        });
    }

    static verifyWrapper(token: string) {
        return new Promise((resolve, reject) => {
            jwt.verify(token, accessTokenSecret, (err, payload) => {
                if (err) {
                    reject(new createError.Unauthorized(err.message));
                }
                resolve(payload);
            });
        });
    }
}

export default JWTService;
