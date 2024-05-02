interface IItems {
  fiji_water: number;
  campbell_soup: number;
  first_aid_pouch: number;
  AK47: number;
}

export default interface ICreatePersonDTO extends IItems {
  name: string;
  age: number;
  gender: string;
  lonlat?: string;
}
