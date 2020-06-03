module.exports.chatStart = (application,req,res)=>{
    const dadosForm = req.body;
    
    req.assert('apelido','Nome ou apelido é obrigatório').notEmpty();
    req.assert('apelido','Nome ou apelido deve conter entre 3 a 15 caracteres').len(3,15);

    const erros = req.validationErrors();

    if(erros){
        //res.send('Existem erros o formulário: ', erros);
        res.render('index',{validacao: erros});
        return; //por segurança, caso troque send por redirect futuramente
    }

    application.get('io').emit('msgParaCliente',{
        apelido: dadosForm.apelido, mensagem: ' acabou de entrar no chat...'
    });

    res.render('chat',{dadosForm: dadosForm});
}
