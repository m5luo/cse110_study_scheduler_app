import { User } from "./types";

export function registerUser(username: string, password: string) {
    const newUser: User = {
        username: username,
        password: password,
        id: Date.now()
    };

    return newUser;

}