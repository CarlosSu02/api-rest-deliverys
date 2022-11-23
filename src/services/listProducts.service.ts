
class ListProductsService {

    public createListProducts = async (billDetailId: number, productId: number, amount: number) => {

        try {

            console.log(billDetailId, productId, amount);

        } catch (error) {

            if (error instanceof Error) {
                                
                const info = JSON.parse(error.message);
            
            }
            
            // return res.status(500).send(String(error));
            
        }

    };

}

export default new ListProductsService();
