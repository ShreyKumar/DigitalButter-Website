	var secret = "70766580";
	var input = "";
	var slidedown = false;
	function toppos(){
		var toppos = $(document).scrollTop();
		$(document).scroll(function(){
			if(toppos >= 500){
				$("#fullpage").addClass("fixed");
			}
		});
	}
	function gamestart(){
		$(document).keydown(function(e){
			e.stopImmediatePropagation();
			input += e.which;
			var exists = false;
			if(input.indexOf(secret) >= 0){
				exists = true;
			};
			if(exists){
				alert("Game unlocked!");
				$("#window").slideDown();
				$("iframe").attr("src", "flappybird/index.html");
				toppos();
				$("#fullpage").removeClass("fixed");
				slidedown = true;
				input = "";
			};
		});
	}

$(document).ready(function(){
		$("iframe").removeAttr("src");
		$("#window").hide();
		
	gamestart();
	
	$(".x").click(function(){
		$("#window").slideUp();
		$("#fullpage").addClass("fixed");
		gamestart();
	});
	//if user clicks below y position of 500px, slideUp()
	
	$(document).click(function(e){
		if(slidedown){
			if(e.pageY > 500 || e.$("#navbar")){
				$("#window").slideUp();
				slidedown = false;
			}
		}
	});

	//if clicked on navbar
	$(".navbar-nav li a ").click(function(){
		if(slidedown == true){
			$("#window").slideUp();
			slidedown = false;
			clicknavbar();
		};
	});
	//No Javascript compatibility

});

