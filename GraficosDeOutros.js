define(["jquery", "qlik", "text!./GraficosDeOutros.css",'./properties'], function($, qlik, cssContent, properties) {
    'use strict';
    $("<style>").html(cssContent).appendTo("head");

    return {

        //define the properties panel looks like
        definition: properties,
        paint : function($element,layout) {
            //console.log("------------------------------------",layout);
            //console.log("Refresh Interval", layout.props.refreshInterval);
			//console.log(layout.props.showTopBars);
			//console.log($("#qv-toolbar-container").css());	
            var app = qlik.currApp(this);


   

            var html = '<html>'+layout.props.iframeGrafico+'</html>';
			
			
		
            $element.html(html);
			
					

            
        }
    };
});

