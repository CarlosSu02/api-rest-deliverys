
import { validate } from 'class-validator';

class GeneralUtils {

    public errorsFromValidate = async (errors: any) => {

        return await validate(errors).then(errors => {

            if (errors.length > 0) {

                let constraints: any = [];

                errors.forEach(err => {
                    
                    constraints.push({

                        'Property': err.property,
                        'Errors': err.constraints

                    });

                });

                return constraints;

            }

        });

    };
    
}

export default new GeneralUtils();
