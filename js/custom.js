function getSlides() {
  $.getJSON('data/data.json')
  .done( function(data){                                 // SERVER RETURNS DATA
  	$.each(data.slides, function(key, val) {
  		console.log(key + " : " + val);
      
        if (key === 0) {
        $("#buttons").append("<button id='btn" + key + "'>$</button>");
        
  
            
        } else {
            
        
        
        $("#buttons").append("<button id='btn" + key + "'>" + key + "</button>");
        
        }
     
      $("#btn" + key).on('click', function () {
        $(".slide").hide("fadeOut");
          $("#slide0").hide();
        $("#slide" + key).show("fadeIn");
      });

  		msg = "<div class='slide' id='slide" + key + "'>"; 
  		msg += "<div class='titleArea' id='titleArea" + key + "'><h2>" + val.title + "</h2>";
  		msg += " ";
  		msg += "<div id='sub" + key + "'>" + val.description + "</div>";
        msg += "<div id='img" + key + "'>" + "<img src=" + val.image + ">" +"</div>";
  		msg += "</div></div>";

  		$('#content').append(msg); 

  		//$('#slide' + key).css("background", "url(" + val.image + ") center center no-repeat");
        // $('#content').append("<img src=" + val.image + ">");
      $('#slide' + key).hide();
            
        

      if (key === 0) {
        $('#slide0').show();
      };
	  });
   
     
    $('#buttons').append("<button id='prev'>&laquo;</button><button id='next'>&raquo;</button>"); 
     

    $("#prev").on ('click', function () {
      
        var i = $(".slide:visible").index();
        
        if (i < 1) {
            $(".slide:visible").hide();
            $(".slide:last").show("slide", { direction: "left"} );        
        } else {
            $(".slide:visible").hide().prev(".slide").show();
        };
        
    });    
    
    $("#next").on ('click', function () {

        var i = $(".slide:visible").index();
        var len = $(".slide").length - 1;
        
        if (i < len) {
                    $(".slide:visible").hide().next(".slide").show();
        } else {
            $(".slide:visible").hide();
            $(".slide:first").show("slide", { direction: "right"} );
        };
    });                           
  }).fail( function() {     
                               // THERE IS AN ERROR
    $('#content').text('Sorry, we cannot load data.'); 
      // Show error message 
  }).always( function() {                                // ALWAYS RUNS
     var reload = '<a id="refresh" href="#">';           // Add refresh link
     reload += 'Reload</a>';
     $('#reload').html(reload);                          // Add refresh link
     $('#refresh').on('click', function(e) {             // Add click handler
       e.preventDefault();                               // Stop link
       getSlides();                                      
     });
  }); 
}

$(document).ready(function() {

	getSlides();  
    
});

