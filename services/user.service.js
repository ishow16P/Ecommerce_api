const User = require("../models/user.model");

exports.create = async (data) => {
  try {
    const user = new User({
      email: data.email,
      password: data.password,
      saltPassword: data.saltPassword,
      role: data.role,
      isActive: data.isActive,
    });
    return user.save();
  } catch (error) {
    return new Error(error.message);
  }
};
exports.update = async (id, data) => {
  try {
    return await User.findByIdAndUpdate(id, data, { useFindndModify: false });
  } catch (error) {
    return new Error(error.message);
  }
};
exports.delete = async (id) => {
  try {
    return await User.findByIdAndDelete(id);
  } catch (error) {
    return new Error(error.message);
  }
};
exports.findAll = async (data, sort, offset, limit) =>{
    try {
        const user = await User.find(data)
        .sort(sort)
        .limit(limit)
        .skip(offset);

        const rowCont = await User.countDocuments();

        return { rowCont, user}
    } catch (error) {
        return new Error(error.message)
    }
}
exports.findById = async (id) =>{
    try {
        return await User.findById(id)
    } catch (error) {
        return new Error(error.message)
    }
}

exports.findbyEmail = async (email) =>{
  try {
    return await User.findOne({email:email})
  } catch (error) {
    return new Error(error.message)
  }
}
