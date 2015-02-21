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
//call plugin function after DOM ready
addLoadEvent(
    outdatedBrowser({
        bgColor: '#f25648',
        color: '#ffffff',
        lowerThan: 'transform',
        languagePath: 'lang/outdated_browser/en.html'
    })
);

// Google Analytics: change UA-XXXXX-X to be your site's ID.

/*jshint -W030 */
(function(i,s,o,g,r,a,m){i.GoogleAnalyticsObject=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments);},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m);
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-XXXXXXXX-X', 'auto');
ga('send', 'pageview');

/*!
	Project Name
	Version: x.x.x
	Author: Name - Site
	Project Home page
	Contact: email
*/

// JS Scripts

/*!
	Project Name
	Version: x.x.x
	Author: Name - Site
	Project Home page
	Contact: email
*/

//jQuery Scripts
/* jshint ignore:start */
$(document).ready(function(){
/* jshint ignore:end */



/* jshint ignore:start */
});
/* jshint ignore:end */

/*!
	Project Name
	Version: x.x.x
	Author: Name - Site
	Project Home page
	Contact: email
*/

//Angulas.js Scripts
