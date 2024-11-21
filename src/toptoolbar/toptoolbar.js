window.toolbar = function(fileName) {
    var toolbarObj = new ej.navigations.Toolbar({
        items: [
            { prefixIcon: 'e-icons e-chevron-left', tooltipText: 'Back', id: 'back', align: 'Left', click: onBackClick.bind(this) },
            { align: 'Left', id: 'title-name', template: '<span class="title-name">' + fileName + '</span>' }, 
            { prefixIcon: 'e-icons e-close', id: 'close', tooltipText: 'Close', align: 'Right', click: onBackClick.bind(this) }
        ],
        height: "50px"
    });
    toolbarObj.appendTo('#topToolbar');
};
let baseURLDev = "./";
var onBackClick = function(args) {
    window.location.href = baseURLDev + '';
};