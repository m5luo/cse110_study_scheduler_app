export type Event = {
    title: string;
    id: number;
    startTime: string;
    endTime: string;
    weekday: string;
};

export type User = {
    username: string;
    password: string;
    id: number;
};

export type Note = {
    noteId: number;
    userId: number;
    title: string;
    content: string;
}