

//Hide elemenet onClick
$(document).ready(function(){
	$("#test").click(function(){
		$(this).hide();
	});
});

//Reset all elements
$(function(){
	$("button").click(function(){
		$("div").show();	
	})
});