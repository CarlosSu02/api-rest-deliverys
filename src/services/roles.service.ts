
// Roles service
import { ResponseDto } from "../common/dto/response.dto";
import generalUtils from "../common/utils/general.utils";
import { CreateRoleDto } from "../dtos/create_role.dto";
import { Role } from "../models/role.model";
import { User } from "../models/user.model";

interface IRoles {
    count: number,
    roles: any[]
}

class RolesServices {

    public getRoles = async (): Promise<ResponseDto> => {

        const searchAllRoles = await Role.findAndCountAll();

        if (searchAllRoles.count === 0) throw new Error(JSON.stringify({ code: 500, message: 'There are not roles added!' }));

        return {
            code: 200,
            message: 'List of all roles.',
            count: searchAllRoles.count,
            results: searchAllRoles.rows 
        };

    };

    public getRoleById = async (id: number) => {

        const role = await Role.findByPk(id);

        if (role === null) throw new Error(JSON.stringify({ code: 404, message: 'Role is not exists!' }));

        return role;

    };

    public getRoleByEmail = async (email: string) => {

        const role = await User.findOne({ where: { email: email }, include: [{ model: Role }] }).then(info => info?.toJSON());

        return role.role.type;

    };

    public getRoleByName = async (type: string) => {

        const role = await Role.findOne({ where: { type: type } });

        if (role !== null) throw new Error(JSON.stringify({ code: 400, message: 'Role already exists!' }));

        return role;

    };

    public validationAddRole = async (role: CreateRoleDto): Promise<CreateRoleDto> => {

        role.type = (role.type).toLowerCase().trim();

        const errors = await generalUtils.errorsFromValidate(role);

        if (errors !== undefined) throw new Error(JSON.stringify(errors));

        await this.getRoleByName(role.type);

        return role;

    };

}

export default new RolesServices();
