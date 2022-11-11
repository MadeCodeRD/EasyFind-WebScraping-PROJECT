const response = (status, msg, data, res) => {
    const response = {
        status: status,
        msg: msg,
        data: data
    }

    res.status(status).json(response);
};
  
module.exports =  response;