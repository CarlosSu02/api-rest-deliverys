
import { validate } from 'class-validator';

class GeneralUtils {

    public errorsFromValidate = async (errors: any) => {

        return await validate(errors).then(errors => {

            if (errors.length > 0) {

                let constraints: any = {
                    code: 400,
                    results: []
                };

                errors.forEach(err => {
                    
                    constraints.results.push({

                        'property': err.property,
                        'errors': err.constraints

                    });

                });

                return constraints;

            }

        });

    };
    
}

export default new GeneralUtils();
