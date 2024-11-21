var imageEditorObj;
window.imgeditor = () => {
    imageEditorObj = new ej.imageeditor.ImageEditor({
        width: '100%',
        height: '100%',
        created: function () {
            window.toolbar(window.fileName);
            imageEditorObj.open(window.currentImageUrl);
        },
        beforeSave: beforeSave
      });
        if (document.getElementById('right-pane')) {
            document.getElementById('right-pane').addEventListener('scroll', onScroll);
        }
        // Handler used to reposition the tooltip on page scroll
        function onScroll() {
            if (document.getElementById('imageeditor_sliderWrapper')) {
                var slider = ej.base.getComponent(document.getElementById('imageeditor_sliderWrapper'), 'slider');
                slider.refreshTooltip(slider.tooltipTarget);
            }
        }
      imageEditorObj.appendTo('#imageEditor');
}
function beforeSave(args){
    let newFileName=(args.fileName).startsWith('Get')?window.fileName : args.fileName;
    const fileNameWithoutExtension = newFileName.replace(/\.[^/.]+$/, '');
    args.fileName = fileNameWithoutExtension;
}