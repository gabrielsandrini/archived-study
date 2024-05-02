import { v4 as uuid } from 'uuid';
import IPeopleRepository from '../IPeopleRepository';
import ICreatePersonDTO from '../../dtos/ICreatePersonDTO';
import Person from '../../infra/typeorm/entities/People';

export default class FakePeopleRepository implements IPeopleRepository {
  private people: Person[] = [];

  async create(data: ICreatePersonDTO): Promise<Person> {
    const customer = new Person();

    Object.assign(customer, { id: uuid() }, data);

    this.people.push(customer);

    return customer;
  }

  async findById(id: string): Promise<Person | undefined> {
    const customerFound = this.people.find(person => person.id === id);

    return customerFound;
  }

  async findByName(name: string): Promise<Person | undefined> {
    const customerFound = this.people.find(person => person.name === name);

    return customerFound;
  }

  public async update(user: Person): Promise<Person> {
    const findIndex = this.people.findIndex(
      findPerson => findPerson.id === user.id,
    );

    this.people[findIndex] = user;

    return user;
  }
}
