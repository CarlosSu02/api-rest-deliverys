
// Auth service
import { SignupUserDto } from "../dtos/signup_user.dto";
import authUtils from "../utils/auth.utils";
import { SigninUserDto } from "../dtos/signin_user.dto";
import { ChangePasswordDto } from "../dtos/change_password.dto";
import rolesService from "./roles.service";
import generalUtils from "../utils/general.utils";
import userService from "./users.service";

class AuthService {

    public validationSignupUser = async (user: SignupUserDto): Promise<SignupUserDto> => {

        const errors = await generalUtils.errorsFromValidate(user);

        if (errors !== undefined) throw new Error(JSON.stringify(errors));

        if ((await userService.searchUserByEmail(user.email!))) throw new Error(JSON.stringify({ message: 'User already exists!' }));
        
        await rolesService.getRolById(user.roleId!);
        user.password = await authUtils.encryptPassword(user.password!);

        return user;

    };

    public validationSigninUser = async (user: SigninUserDto): Promise<SigninUserDto> => {
        
        const { email, password } = user;

        const errors = await generalUtils.errorsFromValidate(user);

        if (errors !== undefined) throw new Error(JSON.stringify(errors));

        if (!(await userService.searchUserByEmail(email))) throw new Error(JSON.stringify({ message: 'User not exists!' }));
        if (!(await authUtils.validatePassword(email, password))) throw new Error(JSON.stringify({ message: 'Password is not valid!' }));

        user.password = await authUtils.encryptPassword(password);

        return user;

    };

    public changePassword = async (user: ChangePasswordDto): Promise<ChangePasswordDto> => {

        const { email, password, new_password } = user;

        if (password === new_password) throw new Error(JSON.stringify({ message: 'The new password must be different!' }));
        
        const errors = await generalUtils.errorsFromValidate(user);

        if (errors !== undefined) throw new Error(JSON.stringify(errors));

        if (!(await userService.searchUserByEmail(email!))) throw new Error(JSON.stringify({ message: 'User not exists!' }));
        if (!(await authUtils.validatePassword(email!, password!))) throw new Error(JSON.stringify({ message: 'Password is not valid!' }));

        user.password = await authUtils.encryptPassword(password);
        user.new_password = await authUtils.encryptPassword(new_password);

        return user;

    };

}

export default new AuthService();
