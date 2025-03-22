/* import { fetchPokemon } from './pokemon.js';
import { renderPokemon } from './ui.js';

const input = document.getElementById('searchInput') as HTMLInputElement;
const button = document.getElementById('searchBtn') as HTMLButtonElement;
const prevButton = document.getElementById('prevBtn') as HTMLButtonElement;
const nextButton = document.getElementById('nextBtn') as HTMLButtonElement;
const resultDiv = document.getElementById('result')!;

button.addEventListener('click', async () => {
  const name = input.value.trim();
  if (!name) return;

  resultDiv.innerHTML = "🔄 Buscando...";

  try {
    const pokemon = await fetchPokemon(name); 
    renderPokemon(pokemon);
    currentId = pokemon.id;
  } catch (error) {
    resultDiv.innerHTML = `<p style="color:red;">${(error as Error).message}</p>`;
  }
});

let currentId = 0;

const pokemonById = async (id: number): Promise<void> => {
  resultDiv.innerHTML = "🔄 Buscando...";
  try {
    const pokemon = await fetchPokemon(id.toString());
    renderPokemon(pokemon);
    currentId = id; 
  } catch (error) {
    pokemonById(id + 1);
  }
};

prevButton.addEventListener('click', () => {
  if (currentId > 1) {
    pokemonById(currentId - 1);
  }
});

nextButton.addEventListener('click', () => {
  pokemonById(currentId + 1);
}); */

import { fetchPokemon } from './pokemon.js';
import { renderPokemon } from './ui.js';

const input = document.getElementById('searchInput') as HTMLInputElement;
const button = document.getElementById('searchBtn') as HTMLButtonElement;
const prevButton = document.getElementById('prevBtn') as HTMLButtonElement;
const nextButton = document.getElementById('nextBtn') as HTMLButtonElement;
const resultDiv = document.getElementById('result')!;
const historyList = document.createElement('ul'); 
document.body.appendChild(historyList); 

let currentId = 0;

const loadHistory = (): string[] => {
  return JSON.parse(localStorage.getItem('searchHistory') || '[]');
};

const saveHistory = (history: string[]): void => {
  localStorage.setItem('searchHistory', JSON.stringify(history));
};

const updateHistoryView = (): void => {
  const history = loadHistory();
  historyList.innerHTML = history
    .map((item) => `<li>${item}</li>`)
    .join('');
};

const addToHistory = (term: string): void => {
  const history = loadHistory();
  if (!history.includes(term)) {
    history.unshift(term);
    saveHistory(history);
    updateHistoryView();
  }
};

button.addEventListener('click', async () => {
  const name = input.value.trim();
  if (!name) return;

  resultDiv.innerHTML = "🔄 Buscando...";

  try {
    const pokemon = await fetchPokemon(name);
    renderPokemon(pokemon);
    currentId = pokemon.id; 
    addToHistory(name);
  } catch (error) {
    resultDiv.innerHTML = `<p style="color:red;">${(error as Error).message}</p>`;
  }
});

const pokemonById = async (id: number): Promise<void> => {
  resultDiv.innerHTML = "🔄 Buscando...";
  try {
    const pokemon = await fetchPokemon(id.toString());
    renderPokemon(pokemon);
    currentId = id; 
    addToHistory(id.toString());
  } catch (error) {
    pokemonById(id + 1);
  }
};
prevButton.addEventListener('click', () => {
  if (currentId > 1) {
    pokemonById(currentId - 1);
  }
});
nextButton.addEventListener('click', () => {
  pokemonById(currentId + 1);
});
updateHistoryView();