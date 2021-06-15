// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const recipes = [
  {
    name: 'Risotto Capresse con Pollo',
    ingredients: ['Arroz', 'Pollo', 'Cebolla', 'Ajo', 'Tomate', 'Jengibre'],
    description: 'Risotto de arroz carnaroli con perfil de Capresse, sumado a una carne blanca para dar contundencia. Sabor Alimonado, Dulce y Terroso'
  },
  {
    name: 'Risotto Capresse con Pollo',
    ingredients: ['Arroz', 'Pollo', 'Cebolla', 'Ajo', 'Tomate', 'Jengibre'],
    description: 'Risotto de arroz carnaroli con perfil de Capresse, sumado a una carne blanca para dar contundencia. Sabor Alimonado, Dulce y Terroso'
  },
  {
    name: 'Risotto Capresse con Pollo',
    ingredients: ['Arroz', 'Pollo', 'Cebolla', 'Ajo', 'Tomate', 'Jengibre'],
    description: 'Risotto de arroz carnaroli con perfil de Capresse, sumado a una carne blanca para dar contundencia. Sabor Alimonado, Dulce y Terroso'
  },
  {
    name: 'Risotto Capresse con Pollo',
    ingredients: ['Arroz', 'Pollo', 'Cebolla', 'Ajo', 'Tomate', 'Jengibre'],
    description: 'Risotto de arroz carnaroli con perfil de Capresse, sumado a una carne blanca para dar contundencia. Sabor Alimonado, Dulce y Terroso'
  },
  {
    name: 'Risotto Capresse con Pollo',
    ingredients: ['Arroz', 'Pollo', 'Cebolla', 'Ajo', 'Tomate', 'Jengibre'],
    description: 'Risotto de arroz carnaroli con perfil de Capresse, sumado a una carne blanca para dar contundencia. Sabor Alimonado, Dulce y Terroso'
  },
]


export default (req, res) => {
  res.status(200).json(recipes);
} 
