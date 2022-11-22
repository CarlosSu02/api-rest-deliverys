
// Auth service
import { SignupUserDto } from "../dtos/signup_user.dto";
import authUtils from "../common/utils/auth.utils";
import { SigninUserDto } from "../dtos/signin_user.dto";
import { ChangePasswordDto } from "../dtos/change_password.dto";
import rolesService from "./roles.service";
import generalUtils from "../common/utils/general.utils";
import userService from "./users.service";

class AuthService {

    public validationSignupUser = async (user: SignupUserDto): Promise<SignupUserDto> => {

        const errors = await generalUtils.errorsFromValidate(user);

        if (errors !== undefined) throw new Error(JSON.stringify(errors));

        user.email = (user.email).toLowerCase();
        user.name = generalUtils.formattingWords(user.name);

        if ((await userService.searchUserByEmail(user.email!))) throw new Error(JSON.stringify({ code: 400, message: 'User already exists!' }));
        
        await rolesService.getRoleById(user.roleId!);
        
        user.password = await authUtils.encryptPassword(user.password!);

        return user;

    };

    public validationSigninUser = async (user: SigninUserDto): Promise<SigninUserDto> => {

        const errors = await generalUtils.errorsFromValidate(user);

        if (errors !== undefined) throw new Error(JSON.stringify(errors));

        user.email = (user.email).toLowerCase();

        const { email, password } = user;

        if (!(await userService.searchUserByEmail(email))) throw new Error(JSON.stringify({ code: 404, message: 'User not exists!' }));
        if (!(await authUtils.validatePassword(email, password))) throw new Error(JSON.stringify({ code: 400, message: 'Password is not valid!' }));

        user.password = await authUtils.encryptPassword(password);

        return user;

    };

    public changePassword = async (user: ChangePasswordDto): Promise<ChangePasswordDto> => {
        
        const errors = await generalUtils.errorsFromValidate(user);

        if (errors !== undefined) throw new Error(JSON.stringify(errors));
        
        user.email = (user.email).toLowerCase();

        const { email, password, new_password } = user;

        if (password === new_password) throw new Error(JSON.stringify({ code: 400, message: 'The new password must be different!' }));

        if (!(await userService.searchUserByEmail(email!))) throw new Error(JSON.stringify({ code: 404, message: 'User not exists!' }));
        if (!(await authUtils.validatePassword(email!, password!))) throw new Error(JSON.stringify({ code: 400, message: 'Password is not valid!' }));

        user.password = await authUtils.encryptPassword(password);
        user.new_password = await authUtils.encryptPassword(new_password);

        return user;

    };

}

export default new AuthService();
