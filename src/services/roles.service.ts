import { Role } from "../models/role.model";

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

}

export default new RolesServices();
