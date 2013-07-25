KEYS = [];

//sound
MW.SOUND = true;

//url
URL = "http://abacus-server.herokuapp.com/";

//
PLAYERLEVEL = 0;
PLAYERID = 1;
PLAYERCURRENTLOCATION = 0;
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

var PostDataUsingXmlHttpRequest = function(score){
    var url = URL+'api/user/'+PLAYERID+'/score/'+score;
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