const fs = require('fs');
const readline = require('readline');

class Chat {

    constructor(name) {

        this.name = name;
        this.path =  `./uploads/${name}`
        this.totalMessages = 0;
        this.user1 = "";
        this.user2 = "";
        this.totalMessagesUser1 = 0;
        this.totalMessagesUser2 = 0;
        this.stream = fs.createReadStream(this.path);
    }

    // Properties
    get getData(){
        return {
            "totalMessages" : this.totalMessages
        }
    }

    // Methods
    countTotalMessages() {
        return new Promise((resolve, reject) => {
            let contador = 0;
            const stream = fs.createReadStream(this.path);
            const rl = readline.createInterface({
                input: stream,
                crlfDelay: Infinity
            });

            rl.on('line', () => {
                contador++;
            });

            rl.on('close', () => {
                this.totalMessages = contador;
                console.log(`Total de mensajes: ${contador}`);
                resolve();
            });

            rl.on('error', (err) => {
                reject(err);
            });
        });
    }



    async analyse() {

        await this.countTotalMessages();

        // const { nameUser1 , nameUser2 } = this.identifyUsers();
        // this.user1 = nameUser1;
        // this.user2 = nameUser2;
    }


    





}


module.exports = { Chat }