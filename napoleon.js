//Node.js Bot for VK "Napoleon" v1.0

const Db = require('noob-db')

var infa = new Db ({
    name: 'string',
    text: 'string'
}, './infa.json')

var fs = require('fs')
//Приветствие
require('./intro.js')

//Загрузка конфига
var config = require('./config.js')

//Загрузка текста со списком команд
var help = fs.readFileSync('./help.txt', 'UTF-8')

//Подключение модуля "VK-Promise"
var VK = require("VK-Promise")

//Токен задается в файле "config.js"
var vk = new VK(config.access_token);

//Запуск LongPoll сервера

vk.init_longpoll();

var commands = [
    {com: 'test', reply: 'OK'},
    {com: 'Команды', reply: help},
    {com: 'Когда умер Наполеон?', reply: ['Историю учить надо было, долбоеб!', 'Загугли, или чо блять, тебе еще и подсказать как в гугол войти кек', 'Он умер, когда твоя мамка под стол пешком ходила', '5 мая 1821', 'Незнаю, отыбись', 'А ты с какой целью интерисуешься?', 'Ну что я тебе могу сказать, выглядишь ты как долбоеб, а спрашиваешь такие умные вещи! Подозрительно как то...']},
    {com: 'Где умер Наполеон?', reply: ['На кровати твоей мамки кек', 'На лесобазе', 'На Широтной', 'Он не умер, он жиф', 'Точно не в России', 'Где то там далеко, где нету спайса и анаши', 'не ну я хз, я не шарю в током', 'В пизде. Грубо, зато в рифму']},
    {com: 'От чего умер Наполеон?', reply: ['От цирроза печени', 'От рака матки, он же телкой был', 'От пули в лоб', 'ИВО ЧО УБЕЛЕ ЧТО ЛЕ', 'От твоих тупых вопросов', 'Все из за тебя, я тебе говорю!']},
    {com: 'Зачем умер Наполеон?', reply: ['Что бы потом все создавали его фейки &#128521', 'Его заморозили и скоро он даст пиздов вам', 'Что бы выяснить чо там как на небесеах', 'Прост)))', 'Не важно...', 'Спроси че полегче', 'Нахуй послан уебок']},
    {com: 'С какого ты района Бонапарт?', reply: ['С Широтной конечно', 'В переходе на Максима Горького сижу', 'С элитного', 'Лесобаза', 'КПД еба']},
    {com: 'Бонапарт, го на стрелу к кристаллу', reply: ['Не, я зассал', 'Я в стороне постою', 'Ну приходи, я тебя выебу', 'Чо ито токое крестал?', 'Хм...зря ты конечно меня туда позвал, потому что я выбью тебе зубы так, что чистить их придется тебе через задний проход', 'Го кек']},
    {com: 'Кто сливает Ге?', reply: ['Казанцев', 'Викторовна', 'Якуб', 'Чапский', 'Никто', 'Сокол', 'Архипова', 'Ягода', 'Ялын русский паринь', 'Филятова', 'Поздняк', 'Киррюша', 'Джоник', 'Тарасова', 'Паншин', 'Пидоры кокието', 'Опять слеле зоебали', 'Крысенов']},
    {com: 'Га', reply: 'Онал'},
    {com: 'Ga))', reply: 'Onal'},
    {com: 'Баер', reply: 'Ибанька 2'},
    {com: 'Да, онал', reply: 'Ггг'},
    {com: 'Нормальные есть?', reply: 'Нет, одни норкоманы кокие-то'},  
    {com: 'инфа+', 
        action: (msg, arg)=>{
            var name = arg.shift() // получаем первое слово
            var text = arg.getText(); //получаем остальной текст
            infa.insert({name: name, text: text})
            .write()
        }
    },
    {com: '/инфа', 
        action: (msg, arg)=>{
            var name = arg.shift()
            var r = infa.find({ name: name })
            if (r) {
                var text = 'Инфа про ' + name + ':'
                r.forEach((i)=>{
                    text += '\n- ' + i.text
                })
                msg.reply(text)                
            } else {
                msg.reply('Нет инфы про ' + name) 
            }

        }
    },
]

function doCommand(msg) {
    commands.forEach((command) => {
        if (command.reply) {
            if (command.com.toLowerCase() == msg.body.toLowerCase()) {
                if (Array.isArray(command.reply)) var reply = command.reply[Math.floor(Math.random() * command.reply.length)];
                else var reply = command.reply    
                msg.reply(reply)      
            }
        }

        if (command.action) {
            var arg = msg.body.split(' ')
            Object.defineProperty(arg, "getText", {enumerable: false, writable: true});
            arg.getText = () => {
                return arg.join(' '); 
            }
            var c = arg.shift()
            if (c.toLowerCase() == command.com.toLowerCase()) {   
                command.action(msg, arg)
            }
        }  
    })
}

// Отлов сообщений
vk.on("message", function(event, msg) {


    doCommand(msg)

});
