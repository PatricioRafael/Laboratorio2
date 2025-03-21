import { fetchFromApi } from './api.js';

export interface PokemonSprites {
  [key: string]: string | null;
}

export interface PokemonResponse {
  id: number;
  name: string;
  sprites: PokemonSprites;
  abilities: { ability: { name: string } }[];
  types: { type: { name: string } }[];
  weight: number;
}

export function fetchPokemon(nameOrId: string) {
  return fetchFromApi<PokemonResponse>('pokemon', nameOrId);
}