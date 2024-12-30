import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Entry {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({unique: true})
    remoteId: number;

    @Column('varchar', {length: 100})
    name: string;

    @Column({type: 'text', nullable: true})
    body: string;

    @Column()
    isValid: boolean;

    @Column({nullable: true})
    notValidReason: string;

    @Column({default: false})
    isChecked: boolean;

    @Column('varchar', {length: 255})
    url: string;

    @Column('varchar', {length: 100})
    company: string;

    @Column('varchar', {length: 100})
    location: string;
}
