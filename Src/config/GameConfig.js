KEYS = [];

//sound
MW.SOUND = true;

//url
URL = "http://abacus-server.herokuapp.com/";

//
PLAYERLEVEL = 1;
PLAYERID = 1;
PLAYERCURRENTLOCATION = 1;
GAMEMAXLEVEL = 10;

var EnemyType = [
    {
        type:1,
        scoreValue:15
    },
	
	{
        type:2,
        scoreValue:25
    }
];

var BarSize = {
    topBar: { width: 960, height: 76 },
    bottomBar: { width: 960, height: 114 }
};

DISTANCELIMIT = 10000;

var gameLevels =[
    {
        targets:5,
        bigEnemyArmour:12
    },
    {
        targets:8,
        bigEnemyArmour:16
    },
    {
        targets:11,
        bigEnemyArmour:20
    },
    {
        targets:14,
        bigEnemyArmour:22
    },
    {
        targets:17,
        bigEnemyArmour:24
    },
    {
        targets:20,
        bigEnemyArmour:26
    },
    {
        targets:23,
        bigEnemyArmour:28
    },
    {
        targets:26,
        bigEnemyArmour:30
    },
    {
        targets:29,
        bigEnemyArmour:32
    },
    {
        targets:32,
        bigEnemyArmour:34
    }

];

function PostDataUsingXmlHttpRequest(url){
    var XmlHttp = new XMLHttpRequest();
    XmlHttp.open("PUT", url, false);
    XmlHttp.onreadystatechange=function(){
        if (XmlHttp.readyState == 4 && XmlHttp.status == 200) {
        }
        else
            alert("Network Connectivity Issue: Unable to update your score");

    };
    try{
        XmlHttp.send(null);
    }
    catch(e){}

}