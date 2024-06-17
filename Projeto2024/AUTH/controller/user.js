var User = require("../model/user")


module.exports.list = () => {
    return User
        .find()
        .sort('name')
        .then(resp => {
            return resp
        })
        .catch(erro => {
            return erro
        })
}

module.exports.findByEmail = email => {
    return User
        .findOne({email : email})
        .then(resp => {
            return resp
        })
        .catch(erro => {
            return erro
        })
}

module.exports.findById = id => {
    return User
        .findById(id)
        .then(resp => {
            return resp
        })
        .catch(error => {
            return erro
        })
}

module.exports.insert = user => {
    const newUser = new User(user)
    return newUser.save()
}

module.exports.updateUser = (id, user) => {
    return User
        .findByIdAndUpdate(id, user, {new : true})
        .then(resp => {
            return resp
        })
        .catch(erro => {
            return erro
        })
}

module.exports.updatePassword = (id, pwd) => {
    User.findOne({_id : id})
        .then(user => {
            if(!user)
            {
                console.log('No user found with id: ' + id)
                return ({error : 'Não foi encontrado um utilizador com o id fornecido'})
            }
            else
            {
                user.changePassword(pwd.oldPassword , pwd.newPassword, function (err, user) {
                    if(err)
                    {
                        if(err.name === 'IncorrectPasswordError')
                        {
                            return {error : 'Password Incorreta.'}
                        }
                        else
                        {
                            return {'error' : 'Algo correu mal. Tente novamente mais tarde', 'message' : err}
                        }
                    }
                    else
                    {
                        console.log('Password changed sucessfuly')
                        user.save()
                        return user
                    }
                })
            }
        })
        .catch(err => {
            console.log('Error: ' + err)
            res.status(500).jsonp({'error' : 'Algo correu mal. Tente novamente mais tarde', 'message' : err})
            //TODO Handle error here
        })

    return User.updateOne({_id:id}, pwd)
        .then(resp => {
            return resp
        })
        .catch(erro => {
            return erro
        })
}

module.exports.delete = id => {
    return User.deleteOne({_id:id})
        .then(resp => {
            return resp
        })
        .catch(erro => {
            return erro
        })
}