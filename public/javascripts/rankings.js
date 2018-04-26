$(document).ready(

    function() {
        var showUsers = false;
        getUsers();
        /**
         * When the page loads (or is refreshed) we request all users from the server
         */
        function getUsers(){

            $.get( "/getUsers", function( data ) {
                var users = "";
                
                for(var i=0; i<data.length; i++)
                {
                    users += "<div class='well' style='box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);overflow:hidden;max-width:700;padding:0px;margin-bottom:10px;min-height:30px;'><div class='row'><div style='text-align:left;color: white;text-shadow: 1px 1px 2px #000000' class='col-xs-9'>"
                        + data[i].user_name + 
                        "</br><font style='color:blue;'>Points: 0</font>" +
                        "</font></div></div></div>";
                }
                $( "#_users" ).html( users );
                

                // Recursively call getComments every 10 seconds
                setTimeout(getUsers,10000);
            });
        }
});


