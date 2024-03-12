const { match } = require('assert');
const fs = require('fs');
const readline = require('readline');

class Chat {

    constructor(name) {

        this.name = name;
        this.path = `./uploads/${name}`
        this.stream = fs.createReadStream(this.path);
        this.totalMessages = 0;
        this.nameUser1 = "";
        this.nameUser2 = "";
        this.messageCountUser1 = 0;
        this.messageCountUser2 = 0;
        this.mostUsedEmojisUser1 = "";
        this.mostUsedEmojisUser2 = "";
    }

    // Properties
    get getData() {
        return {
            "statsUser1" :{
                "Name": this.nameUser1,
                "MessageCount": this.messageCountUser1,
                "Top3MostUsedEmojis" : this.mostUsedEmojisUser1,
            },
            "statsUser2" :{
                "NameUser2": this.nameUser2,
                "User2MessageCount": this.messageCountUser2,
                "Top3MostUsedEmojis" : this.mostUsedEmojisUser2,
            },
            "statsGlobal" : {
                "totalMessages": this.totalMessages,
            }
        }
    }

    // Methods
    countMessages() {
        return new Promise((resolve, reject) => {
            const stream = fs.createReadStream(this.path);

            const rl = readline.createInterface({
                input: stream,
                crlfDelay: Infinity
            });

            rl.on('line', (line) => {
                const regex = /\] ([^:]+):/g;
                let match;

                while ((match = regex.exec(line)) !== null) {

                    if (match[1] == this.nameUser1) {
                        this.messageCountUser1++;
                    }
                    else if (match[1] == this.nameUser2) {
                        this.messageCountUser2++;
                    }
                }
            });

            rl.on('close', () => {
                this.totalMessages = this.messageCountUser1 + this.messageCountUser2;
                resolve();
            });

            rl.on('error', (err) => {
                reject(err);
            });
        });
    }

    indetifyUserNames() {
        return new Promise((resolve, reject) => {
            const stream = fs.createReadStream(this.path);
            const rl = readline.createInterface({
                input: stream,
                crlfDelay: Infinity
            });

            rl.on('line', (line) => {
                const regex = /\] ([^:]+):/g;
                let match;
                while ((match = regex.exec(line)) !== null && this.nameUser1 == this.nameUser2) {

                    if (this.nameUser1 == "") {
                        this.nameUser1 = match[1];
                        this.nameUser2 = match[1];
                    }
                    else if (match[1] != this.nameUser1) {
                        this.nameUser2 = match[1]
                    }
                }
            });

            rl.on('close', () => {
                resolve();
            });

            rl.on('error', (err) => {
                reject(err);
            });
        });
    }


    isEmoji(character) {
        const emojiRegEx = /[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F1E6}-\u{1F1FF}\u{1F191}-\u{1F251}\u{1F004}\u{1F0CF}\u{1F170}-\u{1F171}\u{1F17E}-\u{1F17F}\u{1F18E}\u{3030}\u{2B50}\u{2B55}\u{2934}-\u{2935}\u{2B05}-\u{2B07}\u{2B1B}-\u{2B1C}\u{3297}\u{3299}\u{303D}\u{00A9}\u{00AE}\u{2122}\u{23F3}\u{24C2}\u{23E9}-\u{23EF}\u{25B6}\u{23F8}-\u{23FA}]/gu;
        return emojiRegEx.test(character);
    }

    // Función para leer el archivo y diferenciar texto de emojis
    differentiateTextAndEmojis() {
        return new Promise((resolve, reject) => {
            const stream = fs.createReadStream(this.path);
            const rl = readline.createInterface({
                input: stream,
                crlfDelay: Infinity
            });

            let user1Emojis = "";
            let user2Emojis = "";

            rl.on('line', (line) => {
                const regex = /\] ([^:]+):/g;
                let match;

                while ((match = regex.exec(line))) {
                    for (const char of line) {
                        if (this.isEmoji(char)) {
                            if (match[1] === this.nameUser1) {
                                user1Emojis += char;
                            } else if (match[1] === this.nameUser2) {
                                user2Emojis += char;
                            }
                        }
                    }
                }
            });

            rl.on('close', () => {
                this.mostUsedEmojisUser1 = user1Emojis;
                this.mostUsedEmojisUser2 = user2Emojis;

                this.mostUsedEmojisUser1 = this.top3MostUsedEmojis(this.mostUsedEmojisUser1);
                this.mostUsedEmojisUser2 = this.top3MostUsedEmojis(this.mostUsedEmojisUser2);

                console.log("Emojis User 1:", this.mostUsedEmojisUser1);
                console.log("Emojis User 2:", this.mostUsedEmojisUser2);

                resolve();
            });

            rl.on('error', (err) => {
                reject(err);
            });
        });
    }



    top3MostUsedEmojis(userEmojis) {
        let emojisObj = {};
        // Contar la frecuencia de cada emoji
        for (const emoji of userEmojis) {
            if (!emojisObj.hasOwnProperty(emoji)) {
                emojisObj[emoji] = 1;
            } else {
                emojisObj[emoji]++;
            }
        }
    
        // Convertir el objeto en un array de [emoji, frecuencia] y ordenarlo por frecuencia
        let sortedEmojis = Object.entries(emojisObj).sort((a, b) => b[1] - a[1]);
    
        // Obtener los 3 emojis más usados
        let top3Emojis = sortedEmojis.slice(0, 3).map(item => item[0]);
    
        return top3Emojis;
    }



    deleteFile() {
        fs.unlink(this.path, (err) => {
            if (err) {
                console.error('Error al eliminar el archivo:', err);
                return;
            }
            console.log('Archivo eliminado con éxito ');
        });
    }



    async analyse() {

        await this.indetifyUserNames();
        await this.countMessages();
        await this.differentiateTextAndEmojis();
    }

}


module.exports = { Chat }