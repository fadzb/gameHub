function getCookie(name){
    var pattern = RegExp(name + "=.[^;]*")
    matched = document.cookie.match(pattern)
    if(matched){
        var cookie = matched[0].split('=')
        return cookie[1]
    }
    return false
}


$(document).ready(function()
{	
	var isLogged = getCookie('Authorization');
	console.log("test");
	console.log("Logged In:" + isLogged);	

	if(!isLogged == false){
		$("#loginCheck").html("Logged In");
	}
});


function getUsername(userID){
	var tok = $.get("/getUser/" +userID,function(res){
		var response = "";
		response = tok.responseJSON[0];
		console.log(response.user_name);
	});
	
}

function getUsernameByName(){
	var userToken = getCookie ('Authorization');
	var userToken = userToken.split("%20");
	var username = userToken[0];
	username = username.replace("%40","@");
	var accessToken = userToken[1];
	var response = "";
	var toReturn = "";	
	
	var tok = $.get("/getUserByName/" +username,function request(res){
		response = tok.responseJSON[0];
		toReturn = response.user_name;
		$("#userName").html(toReturn);
	});
	
}
 

$(document).ready(function()
{	
	getUsernameByName();	
});