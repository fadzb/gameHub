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
                    users += "<div class='well' style='box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);overflow:hidden;max-width:200;padding:0px;margin-bottom:10px;min-height:30px;'><div class='row'><div style='text-align:left;color: white;text-shadow: 1px 1px 2px #000000' class='col-xs-9'>"
                        + data[i].user_name +
                        "</font></div></div></div>";
                }
                $( "#feedUsers" ).html( users );
                $( "#userCount" ).html(data.length);
                if(!showUsers)
                    $( "#feedUsers" ).hide();
                else
                    $( "#feedUsers" ).show();

                // Recursively call getComments every 10 seconds
                setTimeout(getUsers,10000);
            });
        }

        $("#btn-count").click(function (event) {
            var options = {};
            if(!showUsers)
            {
                $("#feedUsers").show( "blind", options, 1000);
                showUsers = true;
            }
            else
            {
                $("#feedUsers").hide( "blind", options, 1000);
                showUsers = false;
            }
        });
});


