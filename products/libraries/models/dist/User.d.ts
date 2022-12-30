declare class User {
    name: string;
    surname: string;
    constructor(name: string, surname: string);
    getFullName(): string;
    setName(name: string): void;
}
export default User;
