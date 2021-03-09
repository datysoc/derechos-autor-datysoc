const categoryA = {
  id: 'libertadExpresion',
  value: 'Libertad de expresión',
  description: 'something to say about this category',
  items: [
    {
      id: 'cita',
      label: 'Cita',
      value: 'cita',
    },
    {
      id: 'noticiasDeActualidad',
      label: 'Noticias de actualidad',
      value: 'noticiasDeActualidad',
    },
  ],
};

const categoryB = {
  id: 'finesEducativos',
  value: 'Fines educativos',
  items: [
    {
      id: 'comunicacion',
      label: 'Comunicación',
      value: 'comunicacion',
    },
    {
      id: 'reproducciones',
      label: 'Reproducciones',
      value: 'reproducciones',
    },
  ],
};

export const categories = [categoryA, categoryB];
