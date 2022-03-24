const Merchant = require('../models/merchant.model');

exports.create = async (data)=>{
    try {
        const merchant = new Merchant({
            merchantName: data.merchantName,
            email: data.email,
            password: data.password,
            saltPassword: data.saltPassword,
            isActive : data.isActive
        })
    
        return merchant.save();
    } catch (error) {
        return new Error(error.message);
    }

}

exports.update = async (id,data)=>{
    try {
        return await Merchant.findByIdAndUpdate(id,data, {useFindndModify: false})
    } catch (error) {
        return new Error(error.message);
    }
    
}

exports.delete = async (id) =>{
    try {
        return await Merchant.findByIdAndDelete(id)
    } catch (error) {
        return new Error(error.message);
    }
}

exports.findAll = async (data, sort, offset, limit) =>{
    try {
        const merchant = await Merchant.find(data)
        .sort(sort)
        .limit(limit)
        .skip(offset);

        const rowCont = await Merchant.countDocuments();

        return { rowCont,merchant}
    } catch (error) {
        return new Error(error.message)
    }
}

exports.findById = async (id) => {
    try {
        return await Merchant.findById(id);
    } catch (error) {
        return new Error(error.message)
    }
}

exports.findbyEmail = async (email) =>{
    try {
      return await Merchant.findOne({email:email})
    } catch (error) {
      return new Error(error.message)
    }
  }

