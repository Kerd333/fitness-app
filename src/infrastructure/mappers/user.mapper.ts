import { UserEntity } from "../../domain";

interface User {
    id: number,
    name: string,
    email: string,
    password: string
}

export class UserMapper {
    static toUserEntity(user: User):UserEntity {
        const { id, name, email } = user;
        return {
            id,
            name,
            email
        }
    }
}