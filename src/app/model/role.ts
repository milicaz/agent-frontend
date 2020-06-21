import { Privilege } from './privilege';

export class Role {
    id: number;
    name: string;
    privilegije: Array<Privilege> = [];
}
