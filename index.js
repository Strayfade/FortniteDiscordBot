const { DiscordAPIError } = require('discord.js');
const fs = require('fs');
const http = require('https');
const Discord = require('discord.js');
const { Console } = require('console');
const client = new Discord.Client();
const config = require('./config')

var token = config.discordToken
var channels = 7

var channel_1
var channel_2
var channel_3
var channel_4
var channel_5
var channel_6
var channel_7

client.on('ready', () => 
{
    console.log(`Logged in as ${client.user.tag}!`);
    channel_1 = client.channels.fetch(config.brNewsChannel)
    .then(channel => channel_1 = channel)
    .catch(console.error);
    channel_2 = client.channels.fetch(config.brShopChannel)
    .then(channel => channel_2 = channel)
    .catch(console.error);
    channel_3 = client.channels.fetch(config.brLeaksChannel)
    .then(channel => channel_3 = channel)
    .catch(console.error);
    channel_4 = client.channels.fetch(config.brProgressChannel)
    .then(channel => channel_4 = channel)
    .catch(console.error);
    channel_5 = client.channels.fetch(config.stwNewsChannel)
    .then(channel => channel_5 = channel)
    .catch(console.error);
    channel_6 = client.channels.fetch(config.creativeNewsChannel)
    .then(channel => channel_6 = channel)
    .catch(console.error);
    channel_7 = client.channels.fetch(config.creativeFeaturedIslandsChannel)
    .then(channel => channel_7 = channel)
    .catch(console.error);
});

function getTime()
{
    var current = new Date();
    var date = current.getFullYear()+'/'+(current.getMonth()+1)+'/'+current.getDate()
    var time = current.getHours() + ":" + current.getMinutes() + ":" + current.getSeconds()
    var currentTime= new Date().toLocaleTimeString()
    var realtime = date.toString()+ ' ' + currentTime.toString()
    return realtime.toString()
}
const sleep = (milliseconds) => 
{
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}

var exec = require('child_process').exec, child;
var child = exec('python main.py', function (error, stdout, stderr) 
{
    console.log('stdout: ' + stdout);
    console.log('stderr: ' + stderr);
    if (error !== null) 
    {
        console.log('exec error: ' + error);
    }
});

var brNewsFeed = JSON.parse(fs.readFileSync('./Cache/brnews.json'))
var brShop = JSON.parse(fs.readFileSync('./Cache/shop.json'))
var brLeaks = JSON.parse(fs.readFileSync('./Cache/leaks.json'))
var brProgress = JSON.parse(fs.readFileSync('./Cache/progress.json'))
var stwNewsFeed = JSON.parse(fs.readFileSync('./Cache/stwnews.json'))
var creativeNewsFeed = JSON.parse(fs.readFileSync('./Cache/creativenews.json'))
var creativeFeaturedIslands = JSON.parse(fs.readFileSync('./Cache/featuredislands.json'))

var statuses = []
statuses.push(brNewsFeed.status.toString())
statuses.push('200')
statuses.push('200')
statuses.push(brProgress.status.toString())
statuses.push(stwNewsFeed.status.toString())
statuses.push(creativeNewsFeed.status.toString())
statuses.push('200')

console.log('')
console.log('-----------------')
console.log(brNewsFeed.status.toString() + ' - BRNEWSFEED')
console.log('200' + ' - BRSHOP')
console.log('200' + ' - BRLEAKS')
console.log(brProgress.status.toString() + ' - BRPROGRESS')
console.log('-----------------')
console.log(stwNewsFeed.status.toString() + ' - STWNEWSFEED')
console.log('-----------------')
console.log(creativeNewsFeed.status.toString() + ' - CREATIVENEWSFEED')
console.log('200' + ' - CREATIVEFEATUREDISLANDS')

var errs = 0

console.log('')
console.log('Checking For Errors...')
for(var i = 0; i < channels; i++)
{
    if(statuses[i] != '200')
    {
        console.log('Error found in Channel ' + i + ': ' + statuses[i] + '\n Marking Channel ' + i + ' for Repair...')
        errs++;
        sleep(250)
    }
}
console.log(errs + ' Errors Found\n')
console.log('-----------------------------------\n')

