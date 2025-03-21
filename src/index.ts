import { fetchPokemon } from './pokemon.js';
import { renderPokemon } from './ui.js';

const input = document.getElementById('searchInput') as HTMLInputElement;
const button = document.getElementById('searchBtn') as HTMLButtonElement;
const resultDiv = document.getElementById('result')!;

button.addEventListener('click', async () => {
  const name = input.value.trim();
  if (!name) return;

  resultDiv.innerHTML = "🔄 Buscando...";

  try {
    const pokemon = await fetchPokemon(name);
    renderPokemon(pokemon);
  } catch (error) {
    resultDiv.innerHTML = `<p style="color:red;">${(error as Error).message}</p>`;
  }
});

let currentId = 1;

document.addEventListener('keydown', async (event) => {
  if (event.key === "ArrowRight") {
    currentId++;
  } else if (event.key === "ArrowLeft" && currentId > 1) {
    currentId--;
  } else {
    return;
  }

  resultDiv.innerHTML = "🔄 Buscando...";
  try {
    const pokemon = await fetchPokemon(currentId.toString());
    renderPokemon(pokemon);
  } catch (error) {
    resultDiv.innerHTML = `<p style="color:red;">${(error as Error).message}</p>`;
  }
});