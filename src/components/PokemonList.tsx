import React, { useState, useEffect } from "react";
import PokemonCard from "./PokemonCard";

interface Pokemon {
  id: number;
  name: string;
  sprites: {
    front_default: string;
  };
}

const PokemonList: React.FC = () => {
  const [generation1, setGeneration1] = useState<Pokemon[]>([]);
  const [generation2, setGeneration2] = useState<Pokemon[]>([]);
  const [generation3, setGeneration3] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPokemons() {
      try {
        // Fetch Generation 1
        const responseGen1 = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
        const dataGen1 = await responseGen1.json();
        const fetchedGen1: Pokemon[] = await Promise.all(
          dataGen1.results.map(async (pokemon: { url: string }) => {
            const response = await fetch(pokemon.url);
            return await response.json();
          })
        );
        setGeneration1(fetchedGen1);

        // Fetch Generation 2
        const responseGen2 = await fetch('https://pokeapi.co/api/v2/pokemon?limit=100&offset=151');
        const dataGen2 = await responseGen2.json();
        const fetchedGen2: Pokemon[] = await Promise.all(
          dataGen2.results.map(async (pokemon: { url: string }) => {
            const response = await fetch(pokemon.url);
            return await response.json();
          })
        );
        setGeneration2(fetchedGen2);

        // Fetch Generation 3
        const responseGen3 = await fetch('https://pokeapi.co/api/v2/pokemon?limit=135&offset=251');
        const dataGen3 = await responseGen3.json();
        const fetchedGen3: Pokemon[] = await Promise.all(
          dataGen3.results.map(async (pokemon: { url: string }) => {
            const response = await fetch(pokemon.url);
            return await response.json();
          })
        );
        setGeneration3(fetchedGen3);
        
      } catch (error) {
        console.error("Erro ao carregar Pokémon:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchPokemons();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold mb-8">Pokémon por Geração</h1>
      {loading ? (
        <p className="text-lg">Carregando...</p>
      ) : (
        <>
          <div>
            <h2 className="text-2xl font-bold mb-4">Geração 1</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
              {generation1.map((pokemon) => (
                <PokemonCard
                  key={pokemon.id}
                  name={pokemon.name}
                  image={pokemon.sprites.front_default}
                />
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-4">Geração 2</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
              {generation2.map((pokemon) => (
                <PokemonCard
                  key={pokemon.id}
                  name={pokemon.name}
                  image={pokemon.sprites.front_default}
                />
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-4">Geração 3</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
              {generation3.map((pokemon) => (
                <PokemonCard
                  key={pokemon.id}
                  name={pokemon.name}
                  image={pokemon.sprites.front_default}
                />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default PokemonList;
