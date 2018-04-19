import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToOne, JoinColumn, OneToMany } from "typeorm";
import { Song, Listen, Profile } from "./index";

@Entity()
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        nullable: true,
    })
    facebookId: number;

    @Column({
        nullable: true,
    })
    twitterId: string;

    @Column({
        default: () => "NOW()"
    })
    createdAt: Date;

    @OneToOne(type => Profile, profile => profile, {
        cascadeAll: true,
    })
    @JoinColumn()
    profile: Profile;

    @OneToMany(type => Listen, listen => listen.song)
    listens: Listen[];

    async updateProfile(profile: Profile) {
        await profile.save();
        this.profile = profile;
        await this.save();
    }

    async addListen(song: Song) {
        const listen = new Listen();
        listen.song = song;
        listen.user = this;

        await listen.save();
    }

}
