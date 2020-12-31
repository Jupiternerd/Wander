/**
 * @author : Wai
 * @module Command
 */

const { Command } = require("discord-gyro");
const Error  = require("../../utilities/errors.js")
const Helper = require('../../utilities/webhooks.js')
const Log = require("../../utilities/log.js")
const NovelEngine = require("../../utilities/novelEngine")
const TomoEngine = require("../../utilities/tomoEngine")
const Menu = require("../../utilities/menus.js")
const jsonFile = require("../../assets/novels/beginning.json");
const orioFile = require("../../assets/chars/Orio.json");
const storydb = require("../../models/stories.js");
const stories = require("../../models/stories.js");
const { db } = require("../../models/stories.js");
const cdb = require("../../models/chars.js");
class test extends Command {
    constructor() {
        super('test', {
            aliases: ['test'],
            category: 'testing',
            ownerOnly: true,
            ratelimit: 1,
            description: "pong!",
        })
    }
 /*
    async exec(message) {
        
        //console.log(jsonFile.multiples)
        let file = await JSON.parse(JSON.stringify(jsonFile));
        storydb.findOne({_id: 0}, (err, res) => {
            if (!res) {
                const db = new storydb({
                    _id: 0,
                    name: "Beginning",
                    price: 0,
                    likes: 0,
                    set: 1,
                    author: "N/A",
                    artist: "N/A",
                    multiples:[
                       {
                          type:0,
                          content:{
                             bg:"bg_grass",
                             msg_content:"HAMOOD HEBIBI"
                          },
                          lock:2000,
                          destination:"forward"
                       },
                       {
                          type:0,
                          content:{
                             bg:"bg_ocean",
                             msg_content:"AHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH"
                          },
                          destination:"forward"
                       },
                       {
                          type:0,
                          content:{
                             bg:"bg_grass",
                             msg_content:"321321312312313"
                          },
                          lock:2000,
                          destination:"forward"
                       },
                       {
                          type: "g_end",
                          content:{
                             bg:"bg_ocean",
                             msg_content:"Bruh wtf"
                          },
                          destination: "stop"
                       }
                    ]
                 });

                db.save()
                
            }
        })


        


        let x = new NovelEngine(file, {timeout: 70000}, message.channel, message.author, this.client);
        x.once("ready", () => {
            x.start();

        })
        


        
        

       
    } 
*/
/*
async exec(message) {
   //console.log(jsonFile.multiples)
   let file = await JSON.parse(JSON.stringify(jsonFile));
   //let client = this.client;
   let xd = await cdb.findOne({_id: 0}, (err, res) => {
       //console.log(res)
       if (!res) {
           const ccdb = new cdb({
            _id: 0,
            set: 1,
            price: 0,
            name: "Orio",
            description: "I am always going to be the first for everyone.",
            likes: 0,
            color: 0,
            link: {
                happy: null,
                sad: null,
                annoyed: null,
                blush: null,
                suprised: null
            },
            details: {
                bloodType: "O",
                age: "18",
                sex: 0
            },
            author: "Wei",
            artist: "Wei"
            });

           ccdb.save()
           
       } 
   })

   let novel = new NovelEngine(file, {}, message.channel, message.author, this.client);
                

   novel.once('ready', () => {
       novel.start();

   })

   



   


   
   

  
} 
    

    */
   
   async exec(message) {
       /*
       let db = new cdb({
        _id: 0,
        set: 0,
        price: 0,
        name: "Orio",
        description: "First!",
        likes: 0,
        color: 0,
        link: {
            happy: null,
            sad: null,
            annoyed: null,
            blush: null,
            surprised: null
        },
        details: {
            bloodType: "O",
            age: 18,
            sex: F,
        },
        author: "Wai",
        artist: "Wai"
    
       })
       db.save();
       */
       
      let x = new TomoEngine(orioFile, {timeout: 70000}, message.channel, message.author, this.client);
      x.once("ready", () => {
          x.start();

      })



   }


}

module.exports = test;