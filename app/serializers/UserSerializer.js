var UserSerializer = {
    id: "",
    email: "",
    token: ""
}

exports.NewUserSerialize = function(){
    return;
};

exports.Serialize=function(model=undefined,type){
    if(!model) throw "Serializing user error";
    var uRresponse = {};
    Object.keys(UserSerializer).forEach((key)=>{
        uRresponse[key] = model[key];
    })
    return uRresponse;
};