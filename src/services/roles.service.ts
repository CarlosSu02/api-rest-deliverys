
// Roles service
import { Role } from "../models/role.model";
import { User } from "../models/user.model";

interface IRoles {
    count: number,
    roles: any[]
}

class RolesServices {

    public getRoles = async (): Promise<IRoles> => {

        const searchAllRoles = await Role.findAndCountAll();

        if (searchAllRoles.count === 0) throw new Error('There are not roles added!');

        return {
            count: searchAllRoles.count,
            roles: searchAllRoles.rows
        };

    };

    public getRolById = async (id: number) => {

        const role = await Role.findByPk(id);

        if (role === null) throw new Error(JSON.stringify({ message: 'Role is not exists!' }));

        return role;

    };

    public getRolByEmail = async (email: string) => {

        const role = await User.findOne({ where: { email: email }, include: [{ model: Role }] }).then(info => info?.toJSON());

        return role.role.type;

    };

}

export default new RolesServices();
