import { PokemonEntity } from "../../entities/pokemon-entity";
import { NotFoundError } from "../../helpers/api-errors";
import { abilityRepository } from "../../repositories/abilities-repository";
import { pokemonRepository } from "../../repositories/pokemon-repository";
import { spriteRepository } from "../../repositories/sprite-reposository";
import { typeRepository } from "../../repositories/types-repository";
import { PokemonService } from "./pokemon-service";

jest.mock("../../repositories/pokemon-repository");
jest.mock("../../repositories/abilities-repository");
jest.mock("../../repositories/types-repository");
jest.mock("../../repositories/sprite-reposository");

describe("Pokemon Service Test", () => {
  let pokemonService: PokemonService;
  let poke1: PokemonEntity;
  let poke2: PokemonEntity;

  beforeAll(() => {
    pokemonService = new PokemonService(
      pokemonRepository,
      typeRepository,
      abilityRepository,
      spriteRepository
    );
    poke1 = {
      id: 1,
      name: "poke1",
      abilities: [],
      sprites: [],
      types: [],
    };
    poke2 = {
      id: 2,
      name: "poke2",
      abilities: [],
      sprites: [],
      types: [],
    };
  });

  describe("CREATE", () => {});

  describe("GET", () => {
    it("should be able to get all pokemons", async () => {
      const findMethod = (
        pokemonRepository.find as jest.MockedFunction<
          typeof pokemonRepository.find
        >
      ).mockImplementation(() => Promise.resolve([poke1, poke2]));

      const result = await pokemonService.getAll(0, 24);

      expect(result.results).toEqual([poke1, poke2]);
      expect(result.next).toBe(
        "http://localhost:3000/pokemon?offset=24&limit=24"
      );
      expect(findMethod).toBeCalledWith({
        order: {
          id: "ASC",
        },
        relations: { abilities: true, types: true, sprites: true },
        skip: 0,
        take: 24,
      });
    });

    it("should be able to get a pokemon", async () => {
      const findOneMethod = (
        pokemonRepository.findOne as jest.MockedFunction<
          typeof pokemonRepository.findOne
        >
      ).mockImplementation(() => Promise.resolve(poke1));

      const result = await pokemonService.getOne(`${poke1.id}`);

      expect(findOneMethod).toBeCalledWith({
        where: { id: poke1.id },
        relations: { abilities: true, types: true, sprites: true },
      });
      expect(result).toEqual(poke1);
    });

    it("should not be able to get a pokemon", async () => {
      const findOneMethod = pokemonRepository.findOne as jest.MockedFunction<
        typeof pokemonRepository.findOne
      >;

      findOneMethod.mockImplementation(() => Promise.resolve(null));

      await expect(pokemonService.getOne("1")).rejects.toThrow(
        new NotFoundError("Pokemon not found")
      );
    });
  });

  describe("UPDATE", () => {
    it("should be able to update pokemon name", async () => {
      const updateMethod = pokemonRepository.update as jest.MockedFunction<
        typeof pokemonRepository.update
      >;

      const findOneByMethod = (
        pokemonRepository.findOneBy as jest.MockedFunction<
          typeof pokemonRepository.findOneBy
        >
      ).mockImplementation(() => Promise.resolve(poke1));

      await pokemonService.updateName(`NameChanged`, poke1.name);

      expect(updateMethod).toBeCalledWith(
        { name: poke1.name },
        { name: `NameChanged` }
      );
      expect(findOneByMethod).toBeCalledWith({ name: poke1.name });
    });

    it("should be able to update pokemon abilities", async () => {
      const saveMethod = pokemonRepository.save as jest.MockedFunction<
        typeof pokemonRepository.save
      >;

      const findOneByMethod = (
        pokemonRepository.findOneBy as jest.MockedFunction<
          typeof pokemonRepository.findOneBy
        >
      ).mockImplementation(() => Promise.resolve(poke2));

      const abilityFindOneByMethod =
        abilityRepository.findOneBy as jest.MockedFunction<
          typeof abilityRepository.findOneBy
        >;

      const abilities = [1, 2];

      await pokemonService.updateAbilities(abilities, poke2.name);

      expect(findOneByMethod).toBeCalledWith({ name: poke2.name });
      for (let ability of abilities) {
        expect(abilityFindOneByMethod).toBeCalledWith({ id: ability });
      }
      expect(saveMethod).toBeCalledWith(poke2);
    });

    it("should be able to update pokemon types", async () => {
      const saveMethod = pokemonRepository.save as jest.MockedFunction<
        typeof pokemonRepository.save
      >;

      const findOneByMethod = (
        pokemonRepository.findOneBy as jest.MockedFunction<
          typeof pokemonRepository.findOneBy
        >
      ).mockImplementation(() => Promise.resolve(poke1));

      const typesFindOneByMethod =
        typeRepository.findOneBy as jest.MockedFunction<
          typeof typeRepository.findOneBy
        >;

      const types = [1, 2];

      await pokemonService.updateTypes(types, poke1.name);

      expect(findOneByMethod).toHaveBeenCalledWith({ name: poke1.name });
      for (let type of types) {
        expect(typesFindOneByMethod).toHaveBeenCalledWith({
          id: type,
        });
      }
      expect(saveMethod).toHaveBeenCalledWith(poke1);
    });

    it("should be able to update pokemon sprites", async () => {
      const saveMethod = pokemonRepository.save as jest.MockedFunction<
        typeof pokemonRepository.save
      >;

      const findOneByMethod = (
        pokemonRepository.findOneBy as jest.MockedFunction<
          typeof pokemonRepository.findOneBy
        >
      ).mockImplementation(() => Promise.resolve(poke1));

      const spriteFindOneByMethod =
        spriteRepository.findOneBy as jest.MockedFunction<
          typeof spriteRepository.findOneBy
        >;

      const sprites = [
        { id: 1, img: "a.com.br", name: "front_default", pokemon: poke1 },
        { id: 2, img: "b.com.br", name: "front_shiny", pokemon: poke1 },
        { id: 3, img: "c.com.br", name: "back_default", pokemon: poke1 },
        { id: 4, img: "d.com.br", name: "back_shiny", pokemon: poke1 },
      ];

      await pokemonService.updateSprites(sprites, "3");

      expect(findOneByMethod).toHaveBeenCalledWith({ id: 3 });
      for (let sprite of sprites) {
        expect(spriteFindOneByMethod).toHaveBeenCalledWith({
          img: sprite.img,
        });
      }
      expect(saveMethod).toHaveBeenCalledWith(poke1);
    });
  });

  describe("DELETE", () => {
    it("should be able to delete a pokemon", async () => {
      const deleteMethod = pokemonRepository.delete as jest.MockedFunction<
        typeof pokemonRepository.delete
      >;

      const findOneByMethod = (
        pokemonRepository.findOneBy as jest.MockedFunction<
          typeof pokemonRepository.findOneBy
        >
      ).mockImplementation(() => Promise.resolve(poke1));

      await pokemonService.delete("1");

      expect(findOneByMethod).toHaveBeenCalledWith({ id: 1 });
      expect(deleteMethod).toHaveBeenCalledWith({ id: 1 });
    });
  });
});
