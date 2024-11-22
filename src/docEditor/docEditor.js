var documenteditorContainer;
window.docEditor = () => {
    documenteditorContainer = new ej.documenteditor.DocumentEditorContainer({ enableToolbar: true,height:"calc(100vh - 55px)", created:created });
    ej.documenteditor.DocumentEditorContainer.Inject(ej.documenteditor.Toolbar);
    documenteditorContainer.serviceUrl = 'https://services.syncfusion.com/js/production/api/documenteditor/';
    documenteditorContainer.appendTo('#DocumentEditor');

    function created() {
        if (window.pdfUrl) {
            setTimeout(() => { documenteditorContainer.documentEditor.open(window.pdfUrl, ''); }, 3000);
        }
        window.toolbar(window.fileName);
    }
}