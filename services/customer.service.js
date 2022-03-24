const Customer = require('../models/cutomer.model');

exports.create = async (data)=>{
    try {
        const customer = new Customer({
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            address: data.address,
            password: data.password,
            saltPassword: data.saltPassword,
            isActive : data.isActive
        })
    
        return customer.save();
    } catch (error) {
        return new Error(error.message);
    }

}

exports.update = async (id,data)=>{
    try {
        return await Customer.findByIdAndUpdate(id,data, {useFindndModify: false})
    } catch (error) {
        return new Error(error.message);
    }
    
}

exports.delete = async (id) =>{
    try {
        return await Customer.findByIdAndDelete(id)
    } catch (error) {
        return new Error(error.message);
    }
}

exports.findAll = async (data, sort, offset, limit) =>{
    try {
        const customer = await Customer.find(data)
        .sort(sort)
        .limit(limit)
        .skip(offset);

        const rowCont = await Customer.countDocuments();

        return { rowCont,customer}
    } catch (error) {
        return new Error(error.message)
    }
}

exports.findById = async (id) => {
    try {
        return await Customer.findById(id);
    } catch (error) {
        return new Error(error.message)
    }
}

exports.findbyEmail = async (email) =>{
    try {
      return await Customer.findOne({email:email})
    } catch (error) {
      return new Error(error.message)
    }
  }

