var fs = require('fs')
var interval = 100
var intro = fs.readFileSync('./intro.txt', 'UTF-8')
var strings = intro.split('\n')

writeString(strings)

function writeString(strings) {
    if (strings.length > 0) {
        var string = strings.shift()
        console.log(string);
        if (string.trim() != '') setTimeout(()=>{writeString(strings)}, interval)   
        else writeString(strings)
    }
}

