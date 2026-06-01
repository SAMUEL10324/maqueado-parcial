export interface User {
  id: string
  name: string
  email: string
  avatar: string
  createdAt: string
}

export interface Comment {
  id: string
  userId: string
  userName: string
  userAvatar: string
  content: string
  createdAt: string
}

export interface Debate {
  id: string
  title: string
  description: string
  image: string
  authorId: string
  authorName: string
  authorAvatar: string
  positiveVotes: number
  negativeVotes: number
  comments: Comment[]
  createdAt: string
  category: string
}

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Carlos Mendoza',
    email: 'carlos@example.com',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    createdAt: '2024-01-15',
  },
  {
    id: '2',
    name: 'María García',
    email: 'maria@example.com',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face',
    createdAt: '2024-02-20',
  },
  {
    id: '3',
    name: 'Andrés López',
    email: 'andres@example.com',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    createdAt: '2024-03-10',
  },
]

export const mockDebates: Debate[] = [
  {
    id: '1',
    title: '¿Es el trabajo remoto el futuro del empleo?',
    description: 'El trabajo remoto ha demostrado ser viable durante la pandemia, pero ¿debería convertirse en la norma? Algunos argumentan que mejora la productividad y el equilibrio vida-trabajo, mientras otros creen que afecta la colaboración y la cultura empresarial.',
    image: 'https://images.unsplash.com/photo-1587560699334-cc4ff634909a?w=800&h=500&fit=crop',
    authorId: '1',
    authorName: 'Carlos Mendoza',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    positiveVotes: 234,
    negativeVotes: 89,
    category: 'Tecnología',
    comments: [
      {
        id: 'c1',
        userId: '2',
        userName: 'María García',
        userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face',
        content: 'Creo que depende mucho del tipo de trabajo. Para creativos funciona muy bien.',
        createdAt: '2024-05-20',
      },
      {
        id: 'c2',
        userId: '3',
        userName: 'Andrés López',
        userAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
        content: 'El modelo híbrido es la mejor solución en mi opinión.',
        createdAt: '2024-05-21',
      },
    ],
    createdAt: '2024-05-15',
  },
  {
    id: '2',
    title: '¿Debería ser obligatoria la educación financiera en las escuelas?',
    description: 'Muchos jóvenes llegan a la edad adulta sin conocimientos básicos sobre finanzas personales. ¿Deberían las escuelas incluir educación financiera como materia obligatoria para preparar mejor a los estudiantes?',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=500&fit=crop',
    authorId: '2',
    authorName: 'María García',
    authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face',
    positiveVotes: 456,
    negativeVotes: 23,
    category: 'Educación',
    comments: [
      {
        id: 'c3',
        userId: '1',
        userName: 'Carlos Mendoza',
        userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
        content: 'Totalmente de acuerdo. Ojalá me lo hubieran enseñado a mí.',
        createdAt: '2024-05-18',
      },
    ],
    createdAt: '2024-05-12',
  },
  {
    id: '3',
    title: '¿La inteligencia artificial reemplazará a los trabajadores humanos?',
    description: 'Con los avances en IA, muchos trabajos están siendo automatizados. ¿Estamos ante una revolución que beneficiará a la humanidad o una amenaza para el empleo masivo?',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=500&fit=crop',
    authorId: '3',
    authorName: 'Andrés López',
    authorAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    positiveVotes: 178,
    negativeVotes: 156,
    category: 'Tecnología',
    comments: [
      {
        id: 'c4',
        userId: '2',
        userName: 'María García',
        userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face',
        content: 'La IA creará nuevos tipos de trabajo, pero hay que prepararse.',
        createdAt: '2024-05-22',
      },
      {
        id: 'c5',
        userId: '1',
        userName: 'Carlos Mendoza',
        userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
        content: 'Lo importante es adaptarse y seguir aprendiendo.',
        createdAt: '2024-05-23',
      },
    ],
    createdAt: '2024-05-10',
  },
  {
    id: '4',
    title: '¿Las redes sociales hacen más daño que bien a la sociedad?',
    description: 'Las redes sociales conectan al mundo pero también se les culpa de problemas de salud mental, desinformación y polarización. ¿El balance es positivo o negativo?',
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=500&fit=crop',
    authorId: '1',
    authorName: 'Carlos Mendoza',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    positiveVotes: 312,
    negativeVotes: 287,
    category: 'Sociedad',
    comments: [],
    createdAt: '2024-05-08',
  },
  {
    id: '5',
    title: '¿Deberían los videojuegos ser considerados un deporte?',
    description: 'Los esports mueven millones y requieren habilidad, estrategia y entrenamiento. ¿Merecen el mismo reconocimiento que los deportes tradicionales?',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=500&fit=crop',
    authorId: '2',
    authorName: 'María García',
    authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face',
    positiveVotes: 567,
    negativeVotes: 234,
    category: 'Entretenimiento',
    comments: [
      {
        id: 'c6',
        userId: '3',
        userName: 'Andrés López',
        userAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
        content: 'Si el ajedrez es deporte, los esports también deberían serlo.',
        createdAt: '2024-05-25',
      },
    ],
    createdAt: '2024-05-05',
  },
  {
    id: '6',
    title: '¿Es ético comer carne en el siglo XXI?',
    description: 'Con alternativas vegetales cada vez mejores y el impacto ambiental de la ganadería, ¿podemos seguir justificando el consumo de carne?',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=500&fit=crop',
    authorId: '3',
    authorName: 'Andrés López',
    authorAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    positiveVotes: 145,
    negativeVotes: 398,
    category: 'Medio Ambiente',
    comments: [],
    createdAt: '2024-05-01',
  },
]

export const categories = [
  'Todos',
  'Tecnología',
  'Educación',
  'Sociedad',
  'Entretenimiento',
  'Medio Ambiente',
  'Política',
  'Salud',
]
