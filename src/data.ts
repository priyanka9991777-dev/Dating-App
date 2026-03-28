export interface Profile {
  id: string;
  name: string;
  age: number;
  distance: string;
  bio: string;
  images: string[];
  interests: string[];
  job: string;
  status?: string;
  recentlyListening?: string;
  recentlyWatching?: string;
  badges?: string[];
  priorities?: string[];
}

export const profiles: Profile[] = [
  {
    id: '1',
    name: 'Sarah',
    age: 26,
    distance: '2 miles away',
    bio: 'Coffee addict, dog lover, and weekend hiker. Looking for someone to explore the city with.',
    images: [
      'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah&backgroundColor=ffdfbf&mouth=smile&eyes=happy&clothing=blazerAndShirt',
      'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah2&backgroundColor=ffdfbf&mouth=twinkle&eyes=happy&clothing=blazerAndSweater'
    ],
    interests: ['Hiking', 'Coffee', 'Photography'],
    job: 'Graphic Designer',
    status: 'Craving sushi right now 🍣',
    recentlyListening: 'Taylor Swift - Midnights',
    recentlyWatching: 'The Bear (Season 2)',
    badges: ['Verified', 'Top Pick'],
    priorities: ['Long-term relationship', 'Career focused']
  },
  {
    id: '2',
    name: 'James',
    age: 29,
    distance: '5 miles away',
    bio: 'Amateur chef and professional Netflix watcher. I make a mean lasagna.',
    images: [
      'https://api.dicebear.com/7.x/avataaars/svg?seed=James&backgroundColor=c0aede&mouth=smile&eyes=happy&clothing=collarAndSweater',
      'https://api.dicebear.com/7.x/avataaars/svg?seed=James2&backgroundColor=c0aede&mouth=smile&eyes=default&clothing=blazerAndShirt'
    ],
    interests: ['Cooking', 'Movies', 'Travel'],
    job: 'Software Engineer',
    status: 'Debugging life one coffee at a time ☕',
    recentlyListening: 'The Weeknd - Dawn FM',
    recentlyWatching: 'Severance',
    badges: ['Verified'],
    priorities: ['Casual dating', 'Self-growth']
  },
  {
    id: '3',
    name: 'Elena',
    age: 24,
    distance: '1 mile away',
    bio: 'Art student by day, indie concert goer by night. Let\'s swap playlists.',
    images: [
      'https://api.dicebear.com/7.x/avataaars/svg?seed=Elena&backgroundColor=d1d4f9&mouth=twinkle&eyes=happy&clothing=blazerAndSweater',
      'https://api.dicebear.com/7.x/avataaars/svg?seed=Elena2&backgroundColor=d1d4f9&mouth=smile&eyes=happy&clothing=shirtVNeck'
    ],
    interests: ['Art', 'Live Music', 'Thrifting'],
    job: 'Student',
    status: 'Looking for a concert buddy for next week 🎸',
    recentlyListening: 'Arctic Monkeys - AM',
    recentlyWatching: 'Euphoria',
    badges: ['New Here'],
    priorities: ['Finding my person', 'Creative pursuits']
  },
  {
    id: '4',
    name: 'Marcus',
    age: 31,
    distance: '10 miles away',
    bio: 'Always planning my next trip. Just got back from Japan. Tell me your favorite travel story.',
    images: [
      'https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus&backgroundColor=b6e3f4&mouth=smile&eyes=happy&clothing=blazerAndShirt',
      'https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus2&backgroundColor=b6e3f4&mouth=smile&eyes=default&clothing=collarAndSweater'
    ],
    interests: ['Travel', 'Sushi', 'Running'],
    job: 'Marketing Director',
    status: 'Planning my next trip to Europe ✈️',
    recentlyListening: 'Odesza - The Last Goodbye',
    recentlyWatching: 'Succession',
    badges: ['Verified', 'Popular'],
    priorities: ['Marriage minded', 'Travel partner']
  },
  {
    id: '5',
    name: 'Chloe',
    age: 27,
    distance: '3 miles away',
    bio: 'Plant mom. Yoga enthusiast. I probably spend too much time at the farmer\'s market.',
    images: [
      'https://api.dicebear.com/7.x/avataaars/svg?seed=Chloe&backgroundColor=ffd5dc&mouth=twinkle&eyes=happy&clothing=blazerAndSweater',
      'https://api.dicebear.com/7.x/avataaars/svg?seed=Chloe2&backgroundColor=ffd5dc&mouth=smile&eyes=happy&clothing=blazerAndShirt'
    ],
    interests: ['Yoga', 'Plants', 'Farmers Market'],
    job: 'Yoga Instructor',
    status: 'Just bought another monstera plant 🌿',
    recentlyListening: 'SZA - SOS',
    recentlyWatching: 'The White Lotus',
    badges: ['Verified'],
    priorities: ['Mindful connection', 'Health & Wellness']
  },
  {
    id: '6',
    name: 'David',
    age: 28,
    distance: '4 miles away',
    bio: 'Architect by day, amateur astronomer by night. Let\'s go stargazing.',
    images: [
      'https://api.dicebear.com/7.x/avataaars/svg?seed=David&backgroundColor=e2e8f0&mouth=smile&eyes=happy&clothing=blazerAndShirt',
      'https://api.dicebear.com/7.x/avataaars/svg?seed=David2&backgroundColor=e2e8f0&mouth=twinkle&eyes=happy&clothing=collarAndSweater'
    ],
    interests: ['Architecture', 'Astronomy', 'Reading'],
    job: 'Architect',
    status: 'Clear skies tonight! Perfect for stargazing 🔭',
    recentlyListening: 'Hans Zimmer - Interstellar OST',
    recentlyWatching: 'Dune',
    badges: ['Verified'],
    priorities: ['Life partner', 'Building a home']
  },
  {
    id: '7',
    name: 'Maya',
    age: 25,
    distance: '2 miles away',
    bio: 'UX Researcher who loves asking "why". Always down for a matcha latte and a good conversation.',
    images: [
      'https://api.dicebear.com/7.x/avataaars/svg?seed=Maya&backgroundColor=fef08a&mouth=twinkle&eyes=happy&clothing=blazerAndSweater',
      'https://api.dicebear.com/7.x/avataaars/svg?seed=Maya2&backgroundColor=fef08a&mouth=smile&eyes=happy&clothing=shirtVNeck'
    ],
    interests: ['Design', 'Matcha', 'Podcasts'],
    job: 'UX Researcher',
    status: 'Listening to a new design podcast 🎧',
    recentlyListening: 'How I Built This',
    recentlyWatching: 'Black Mirror',
    badges: ['Top Pick'],
    priorities: ['Deep connection', 'Career growth']
  },
  {
    id: '8',
    name: 'Liam',
    age: 30,
    distance: '8 miles away',
    bio: 'Financial analyst trying to find balance. I run marathons so I can eat more pizza.',
    images: [
      'https://api.dicebear.com/7.x/avataaars/svg?seed=Liam&backgroundColor=bfdbfe&mouth=smile&eyes=happy&clothing=collarAndSweater',
      'https://api.dicebear.com/7.x/avataaars/svg?seed=Liam2&backgroundColor=bfdbfe&mouth=smile&eyes=happy&clothing=blazerAndShirt'
    ],
    interests: ['Running', 'Pizza', 'Finance'],
    job: 'Financial Analyst',
    status: 'Training for the next marathon 🏃‍♂️',
    recentlyListening: 'Drake - For All The Dogs',
    recentlyWatching: 'Billions',
    badges: ['Verified', 'Popular'],
    priorities: ['Active partner', 'Financial independence']
  },
  {
    id: '9',
    name: 'Sofia',
    age: 27,
    distance: '1 mile away',
    bio: 'Event planner. I organize chaos for a living. Looking for someone who can keep up!',
    images: [
      'https://api.dicebear.com/7.x/avataaars/svg?seed=Sofia&backgroundColor=fbcfe8&mouth=smile&eyes=happy&clothing=shirtVNeck',
      'https://api.dicebear.com/7.x/avataaars/svg?seed=Sofia2&backgroundColor=fbcfe8&mouth=twinkle&eyes=happy&clothing=blazerAndSweater'
    ],
    interests: ['Events', 'Dancing', 'Wine'],
    job: 'Event Planner',
    status: 'Need a glass of wine after this week 🍷',
    recentlyListening: 'Dua Lipa - Future Nostalgia',
    recentlyWatching: 'Emily in Paris',
    badges: ['Verified'],
    priorities: ['Fun dates', 'Living in the moment']
  },
  {
    id: '10',
    name: 'Noah',
    age: 29,
    distance: '6 miles away',
    bio: 'Photographer capturing life\'s moments. Let me take you to my favorite hidden spots in the city.',
    images: [
      'https://api.dicebear.com/7.x/avataaars/svg?seed=Noah&backgroundColor=bbf7d0&mouth=twinkle&eyes=happy&clothing=blazerAndShirt',
      'https://api.dicebear.com/7.x/avataaars/svg?seed=Noah2&backgroundColor=bbf7d0&mouth=smile&eyes=happy&clothing=collarAndSweater'
    ],
    interests: ['Photography', 'Urban Exploration', 'Coffee'],
    job: 'Photographer',
    status: 'Golden hour is the best hour 🌅',
    recentlyListening: 'Frank Ocean - Blonde',
    recentlyWatching: 'Planet Earth III',
    badges: ['New Here'],
    priorities: ['Creative collaboration', 'Authentic connection']
  }
];

