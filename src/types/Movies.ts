// Define o tipo para os horários de exibição
export type Weekday = 1 | 2 | 3 | 4 | 5 | 6 | 7;

export interface MovieSchedule {
    weekdays: Weekday[];
}

export interface Room {
    id: number;
    name: string;
    showtimes: {
        dub?: string[];  // Horários de exibição dublados
        leg?: string[];  // Horários de exibição legendados
    };
}

// Define o tipo para os comentários de filmes
export interface Comment {
    user: string;
    date: string;
    text: string;
    review: number; // Avaliação do filme, provavelmente de 1 a 5
}

// Define o tipo para o filme, incluindo detalhes como título, descrição, gênero, etc.
export interface Movie {
    id: number;
    title: string;
    description: string;
    genre: string;
    releaseYear: number;
    duration: string;
    classification: string;
    cast: string[];
    direction: string;
    avaliation: number;
    image: string;
    schedule: MovieSchedule;
    video: string;
    rooms: Room[];  // Salas que exibem o filme
    comments: Comment[];
}

// Tipo para os dados de seleção de filme (com informações da sala, horário, idioma, etc.)
export interface MovieSelection {
    movie: Movie | null;
    room: Room | null;
    time: string;
    language: string;  // 'dub' ou 'leg'
    selectedDate: string | null;
}
