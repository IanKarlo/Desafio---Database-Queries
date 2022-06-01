import { getRepository, Repository } from 'typeorm';

import { IFindUserWithGamesDTO, IFindUserByFullNameDTO } from '../../dtos';
import { User } from '../../entities/User';
import { IUsersRepository } from '../IUsersRepository';

export class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async findUserWithGamesById({
    user_id,
  }: IFindUserWithGamesDTO): Promise<User> {
    const user = await this.repository.findOne(user_id, {
      relations: ['games']
    })

    if(!user) {
      throw new Error("User not found")
    }
    return user
    // Complete usando ORM
  }

  async findAllUsersOrderedByFirstName(): Promise<User[]> {
    return this.repository.query('SELECT * FROM USERS ORDER BY FIRST_NAME ASC'); // Complete usando raw query
  }

  async findUserByFullName({
    first_name,
    last_name,
  }: IFindUserByFullNameDTO): Promise<User[] | undefined> {
    return this.repository
    .query(`SELECT * FROM USERS WHERE UPPER(FIRST_NAME) = UPPER('${first_name}') AND UPPER(LAST_NAME) = UPPER('${last_name}') LIMIT 1`); // Complete usando raw query
  }
}