export interface Message {
  id: string;
  senderId: 'me' | string;
  text: string;
  timestamp: string;
}

export interface Match {
  id: string;
  profileId: string;
  lastMessage?: string;
  unread: boolean;
  time?: string;
  messages?: Message[];
}

export const matches: Match[] = [
  { 
    id: 'm1', 
    profileId: '3', 
    lastMessage: 'That sounds like a great playlist!', 
    unread: true, 
    time: '2m ago',
    messages: [
      { id: 'msg1', senderId: '3', text: 'Hey! I saw you like indie music too.', timestamp: '10:00 AM' },
      { id: 'msg2', senderId: 'me', text: 'Yes! I go to concerts all the time.', timestamp: '10:05 AM' },
      { id: 'msg3', senderId: '3', text: 'That sounds like a great playlist!', timestamp: '10:06 AM' }
    ]
  },
  { 
    id: 'm2', 
    profileId: '1', 
    lastMessage: 'Are you free this weekend?', 
    unread: false, 
    time: '1h ago',
    messages: [
      { id: 'msg4', senderId: '1', text: 'Hi there! Nice to match with you.', timestamp: 'Yesterday' },
      { id: 'msg5', senderId: 'me', text: 'Hey Sarah! How is your week going?', timestamp: 'Yesterday' },
      { id: 'msg6', senderId: '1', text: 'Pretty good! Are you free this weekend?', timestamp: '1h ago' }
    ]
  },
  { 
    id: 'm3', 
    profileId: '4', 
    unread: false,
    messages: []
  }
];
