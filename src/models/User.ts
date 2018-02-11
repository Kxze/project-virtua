import { Table, Column, Model, HasMany } from "sequelize-typescript";

@Table
export class User extends Model<User> {
    @Column
    public username!: string;

    @Column
    public email!: string;

    @Column
    public twitterId!: string;
}
