
//libraries
const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");
const fetch = require("node-fetch")
const { MessageEmbed } = require('discord.js');




client.on("ready", () => { //the pgrm receives 'ready' from discord.js (pgrm is working)
  console.log("I am ready!"); //then the pgrm gives an output to the user(in cmd) that the program is working
});




//main code
client.on("message", async (message) => {
//|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
  if (message.author.bot) return; //checks if the user is a bot (ignores message)
  
  if (message.content.indexOf(config.prefix) !== 0) return;  //checks if the starting of the code starts with a prefix (or symbol), if it doesnt the code ignores the message

  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);//splits the user input into arrays (input string) example : user sends -->  %covid a b --> then args[0] = a and args[1] = b

  const command = args.shift().toLowerCase(); //shifts input to lowercase 
 
  if(command === 'help' || command === 'commands') { //lists command (ex: %command or %help )
    message.channel.send("use these commands :(le prefix is ***%***) \n *%help* or *%commands%* \n*%hi* or *%info* \n*%server* \n***%covid*** --> *%covid cases high \n --> %covid cases all (or) %covid cases `insertcountryhere`***( case sensitive btw)***");//need to updatate the code
  
  } else
  if ((command === 'hi') || (command === 'info')) { //intro (ex: %hi or %info )
    message.channel.send('***Hello, I am Covibot used for covid related stuff, currently in devolopment!***');
  } else
  if (command === 'server') { //info about server (ex: %server )
    message.channel.send(`Server name: ${message.guild.name} \n Total members: ${message.guild.memberCount}`)
  }else
  
    if(command === 'covid') { //checks if command has covid (ex: %covid )
       let input = args[0]
      
       if (input === "all")  { 



         
         
      let stats = async () => {
        //api0
        let result = await fetch('https://disease.sh/v3/covid-19/all')
        let json = await result.json()
        return json
      }

      let covid = await stats()


      const covidembed = new Discord.MessageEmbed()//template 
      .setColor('RANDOM')
      .setTitle('Worldwide Covid Stats')
      .setDescription('Displays the current stastistics for covid-19 worldwide from the start ')
      .addFields (
           {name: 'Cases from the start of covid till now ', value: `***${covid.cases}***`},//total cases 
           {name: 'Deaths from the start of covid till now', value: `***${covid.deaths}***`}//total deaths

      )
    
   
      message.channel.send(covidembed)
    }
    //|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
      else 



      if (!args[0]) {
       message.channel.send("No arguments are provided, provide some arguments (eg %covid all)")





    }else  {
      // lists top 10 countries
       if ((args[0]) === "case" || (args[0]) === "cases") //%covid case %covid cases            
       {     if (!args[1]) {

         message.channel.send("You didnt specify anything for `%covid cases`, please use `%covid case high` or `%covid cases high`")
       }
            else { 
              
         
        let stats = async() => {     //stats is a function which gets the data from the link and converts it into a json format
          //fetches data from api  with the user input substituted in the link 
          let result = await fetch(`https://disease.sh/v3/covid-19/countries/`)
          let json = await result.json();
          return json
        } 
        let covid = await stats()  // waits for the data to get collected
        
         if ((args[1].toLowerCase()) === "high"  ) { //HiGH == high %covid cases low

          covid =  covid.sort(function(a, b) { //sorts the json file with respect to the cases (from the top cases)
            return b.cases - a.cases
          });  
          covid = covid.slice(0,10)  //slices the json file so that only the first 10 countrys with the top cases are showing
          const covidembed = new Discord.MessageEmbed()//displays the text in an embed (custom format)(and keeps the embed in the covidembed)
        .setColor('RANDOM')
        .setTitle(`top 10 cases for covid-19 (including all countries) `)
        .setDescription('Displays the current stastistics for covid-19 worldwide from the start ')
        .setImage(`https://quickchart.io/chart?c={type:'bar',data:{labels:['Cases'],datasets:[{label:'${covid[0].country}',data:[${covid[0].cases}]},{label:'${covid[1].country}',data:[${covid[1].cases}]},{label:'${covid[2].country}',data:[${covid[2].cases}]},{label:'${covid[3].country}',data:[${covid[3].cases}]},{label:'${covid[4].country}',data:[${covid[4].cases}]}]}}`)
        //visualizes graph (using quickchart.io which is based on chart.js)
        for (let i = 0; i < covid.length; i++) { //loops through the arrays till all the arrays are displayed
          covidembed.addFields({ name: `${i+1}) ${covid[i].country}`, value: `cases 🡆 ${covid[i].cases}` },
          
                                                                                           );
        }        
        message.channel.send(covidembed) //displays the custom format

         }
        // ||||||||||||||||||||||||||||||||||||||||||||||||||||||
       else {
         let inp = (args[1])//error message

         message.channel.send(" I dont understand what `"+ inp +"` is! & \nPlease use `%covid case high` or `%covid cases high`")
       }
        

        }
        
       } 


       
       
         
         
     
      else {
      //makes the specific input non case sensitive 
    
// seperate commands (above one is for the list command whereas below is for the normal covid *insert country here* message)
      //%covid sri lanka 
      if ((args[1]) === undefined) {  //if there isnt any value for args[1] then it replaces it with a space
         (args[1]) = ' '     
        
      }
      let a1a2 =  (args[0]) + ' ' + (args[1]); 
      let inp = a1a2.toLowerCase(); // takes in the  input
  

      
     


      let stats = async () => {
        //fetches data from api  with the user input substituted in the link 
        let result = await fetch(`https://disease.sh/v3/covid-19/countries/${inp}`)
        let json = await result.json()
        return json
      } 

      let covid = await stats()
       
    if (Number.isInteger(covid.cases)) 
      
       {        
        
        const covidembed = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setTitle(`Covid stats for ${covid.country} `)
        .setDescription('Displays the current stastistics for covid-19 worldwide from the start ')
        .addFields (
             {name: `Cases in ${covid.country} `, value: `***${covid.cases}***`},
             {name: `Deaths in ${covid.country} `, value: `***${covid.deaths}***`}

        
        )
        .setThumbnail(covid.countryInfo.flag)
           message.channel.send(covidembed)  
           

        }
        else  {

              message.channel.send(`I dont understand ***${inp}*** please check %commands or %help for more info`) 

      
      }
      
    }
        
     
      
    }
      
 }               
  });
 
client.login(config.token);
