import { ResponseDto } from "../common/dto/response.dto";
import generalUtils from "../common/utils/general.utils";
import { CreateBillDetailDto } from "../dtos/create_bill.detail.dto";
import { BillDetail } from "../models/bill.detail.model";

class BillDetailServices {

    public getBillDetails = async (role: string): Promise<ResponseDto> => {

        var billDetailsData, messageToReturn;
        const searchAllBillDetails = await BillDetail.findAndCountAll();

        if (searchAllBillDetails.count === 0) throw new Error(JSON.stringify({ code: 500, message: 'There are not bill details added!' }));

            billDetailsData = searchAllBillDetails.rows; 
            messageToReturn = 'List of all categories.';
       

        return {
            code: 200,
            message: messageToReturn,
            count: searchAllBillDetails.count,
            results: {billDetailsData}
        };

    };

   public validationAddBillDetail = async (billDetail: CreateBillDetailDto): Promise<CreateBillDetailDto> => {

       const errors = await generalUtils.errorsFromValidate(billDetail);

      if (errors !== undefined) throw new Error(JSON.stringify(errors));

      if ((await this.searchCategoryByProductId(billDetail.billId))) throw new Error(JSON.stringify({ code: 404, message: 'Category exists!' }));

       return billDetail;

   };

   public searchCategoryByProductId = async (billId: number) => {

       const billDetail = await BillDetail.findOne({ where: { billId: billId } });

      if (billDetail !== null) throw new Error(JSON.stringify({ code: 400, message: 'billDetail already exists!' }));

      return billDetail;

   };

    public searchBillDetailById = async (id: number) => {

        let billDetail = await BillDetail.findByPk(id);

        if(billDetail === null) throw new Error(JSON.stringify({ code: 404, message: 'Bill Detail is not exists!' }));

        return billDetail;

    }

}

export default new BillDetailServices();