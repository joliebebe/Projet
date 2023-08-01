const USERS = {
    1: {
      id: 1,
      username: 'Alexia Jane',
      avatar: require('../../assets/images/users/F.png'),
    },
    2: {
      id: 2,
      username: 'Jacky Depp',
      avatar: require('../../assets/images/users/H.png'),
    },
  };
  
  const REVIEWS = {
    1: {
      id: 1,
      date: '21 May, 2022',
      author: USERS[1],
      rating: 7,
      text: 'Lorem ipsum dolor sit amet. Iusto nihil et porro soluta ut labore nesciunt sed dolor nihil qui laudantium consequatur',
    },
    2: {
      id: 2,
      date: '14 July, 2021',
      author: USERS[2],
      rating: 9.1,
      text: 'Lorem ipsum dolor sit amet.',
    },
  };
  
  export const HOTELS = {
    1: {
      id: 1,
      title: 'Adjamé gare nord',
      image: require('../../assets/images/parking/1.jpg'),
      location: 'Nom Hotel Abidjan Plateau',
      rating: 9,
      pricePeerDay: '130$',
      capacity: 20
    },
    2: {
      id: 2,
      title: 'Nom Hotel Abidjan Plateau',
      image: require('../../assets/images/parking/2.jpg'),
      location: 'Nom Hotel Abidjan Plateau',
      rating: 9.3,
      pricePeerDay: '230$',
      capacity: 15
    },
    3: {
      id: 3,
      title: 'Marcory cap-sud',
      image: require('../../assets/images/parking/3.jpg'),
      location: "Galerie Cap Sud, Bd Valéry Giscard d'Estaing",
      rating: 9.4,
      pricePeerDay: '280$',
      capacity: 20
    },
  };
  
  export const TOP_PLACES = [
    {
      id: 1,
      image: require('../../assets/images/parking/1.jpg'),
      title: 'Adjamé gare nord',
      location: 'Adjamé gare nord',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      rating: 9.4,
      gallery: [
        require('../../assets/images/parkingdetail/a.jpg'),
        require('../../assets/images/parkingdetail/b.jpg'),
      ],
      reviews: [REVIEWS[2], REVIEWS[1]],
      hotels: [HOTELS[3]],
    },
    {
      id: 3,
      image: require('../../assets/images/parking/3.jpg'),
      title: 'Marcory cap-sud',
      location: "Galerie Cap Sud, Bd Valéry Giscard d'Estaing",
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.',
      rating: 8.9,
      gallery: [
        require('../../assets/images/parkingdetail/c.jpg'),
      ],
      reviews: [REVIEWS[1], REVIEWS[2]],
      hotels: [HOTELS[1], HOTELS[2]],
   
    },
    
  ];
  
  
  export const SEARCH_PLACES = [...TOP_PLACES].map(item => ({
    ...item,
    id: Math.random().toString(),
  }));
  
  export const SEARCH_HOTELS = [...Object.values(HOTELS)].map(item => ({
    ...item,
    id: Math.random().toString(),
  }));
  
  export const SEARCH_ALL = [...SEARCH_PLACES, ...SEARCH_HOTELS];
  
  