import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToOne } from "typeorm";
import { Song } from "./Song";
import { Profile } from "./Profile";

@Entity()
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    facebookId: number;

    @Column()
    twitterId: string;

    @OneToOne(type => Profile)
    @JoinTable()
    profile: Profile;

    @ManyToMany(type => Song)
    @JoinTable()
    listens: Song[];
}
