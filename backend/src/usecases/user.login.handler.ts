import type { JWT } from "@fastify/jwt"
import { BadRequestError } from "../error/bad-request.error"
import { ConflictError } from "../error/conflict.error"
import { NotFoundError } from "../error/not-found.error"
import type { User } from "../models/user.model"
import type { UserRepository } from "../repositories/user.repository"
import bcrypt from "bcrypt"
import { NotAuthorizedError } from "../error/not-authorized.error"

export class LoginUserUseCase {
  private userRepository: UserRepository
  private jwt: JWT

  constructor(userRepository: UserRepository, jwt: JWT) {
    this.userRepository = userRepository
    this.jwt = jwt
  }

  public async execute(name: string, password: string) {
    if (!name || !password) {
      throw new BadRequestError("Il manque les champs requis")
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
