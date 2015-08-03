// Google Analytics: change UA-XXXXX-X to be your site's ID.

(function(i,s,o,g,r,a,m){i.GoogleAnalyticsObject=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments);},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m);
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-XXXXXXXX-X', 'auto');
ga('send', 'pageview');

/*!
*	Custom input file v1.0.0
*	Copyright (c) 2015 Tiago Porto (http://tiagoporto.com)
*	Released under the MIT license
*/

var inputs = document.querySelectorAll('input[type=file]');

for(var i = 0; i < inputs.length; i++) {
	if(inputs[i].type.toLowerCase() === 'file') {
		inputs[i].onchange = function () {
			this.parentNode.querySelector('input').value = this.value;
		};
	}
}

/**
 * jQuery Logo Downloadtip v.0.1
 * (c) 2013
 * WebReady Sweden AB, http://www.webready.se
 * Nicklas Jarnesjö, http://www.jarnesjo.net
 *
 */

(function() {

    $.downloadTip = function(element, options) {
        var base = this;

        base.$element = $(element);
        base.element = element;

        base.$element.data("downloadTip", base);

        base.init = function() {
            base.options = $.extend({}, $.downloadTip.defaultOptions, options);

            base.$element.bind("contextmenu", function(e){
                if($("#logo-downloadtip").length != 0) { return false; }

                var container = $("<div/>", { "id": "logo-downloadtip", "class": base.options.position }),
                    header = $("<h3/>", { "text": "Download logo?" }),
                    content = $("<div/>", { "class": "content" }),
                    arrow = $("<div/>", { "class": "arrow" });
                // Get the logos
                $("link[data-title]").each(function(){
                    var title = $(this).data("title"),
                        href = $(this).attr("href"),
                        logo = $("<a/>", { "text": title, "href": href });
                    content.append(logo);
                });

                // Append to DOM
                container.append(header)
                         .append(arrow)
                         .append(content)
                         .appendTo("body");

                // Position top
                var position = getPosition();
                $("#logo-downloadtip").css({
                    "top": position.top,
                    "left": position.left
                }).fadeIn();

                // Remove downloadtip
                $(document).mousedown(function(e){
                    // Fade it out then remove it
                    $("#logo-downloadtip").fadeOut(400, function(){
                        $(this).remove();
                    });
                });

                // Stop removing of downloadtip if you click the div
                $("#logo-downloadtip").mousedown(function(e) {
                    e.stopPropagation();
                });

               return false;
            });
        };

        var getPosition = function() {
            var position = { "top": 0, "left": 0 };
            switch (base.options.position) {
                case "bottom":
                    position.top = base.$element.height() + base.$element.offset().top + 12;
                    position.left = base.$element.offset().left + base.$element.width() / 2 - $("#logo-downloadtip").width() / 2;
                    break;
                default:
                    if( $("#logo-downloadtip").height() / 2 < (base.$element.height() / 2 + base.$element.offset().top) ) {
                        position.top = base.$element.offset().top + (base.$element.height() / 2 - $("#logo-downloadtip").height() / 2);
                    }
                    position.left =  base.$element.offset().left + base.$element.width() + 12;
                    break;
            }

            return position;
        };

        base.init();
    };

    $.downloadTip.defaultOptions = {
        "position": "right"
    };

    $.fn.downloadTip = function(options) {
        return this.each(function() {
            (new $.downloadTip(this, options));
        });
    };
})();
//event listener: DOM ready
function addLoadEvent(func) {
    var oldonload = window.onload;
    if (typeof window.onload !== 'function') {
        window.onload = func;
    } else {
        window.onload = function() {
            oldonload();
            func();
        };
    }
}
addLoadEvent(
	//call plugins after DOM ready

    outdatedBrowser({
        bgColor: '#f25648',
        color: '#ffffff',
        lowerThan: 'transform',
        languagePath: 'lang/outdated_browser/en.html'
    }),


    $('#logo').downloadTip({ 'position': 'right' })
);
