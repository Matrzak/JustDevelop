class Command {
    constructor(cmd, description, role, activity, usage){
        this.cmd = cmd;
        this.description = description;
        this.role = role;
        this.activity = activity;
        this.request = undefined;
        this.arg = undefined;
    }

    apply(arg = undefined, request = undefined){
        this.arg = arg;
        this.request = request;
    }
    init(){
        if(this.role !== undefined){
            let pass = false;
            for(let i = 0; i <= this.role.length - 1; i++){
                if(this.request.member.roles.has(this.role[i].toString())){
                    pass = true;
                    break;
                }
            }
            if(!pass){
                this.request.reply("Nie masz odopowiednich uprawnien!");
                return;
            }
        }
        this.activity(this.arg,this.request);
    }
}
module.exports.Command = Command;