module.exports = (application)=>{
    application.get('/chat',(req,res)=>{
        application.controllers.chat.chatStart(application,req,res);
    });

    application.post('/chat',(req,res)=>{
        application.controllers.chat.chatStart(application,req,res);
    });
}
