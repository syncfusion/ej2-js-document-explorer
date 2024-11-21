var viewer;
window.viewer = () => {
    viewer = new ej.pdfviewer.PdfViewer ({
        created:created,
        documentLoad:documentLoad,
        resourceUrl:'https://cdn.syncfusion.com/ej2/23.2.6/dist/ej2-pdfviewer-lib',
        height: 'calc(100vh - 55px)'
    });
    ej.pdfviewer.PdfViewer.Inject(ej.pdfviewer.Toolbar, ej.pdfviewer.Magnification, ej.pdfviewer.BookmarkView, ej.pdfviewer.ThumbnailView, ej.pdfviewer.TextSelection, ej.pdfviewer.TextSearch, ej.pdfviewer.Print, ej.pdfviewer.Navigation, ej.pdfviewer.LinkAnnotation, ej.pdfviewer.Annotation,  ej.pdfviewer.FormFields, ej.pdfviewer.FormDesigner,ej.pdfviewer.PageOrganizer);
    viewer.dataBind();
    viewer.appendTo('#pdfViewer');

    function created() {
        if (window.pdfUrl) {
            setTimeout(() => { viewer.load(window.pdfUrl, ''); }, 3000);
        }
        window.toolbar(window.fileName);
    }

    function documentLoad(args) {
        let file= args.documentName;
        if (args.documentName === 'undefined.pdf'){
            file = window.fileName;
        }
        var fileExtension = file.split('.').pop();
        if (fileExtension =="pptx"){
          var newFileName = file.replace(/\.[^.]+$/, '.pdf');
          viewer.downloadFileName = newFileName;
        }
        else{
        viewer.downloadFileName = file;
        }
      }
}