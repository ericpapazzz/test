import 'reflect-metadata';
import { 
  Table, 
  Column, 
  Model, 
  DataType, 
  PrimaryKey, 
  AutoIncrement
} from 'sequelize-typescript';

@Table({
    tableName: 'users',
})
export class User extends Model<User>{
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    user_id!:number

    @Column(DataType.STRING(100))
    user_name!:string
}

export default User;