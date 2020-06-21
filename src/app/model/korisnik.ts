import { Adresa } from './adresa';
import { Role } from './role';

export class Korisnik {
    id: number;
    username: string;
    password: string;
    email: string;
    ime: string;
    prezime: string;
    adresa: Adresa = new Adresa();
    role: string;
    enabled: boolean;
    deleted: boolean;
    blocked: boolean;
    roles: Array<Role> = [];


}
