import jwt from 'jsonwebtoken';
import { envs } from './envs'

export class JwtAdapter {
    static async generateToken(
        payload: Object,
        duration: string = "1m"
    ): Promise<string|null> {
        return new Promise (
            (resolve) => {
                jwt.sign(
                    payload, 
                    envs.JWT_SEED, 
                    { expiresIn: duration }, 
                    (err, token) => {
                        if ( err ) return resolve(null);
                        resolve(token!)
                    }
                ) 
            }
        )
    }
}