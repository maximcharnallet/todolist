import { BadRequestError } from "../errors/bad-request.error";
import { ConflictError } from "../errors/conflict.error";
import type { User } from "../models/user.model";
import type { UserRepository } from "../repositories/user.repository";
import bcrypt from "bcrypt"

export class RegisterUserUseCase {
    private userRepository: UserRepository

    constructor(userRepository: UserRepository){
        this.userRepository = userRepository
    }

    public async execute(name: string, password1: string, password2: string){
        if (!name) {
            throw new BadRequestError("Remplir votre nom");
        }
        if (!password1 || !password2) {
        throw new BadRequestError("Remplir un mot de passe");
        }
        if (password1 !== password2) {
            throw new BadRequestError("Les mots de passent ne correspondent pas")
        }

        const existingUser = await this.userRepository.getUser(name)

        if (existingUser) {
            throw new ConflictError("Ce nom existe déjà")
        }

        const hashedPassword= await bcrypt.hash(password1, 10)

        const user: User = {
            name: name,
            password: hashedPassword
        }

        const result = await this.userRepository.createUser(user)

        return result
    }
}