import AppError from '@shared/errors/AppError';
import FakePeopleRepository from '../repositories/fakes/FakePeopleRepository';
import FakeInfectedRegisterRepository from '../repositories/fakes/FakeInfectedRegisterRepository';
import FlagInfectedService from './FlagInfectedService';
import People from '../infra/typeorm/entities/People';

let fakePeopleRepository: FakePeopleRepository;
let flagInfectedService: FlagInfectedService;
let fakeInfectedRepository: FakeInfectedRegisterRepository;

describe('FlagInfected', () => {
  beforeEach(() => {
    fakePeopleRepository = new FakePeopleRepository();
    fakeInfectedRepository = new FakeInfectedRegisterRepository();

    flagInfectedService = new FlagInfectedService(
      fakeInfectedRepository,
      fakePeopleRepository,
    );
  });
  it('Should be able to flag a infected', async () => {
    const [
      future_infected,
      person_2,
      person_3,
      person_4,
      person_5,
    ] = await Promise.all(
      [0, 1, 2, 3, 4, 5].map((_, index) => {
        return fakePeopleRepository.create({
          name: `John Doe ${index}`,
          age: 65,
          gender: 'M',
          lonlat: 'Point(-0000.111 1111.000)',
          fiji_water: 1,
          campbell_soup: 2,
          first_aid_pouch: 3,
          AK47: 4,
        });
      }),
    );

    const person_1 = await fakePeopleRepository.create({
      name: `John Doe 1`,
      age: 65,
      gender: 'M',
      lonlat: 'Point(-0000.111 1111.000)',
      fiji_water: 1,
      campbell_soup: 2,
      first_aid_pouch: 3,
      AK47: 4,
    });

    await flagInfectedService.execute({
      people_id: person_1.id,
      infected_id: future_infected.id,
    });

    await flagInfectedService.execute({
      people_id: person_2.id,
      infected_id: future_infected.id,
    });

    await flagInfectedService.execute({
      people_id: person_3.id,
      infected_id: future_infected.id,
    });

    await flagInfectedService.execute({
      people_id: person_4.id,
      infected_id: future_infected.id,
    });

    await flagInfectedService.execute({
      people_id: person_5.id,
      infected_id: future_infected.id,
    });

    const count = await fakeInfectedRepository.count(future_infected.id);
    const infected = (await fakePeopleRepository.findById(
      future_infected.id,
    )) as People;
    const person_who_received_items = (await fakePeopleRepository.findById(
      person_5.id,
    )) as People;

    expect(count).toBe(5);
    expect(infected.infected).toBe(true);
    expect(person_who_received_items.fiji_water).toBe(2);
    expect(person_who_received_items.campbell_soup).toBe(4);
    expect(person_who_received_items.first_aid_pouch).toBe(6);
    expect(person_who_received_items.AK47).toBe(8);
  });

  it('Should not be able to flag a infected within an inexistent survivor', async () => {
    const future_infected = await fakePeopleRepository.create({
      name: 'John Doe',
      age: 65,
      gender: 'M',
      lonlat: 'Point(-0000.111 1111.000)',
      fiji_water: 1,
      campbell_soup: 2,
      first_aid_pouch: 3,
      AK47: 4,
    });

    await expect(
      flagInfectedService.execute({
        people_id: 'non-existing-id',
        infected_id: future_infected.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to flag a inexistent survivor as infected', async () => {
    const survivor = await fakePeopleRepository.create({
      name: 'John Doe',
      age: 65,
      gender: 'M',
      lonlat: 'Point(-0000.111 1111.000)',
      fiji_water: 1,
      campbell_soup: 2,
      first_aid_pouch: 3,
      AK47: 4,
    });

    await expect(
      flagInfectedService.execute({
        people_id: survivor.id,
        infected_id: 'non-existing-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to flag a infected more than once', async () => {
    const survivor = await fakePeopleRepository.create({
      name: 'John Doe',
      age: 65,
      gender: 'M',
      lonlat: 'Point(-0000.111 1111.000)',
      fiji_water: 1,
      campbell_soup: 2,
      first_aid_pouch: 3,
      AK47: 4,
    });

    const future_infected = await fakePeopleRepository.create({
      name: 'John Doe',
      age: 65,
      gender: 'M',
      lonlat: 'Point(-0000.111 1111.000)',
      fiji_water: 1,
      campbell_soup: 2,
      first_aid_pouch: 3,
      AK47: 4,
    });

    await flagInfectedService.execute({
      people_id: survivor.id,
      infected_id: future_infected.id,
    });

    await expect(
      flagInfectedService.execute({
        people_id: survivor.id,
        infected_id: future_infected.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
