import { Validators } from "../../../config/validators";
import { ApiError } from "../../errors/api.error";

export class RegisterUserDto {
    private constructor(
        public name: string,
        public email: string,
        public password: string,
    ) {
    }

    static create(object: {[key: string]:any}):RegisterUserDto {

        const { name, email, password } = object;

        if (!name) throw ApiError.badRequest('Missing name');
        if (!email) throw ApiError.badRequest('Missing email');
        if (!Validators.email.test(email)) throw ApiError.badRequest('Invalid email');
        if (!password) throw ApiError.badRequest('Missing password');
        if (password.length < 6) throw ApiError.badRequest('Password too short');

        return new RegisterUserDto(name, email, password)
    }
}