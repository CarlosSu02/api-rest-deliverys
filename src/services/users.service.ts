
// User service
import { UpdateInfoUserDto } from "../dtos/update_info_user.dto";
import { User } from "../models/user.model";
import authUtils from "../common/utils/auth.utils";
import generalUtils from "../common/utils/general.utils";
import rolesService from "./roles.service";

class UserService {

    public profile = async (email: string) => {

        const existsUser = await User.findOne({ attributes: [ 'id', 'name', 'phone', 'address', 'email' ], where: { email } }); 
        
        if (!(existsUser)) throw new Error(JSON.stringify({ error: 404, message: 'User not exists!' }));

        return existsUser;

    }
    
    public searchUserByEmail = async (email: string) => {

        const existsUser = await User.findOne({ where: { email } }); 

        return existsUser;

    };

    public searchUserInclude = async (email: string, model: any) => {

        const existsUser = await User.findOne({ where: { email }, include: [{ model }] }); 

        return existsUser;

    };

    public validationUpdateInfoUser = async (user: UpdateInfoUserDto, email: string): Promise<UpdateInfoUserDto> => {

        const errors = await generalUtils.errorsFromValidate(user);

        if (errors !== undefined) throw new Error(JSON.stringify(errors));

        if (!(await this.searchUserByEmail(email!))) throw new Error(JSON.stringify({ code: 404, message: 'User not exists!' }));

        await rolesService.getRoleById(user.roleId!);

        return user;

    };

}

export default new UserService();