import bcrypt from "bcrypt"
import type { JWT } from "@fastify/jwt";
import { BadRequestError } from "../errors/bad-request.error";
import { ConflictError } from "../errors/conflict.error";
import { NotFoundError } from "../errors/not-found.error";
import { NotAuthorizedError } from "../errors/not-authorized.error";
import type { UserRepository } from "../repositories/user.repository";

export class LoginUserUseCase {
    private userRepository: UserRepository
    private jwt: JWT

    constructor(userRepository: UserRepository, jwt: JWT) {
        this.userRepository = userRepository
        this.jwt = jwt
    }

    public async execute(name: string, password: string) {
        if (!name || !password) {
            throw new BadRequestError("Il manque les chanps requis")
        }

        const existingUser = await this.userRepository.getUser(name)

        if (!existingUser) {
            throw new NotFoundError("Utilisateur non trouvé")
        }

        const valid = await bcrypt.compare(password, existingUser.password)
        if (valid) {
            const token = this.jwt.sign({
                id: existingUser._id,
                name: existingUser.name,
            })

            return token
        }

        throw new NotAuthorizedError("Identifiants invalides")
    }
}
