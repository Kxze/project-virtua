import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Song, User } from "./index";

@Entity()
export class Listen extends BaseEntity {
    
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => Song, song => song.listens, {
        cascadeInsert: true,
        nullable: false,
        eager: true,
    })
    song: Song;

    @ManyToOne(type => User, user => user.listens, {
        cascadeInsert: true,
        nullable: false,
        eager: true,
    })
    user: User;

    @Column({
        default: () => "NOW()"
    })
    createdAt: Date;

}
