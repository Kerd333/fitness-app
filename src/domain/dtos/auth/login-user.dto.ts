import { Validators } from "../../../config/validators";
import { ApiError } from "../../errors/api.error";

export class LoginUserDto {
    private constructor(
        public name: string,
        public password: string,
    ) {
    }

    static create(object: {[key: string]:any}):LoginUserDto {

        const { name, password } = object;

        if (!name) throw ApiError.badRequest('Missing name');
        if (!password) throw ApiError.badRequest('Missing password');
        if (password.length < 6) throw ApiError.badRequest('Password too short');

        return new LoginUserDto(name, password)
    }
}