
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

    public formattingWords = (words: string) => {
        
        return words.trim().toLowerCase().split(' ').filter(s => s !== '').join(' ').replace(/(^\w{1})|(\s+\w{1})/g, word => word.toUpperCase());

    };
    
}

export default new GeneralUtils();
