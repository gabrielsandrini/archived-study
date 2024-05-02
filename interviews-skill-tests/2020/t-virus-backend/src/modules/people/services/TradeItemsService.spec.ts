import AppError from '@shared/errors/AppError';
import FakePeopleRepository from '../repositories/fakes/FakePeopleRepository';
import TradeItemsService from './TradeItemsService';
import People from '../infra/typeorm/entities/People';

let fakePeopleRepository: FakePeopleRepository;
let tradeItemsService: TradeItemsService;

describe('FlagInfected', () => {
  beforeEach(() => {
    fakePeopleRepository = new FakePeopleRepository();

    tradeItemsService = new TradeItemsService(fakePeopleRepository);
  });
  it('Should be able to trade items', async () => {
    let survivor = await fakePeopleRepository.create({
      name: 'John Doe',
      age: 65,
      gender: 'M',
      lonlat: 'Point(-0000.111 1111.000)',
      fiji_water: 10,
      campbell_soup: 10,
      first_aid_pouch: 10,
      AK47: 10,
    });

    let recipient_survivor = await fakePeopleRepository.create({
      name: 'John Doe recipient',
      age: 65,
      gender: 'M',
      lonlat: 'Point(-0000.111 1111.000)',
      fiji_water: 10,
      campbell_soup: 10,
      first_aid_pouch: 10,
      AK47: 10,
    });

    await tradeItemsService.execute({
      person_id: survivor.id,
      recipient_full_name: recipient_survivor.name,
      pick: {
        fiji_water: 5,
        campbell_soup: 0,
        first_aid_pouch: 5,
        AK47: 0,
      },
      payment: {
        fiji_water: 0,
        campbell_soup: 6,
        first_aid_pouch: 0,
        AK47: 6,
      },
    });

    survivor = (await fakePeopleRepository.findById(survivor.id)) as People;

    recipient_survivor = (await fakePeopleRepository.findById(
      recipient_survivor.id,
    )) as People;

    expect(survivor.fiji_water).toBe(15);
    expect(survivor.campbell_soup).toBe(4);
    expect(survivor.first_aid_pouch).toBe(15);
    expect(survivor.AK47).toBe(4);

    expect(recipient_survivor.fiji_water).toBe(5);
    expect(recipient_survivor.campbell_soup).toBe(16);
    expect(recipient_survivor.first_aid_pouch).toBe(5);
    expect(recipient_survivor.AK47).toBe(16);
  });

  it('Should not be able to trade items when pick and payment value do not match', async () => {
    const survivor = await fakePeopleRepository.create({
      name: 'John Doe',
      age: 65,
      gender: 'M',
      lonlat: 'Point(-0000.111 1111.000)',
      fiji_water: 10,
      campbell_soup: 10,
      first_aid_pouch: 10,
      AK47: 10,
    });

    const recipient_survivor = await fakePeopleRepository.create({
      name: 'John Doe recipient',
      age: 65,
      gender: 'M',
      lonlat: 'Point(-0000.111 1111.000)',
      fiji_water: 10,
      campbell_soup: 10,
      first_aid_pouch: 10,
      AK47: 10,
    });

    await expect(
      tradeItemsService.execute({
        person_id: survivor.id,
        recipient_full_name: recipient_survivor.name,
        pick: {
          fiji_water: 50,
          campbell_soup: 0,
          first_aid_pouch: 5,
          AK47: 0,
        },
        payment: {
          fiji_water: 0,
          campbell_soup: 0,
          first_aid_pouch: 0,
          AK47: 6,
        },
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to trade items with an inexistent survivor', async () => {
    const recipient_survivor = await fakePeopleRepository.create({
      name: 'John Doe',
      age: 65,
      gender: 'M',
      lonlat: 'Point(-0000.111 1111.000)',
      fiji_water: 10,
      campbell_soup: 10,
      first_aid_pouch: 10,
      AK47: 10,
    });

    await expect(
      tradeItemsService.execute({
        person_id: 'non-existing-survivor',
        recipient_full_name: recipient_survivor.name,
        pick: {
          fiji_water: 5,
          campbell_soup: 0,
          first_aid_pouch: 5,
          AK47: 0,
        },
        payment: {
          fiji_water: 0,
          campbell_soup: 6,
          first_aid_pouch: 0,
          AK47: 6,
        },
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to trade with a inexistent recipient', async () => {
    const survivor = await fakePeopleRepository.create({
      name: 'John Doe',
      age: 65,
      gender: 'M',
      lonlat: 'Point(-0000.111 1111.000)',
      fiji_water: 10,
      campbell_soup: 10,
      first_aid_pouch: 10,
      AK47: 10,
    });

    await expect(
      tradeItemsService.execute({
        person_id: survivor.id,
        recipient_full_name: 'non-existing-recipient',
        pick: {
          fiji_water: 5,
          campbell_soup: 0,
          first_aid_pouch: 5,
          AK47: 0,
        },
        payment: {
          fiji_water: 0,
          campbell_soup: 6,
          first_aid_pouch: 0,
          AK47: 6,
        },
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
