var spreadsheet;
window.excel = () => {
    spreadsheet = new ej.spreadsheet.Spreadsheet({
        openUrl: 'https://services.syncfusion.com/js/production/api/spreadsheet/open',
        saveUrl: 'https://services.syncfusion.com/js/production/api/spreadsheet/save',
        height: 'calc(100vh - 55px)',
        created: function () {
            window.toolbar(window.fileName);
            spreadsheet.open({file:window.fileExcel});
        }
    });

    //Render initialized Spreadsheet component
    spreadsheet.appendTo('#spreadSheet');
}