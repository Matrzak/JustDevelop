
let date = new Date();
let utc = null;
let time = null;
const bot = require("../bot");
const c = require("../misc/config");

updateTime = () => {
    utc = date.toJSON().slice(0,10).replace(/-/g,'/');
    time = [date.getHours(),date.getMinutes(),date.getSeconds()];
};

getActionTime = () => {
    return `${time[0]}:${time[1]}:${time[2]}`;
};

function welcomeUser(member){
    member.send(`Witaj, ja jestem robot Marcin i będe twoim przewodnikiem po serverze "JustDevelop"\n  
    Na sam początek zapoznaj się z regulaminem który znajdziesz
    w kanale #regulamin, po 10 minutach od dołączenia będziesz mógł podjąć decyzje
    i zgodzić się.. lub też nie na nasze warunki użytkowania, spokojnie to tylko drobiagzi :)\n
    Kiedy minie 10 minut na kanale #akceptuj_regulamin napisz: **akceptuje** w przypadku chęci
    dołączenia do naszego zacnego community ;) kiedy już zaakceptujesz regulamin odezwe się do ciebie
    z dalszymi instrukcjami, a teraz miłego czytania :D`);
}

function welcomeMember(member){
    member.send(`O hej, to znowu ja... ciesze się że dołączyłeś do nas, na szybko opowiem ci o misji "JustDevelop"\n
    **Nowi w branży**\n  Zależy nam na wspólnej nauce... dlatego też wyciągamy pomocną ręke w strone młodych,
    początkujących programistów oraz innych aspirujących w zakresie IT. Nasz cel to ułatwienie nauki jak tylko sie da,
    sztab zweryfikowanych, doświadczonych osób w danej tematyce będzie bacznie czuwać odpowiadając na wasze pytania,
    problemy.\n**Doświadczeni/Profesjonaliści** \n O was też nie zapomnieliśmy. Zapewne pamiętacie jeszcze swoje pierwsze
    kody, projekty które nie były zbyt ciekawe, każdy przez to przechodził, w tym momencie powstaje możliwosć pomocy
    młodszym którzy dopiero co zasiadają do swoich pierwszych IDE. Oprócz możliwości przekazania swoich lat doświadczenia
    będziemy również organizować konkursy z nagrodami, wybierać projekty tygodnia/miesiaca/roku, dzielić się ciekawostkami,
    tworzyć wspólne projekty oraz organizować code review zarówno dla początkujących jak i dla doświadczonych devów.
    Więc na co czekasz? Wskocz do świata JustDevelop już teraz i zacznij "po prostu się rozwijać".`)
}

function sendChangeLog(oldMessage, newMessage){
    updateTime();
    bot.client.channels.get(c.config.logs_channel.toString()).send(
        `Wiadomość użytkownika **${oldMessage.author.tag}** została zmieniona\n 
        **Przed Zmiana: ** ${oldMessage}\n 
        **Po zmianie:** ${newMessage}\n 
        **Kanał: ** ${oldMessage.channel.name}\n 
        **Data: ** ${utc}\n
        **Godzina: ** ${getActionTime()}`);
}

function sendDeleteLog(deleted){
    updateTime();
    bot.client.channels.get(c.config.logs_channel.toString()).send(
        `Wiadomość użytkownika **${deleted.author.tag}** została usunięta\n
         **Treść: ** ${deleted}\n
         **Kanał: ** ${deleted.channel.name}\n
         **Data: ** ${utc}\n
         **Godzina: ** ${getActionTime()}`);
}

module.exports.sendChangeLog = sendChangeLog;
module.exports.sendDeleteLog = sendDeleteLog;
module.exports.welcomeUser = welcomeUser;
module.exports.welcomeMember = welcomeMember;