if (errs > 0)
{
    console.log('Resolving Errors...')
    brNewsFeed = JSON.parse(fs.readFileSync('./Cache/brnews.json'))
    brShop = JSON.parse(fs.readFileSync('./Cache/shop.json'))
    brLeaks = JSON.parse(fs.readFileSync('./Cache/leaks.json'))
    brProgress = JSON.parse(fs.readFileSync('./Cache/progress.json'))
    stwNewsFeed = JSON.parse(fs.readFileSync('./Cache/stwnews.json'))
    creativeNewsFeed = JSON.parse(fs.readFileSync('./Cache/creativenews.json'))
    creativeFeaturedIslands = JSON.parse(fs.readFileSync('./Cache/featuredislands.json'))
}


function SENDALL()
{
    brNewsFeed = JSON.parse(fs.readFileSync('./Cache/brnews.json'))
    brShop = JSON.parse(fs.readFileSync('./Cache/shop.json'))
    brLeaks = JSON.parse(fs.readFileSync('./Cache/leaks.json'))
    brProgress = JSON.parse(fs.readFileSync('./Cache/progress.json'))
    stwNewsFeed = JSON.parse(fs.readFileSync('./Cache/stwnews.json'))
    creativeNewsFeed = JSON.parse(fs.readFileSync('./Cache/creativenews.json'))
    creativeFeaturedIslands = JSON.parse(fs.readFileSync('./Cache/featuredislands.json'))

    for (var i = 0; i < brNewsFeed.data.motds.length; i++)
    {
        let embed1 = new Discord.MessageEmbed()
        embed1.setTitle(brNewsFeed.data.motds[i].title)
        embed1.setDescription(brNewsFeed.data.motds[i].body)
        embed1.setFooter('Return Code ' + brNewsFeed.status + '. News Page ' + (i + 1))
        channel_1.send(embed1)
        channel_1.send(brNewsFeed.data.motds[i].image)
    }

    let embed2 = new Discord.MessageEmbed()
    embed2.setDescription('Shop for ' + brShop.time + ':')
    embed2.setFooter('Return Code ' + '200')
    channel_2.send(embed2)
    channel_2.send(brShop.discordurl)
    
    let embed3 = new Discord.MessageEmbed()
    embed3.setTitle('Leaks for ' + brLeaks.time + ':')
    embed3.setFooter('Return Code ' + '200')
    channel_3.send(embed3)
    channel_3.send(brLeaks.url)
    
    let embed4 = new Discord.MessageEmbed()
    embed4.setTitle('Season Progress:')
    embed4.addField('Season Length: ', brProgress.data.SeasonLength, true)
    embed4.addField('Days Passed: ', brProgress.data.DaysGone, true)
    embed4.addField('Days Left: ', brProgress.data.DaysLeft, true)
    embed4.addField('Percent Complete: ', (brProgress.data.DaysGone / brProgress.data.SeasonLength) + '%')
    channel_4.send(embed4)

    for (var i = 0; i < stwNewsFeed.data.messages.length; i++)
    {
        let embed5 = new Discord.MessageEmbed()
        embed5.setTitle(stwNewsFeed.data.messages[i].title)
        embed5.setDescription(stwNewsFeed.data.messages[i].body)
        embed5.setFooter('Return Code ' + stwNewsFeed.status + '. News Page ' + (i + 1))
        channel_5.send(embed5)
        channel_5.send(stwNewsFeed.data.messages[i].image)
    }
    
    for (var i = 0; i < creativeNewsFeed.data.motds.length; i++)
    {
        let embed6 = new Discord.MessageEmbed()
        embed6.setTitle(creativeNewsFeed.data.motds[i].title)
        embed6.setDescription(creativeNewsFeed.data.motds[i].body)
        embed6.setFooter('Return Code ' + creativeNewsFeed.status + '. News Page ' + (i + 1))
        channel_6.send(embed6)
        channel_6.send(creativeNewsFeed.data.motds[i].image)
    }
    
    for (var i = 0; i < creativeFeaturedIslands.featured_islands.length; i++)
    {
        let embed7 = new Discord.MessageEmbed()
        embed7.setTitle(creativeFeaturedIslands.featured_islands[i].title)
        embed7.setDescription(creativeFeaturedIslands.featured_islands[i].description)
        embed7.addField('Created by ', creativeFeaturedIslands.featured_islands[i].creator)
        embed7.setFooter('Return Code ' + '200' + '. Island ' + (i + 1) + ' of ' + (creativeFeaturedIslands.featured_islands.length))
        channel_7.send(embed7)
        channel_7.send(creativeFeaturedIslands.featured_islands[i].image)
    }
}

client.on('message', message => 
{
    if(message.content === 'SEND')
    {
        console.log('Sending All...')
        SENDALL()
        console.log('Sent all at ' + getTime())
    }
});
client.login(token);