import domready from 'domready'

domready(() => {
<% if (use.outdatedBrowser) { %>
    outdatedBrowser({
        bgColor: '#f25648',
        color: '#fff',
        lowerThan: 'transform',
        languagePath: 'lang/outdated_browser/en.html'
    })<% } %>
    <% if (use.jqueryLogoDownloadtip) { %>
    $('#logo').downloadTip({ 'position': 'right' })<% } %>
})
