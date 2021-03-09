const exceptions = [
  {
    id: 'cita',
    state: 'inexistent',
    norms: [
      {
        id: 'ley9739Art45Num4',
        title: 'Ley 9739 art. 45 num. 4',
        description: `
    Lorem ipsum dolor sit amet
    consectetur adipiscing elit.

    Nunc dictum risus eu odio
    consectetur elementum. Maecenas
    maximus, ligula vehicula porta
    luctus.`,
        link: 'http://something.com',
        linkLabel: 'something more',
      },
      {
        id: 'ley9764Art25Num2',
        title: 'Ley 9764 art. 25 num. 2',
        description: `
    Lorem ipsum dolor sit amet
    consectetur adipiscing elit.

    Nunc dictum risus eu odio
    consectetur elementum. Maecenas
    maximus, ligula vehicula porta
    luctus.`,
        link: 'http://something.com',
        linkLabel: 'something more',
      },
    ],
  },
  {
    id: 'noticiasDeActualidad',
    state: 'suficient',
    norms: [
      {
        id: 'detail-c',
        title: 'Ley 364 art. 25 num. 6',
        description: `
    Lorem ipsum dolor sit amet
    consectetur adipiscing elit.

    Nunc dictum risus eu odio
    consectetur elementum. Maecenas
    maximus, ligula vehicula porta
    luctus.`,
        link: 'http://something.com',
        linkLabel: 'something more',
      },
    ],
  },
];

export const countriesLaws = [
  {
    id: 'Uruguay',
    name: 'Uruguay',
    categories: [
      {
        id: 'libertadExpresion',
        exceptions,
      },
      {
        id: 'finesEducativos',
        exceptions: [
          {
            id: 'comunicacion',
            state: 'insuficient',
            norms: [
              {
                id: 'ley64Art25Num7',
                title: 'Ley 64 art. 25 num. 7',
                description: `
            Lorem ipsum dolor sit amet
            consectetur adipiscing elit.

            Nunc dictum risus eu odio
            consectetur elementum. Maecenas
            maximus, ligula vehicula porta
            luctus.`,
                link: 'http://something.com',
                linkLabel: 'something more',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'Ecuador',
    name: 'Ecuador',
    categories: [
      {
        id: 'libertadExpresion',
        exceptions,
      },
      {
        id: 'finesEducativos',
        exceptions: [
          {
            id: 'reproducciones',
            state: 'inexistent',
            norms: [],
          },
        ],
      },
    ],
  },
];
