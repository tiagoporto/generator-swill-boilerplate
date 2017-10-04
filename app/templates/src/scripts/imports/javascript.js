import domready from 'domready'<% if (use.jqueryLogoDownloadtip) { %>
import $ from 'jquery'
import downloadTip from 'jquery-logo-downloadtip'<% } %><% if (use.outdatedBrowser) { %>
const outdatedBrowser = require("exports-loader?outdatedBrowser!outdatedbrowser/outdatedbrowser/outdatedbrowser.js")<% } %>

// Executes after dow ready
domready(() => {<% if (use.outdatedBrowser) { %>
  const outdatedElement = document.createElement('div')
  outdatedElement.setAttribute('id', 'outdated')
  document.body.insertBefore(outdatedElement, document.body.childNodes[0])

  outdatedBrowser({
    bgColor: '#f25648',
    color: '#fff',
    lowerThan: 'transform',
    languagePath: 'lang/outdated_browser/en.html'
  })<% } %>
<% if (use.jqueryLogoDownloadtip) { %>
  $('#logo').downloadTip({
    'position': 'right'
  })<% } %>
})
