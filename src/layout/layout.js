var fileObj;
var sideObj;
var dialogObj;
let selectedTree = '';
let isImageOpen = false;
let sidebarToggle = false;
let unSupportedFileName;
let popupVisibility = 'e-hide-popup';
let isUnSupported = false;
let data = [
    { id: '01', name: 'All Files', Icon: "sf-icon-Allfiles", select: true },
    { id: '02', name: 'Recent Files', Icon: "sf-icon-RecentFiles", select: false },
    { id: '03', name: 'Shared with me', Icon: "e-icons e-shared", select: false },
    { id: '04', name: 'Trash', Icon: "sf-icon-Delete", select: false },
    { id: '05', name: 'About', Icon: "sf-icon-About", select: false }
];
let hostUrl = 'https://sfblazor.azurewebsites.net/documentexplorer-services/production/';
let baseURLDev = "./";
let fileMenu = ["Open", "|", "Delete", "Download", "Rename", "|", "Details"];
let folderMenu = ["Open", "|", "Delete", "Download", "Rename", "|", "Details"];
let layoutMenu = ["SortBy", "View", "Refresh", "|", "NewFolder", "Upload", "|", "Details", "SelectAll"];
let toolItems = ['Upload', 'SortBy', 'Refresh', 'Delete', 'Download', 'Rename', 'View', 'Details'];
let isProduction = process.env.NODE_ENV === 'production';
window.layout = () => {
    var toolbarObj = new ej.navigations.Toolbar({
        overflowMode: 'Popup',
        cssClass: 'template',
        click: toolbarClick.bind(this),
        items: [
            { cssClass: 'e-icons e-hamburger-icon', align: 'Left', tooltipText: 'Menu', click: hamburgerClick, template: '<span class="e-hamburger"></span>' },
            { cssClass: 'e-header-icon', align: 'Left', tooltipText: 'Menu', template: '<span class="e-folder-logo e-header-icon" ><img width="30px" src="data:image/svg+xml;base64,PHN2ZyBpZD0iTGF5ZXJfMSIgZGF0YS1uYW1lPSJMYXllciAxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2aWV3Qm94PSIwIDAgMzIgMzIiPjxkZWZzPjxzdHlsZT4uY2xzLTF7ZmlsbDojZWJiODI0O30uY2xzLTIsLmNscy0ze2ZpbGw6I2ZmZjt9LmNscy0ye29wYWNpdHk6MC42NTt9LmNscy0ze29wYWNpdHk6MC40O30uY2xzLTR7ZmlsbDp1cmwoI2xpbmVhci1ncmFkaWVudCk7fTwvc3R5bGU+PGxpbmVhckdyYWRpZW50IGlkPSJsaW5lYXItZ3JhZGllbnQiIHgxPSIxNiIgeTE9IjM0LjgyIiB4Mj0iMTYiIHkyPSIxNS40NyIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPjxzdG9wIG9mZnNldD0iMCIgc3RvcC1jb2xvcj0iI2FkZDdmZiIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzZhYmNmZiIvPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPjx0aXRsZT5Mb2dvPC90aXRsZT48cmVjdCBjbGFzcz0iY2xzLTEiIHdpZHRoPSIzMiIgaGVpZ2h0PSIzMiIgcng9IjYuMDgiLz48cGF0aCBjbGFzcz0iY2xzLTIiIGQ9Ik0yLjg4LDYuNzJoMjYuNEEuMzIuMzIsMCwwLDEsMjkuNiw3djEwLjRoLTI3VjdBLjMyLjMyLDAsMCwxLDIuODgsNi43MloiLz48cGF0aCBjbGFzcz0iY2xzLTMiIGQ9Ik00LjMyLDQuNDhIMjhhLjMyLjMyLDAsMCwxLC4zMi4zMlY2LjcySDRWNC44QS4zMi4zMiwwLDAsMSw0LjMyLDQuNDhaIi8+PHBhdGggY2xhc3M9ImNscy00IiBkPSJNMS42LDkuOEg5YTEuNjEsMS42MSwwLDAsMSwxLjEuNDRsNCwzLjgxYTEuNTksMS41OSwwLDAsMCwxLjA3LjQ0bDE1LjI4LjI4QTEuNjEsMS42MSwwLDAsMSwzMiwxNi4zN3Y5LjU1QTYuMDgsNi4wOCwwLDAsMSwyNS45MiwzMkg2LjA4QTYuMDgsNi4wOCwwLDAsMSwwLDI1LjkyVjExLjRBMS42LDEuNiwwLDAsMSwxLjYsOS44WiIvPjwvc3ZnPg==" alt="header-img" /></span>' },
            { text: 'Document Explorer', align: 'Left', cssClass: 'doc-header' },
            { align: 'Right', id: 'User', cssClass: "popupVisibility === 'e-hide-popup' ? 'e-user-icon' : 'e-user-icon select-highlight'", tooltipText: 'User', template: '<span id="User-Img" class="e-user-img e-avatar e-avatar-circle"></span>', click: toolbarClick },
            { align: 'Right', id: 'GitHub', tooltipText: 'https://github.com/syncfusion/blazor-showcase-document-explorer', template: '<span class="sf-icon-Github"> </span>', click: toolbarClick }
        ]
    });
    toolbarObj.appendTo('#headerTool');

    sideObj = new ej.navigations.Sidebar({
        width: "260px",
        position: 'Left',
        animate: false,
        enableGestures: false,
        target: '.e-mainLayout-content',
        mediaQuery: '(min-width: 600px)',
        isOpen: sidebarToggle,
        open: openClick,
        close: closeClick
    });
    sideObj.appendTo("#defaultSidebar");

    let button = new ej.buttons.Button({
        content: 'New Folder',
        isPrimary: true,
        cssClass: "e-new-folder e-icons e-plus"
    });
    button.appendTo('#btnElement');

    button.element.onclick = function () {
        (fileObj).createFolder();
    }

    let treeViewInstance = new ej.navigations.TreeView({
        fields: { dataSource: data, id: 'id', text: 'name', selected: 'select', iconCss: 'Icon' },
        nodeSelected: handleTreeSelect
    });
    treeViewInstance.appendTo("#treeElement");

    let filemanager = new ej.filemanager.FileManager({
        height: '100%',
        width: '100%',
        ajaxSettings: {
            url: hostUrl + 'api/FileManager/FileOperations',
            getImageUrl: hostUrl + 'api/FileManager/GetImage',
            uploadUrl: hostUrl + 'api/FileManager/Upload',
            downloadUrl: hostUrl + 'api/FileManager/Download'
        },
        toolbarSettings: toolItems,
        contextMenuSettings: { file: fileMenu, folder: folderMenu, layout: layoutMenu },
        toolbarSettings: { items: toolItems },
        enablePersistence: true,
        navigationPaneSettings: { visible: false },
        contextMenuSettings: { file: fileMenu, folder: folderMenu, layout: layoutMenu, visible: true },
        fileOpen: onFileOpen,
        beforeImageLoad: beforeImageLoad,
        beforeSend: beforeSend,
        beforeDownload: beforeDownload
    });
    filemanager.appendTo('#filemanager');
    fileObj = filemanager;
    if (isProduction) {
        fileObj.toolbarSettings.items = ["Delete", "Download", "Rename", "SortBy", "Refresh", "Selection", "View", "Details"];
    } else {
        fileObj.toolbarSettings.items = ["Upload", "Delete", "Download", "Rename", "SortBy", "Refresh", "Selection", "View", "Details"];
    }

    dialogObj = new ej.popups.Dialog({
        content: 'This type of file cannot be previewed.',
        width: '350px',
        isModal: true,
        visible: isUnSupported,
        buttons: buttons
    });
    dialogObj.appendTo('#dialogElement')
};

const handleTreeSelect = (args) => {
    let newToolItems = [];
    let newFileMenu = [];
    let newFolderMenu = [];
    let newLayoutMenu = [];
    fileObj.clearSelection();
    fileObj.path = null;

    const treeNode = args.nodeData.id;
    let flag = false;

    if (treeNode === "05") {
        flag = true;
    }

    switch (treeNode) {
        case "02":
            newToolItems = ["Download", "Rename", "SortBy", "Refresh", "Selection", "View", "Details"];
            newFileMenu = ["Open", "|", "Delete", "Download", "Rename", "|", "Details"];
            newFolderMenu = ["Open", "|", "Delete", "Download", "Rename", "|", "Details"];
            newLayoutMenu = ["SortBy", "View", "Refresh", "|", "NewFolder", "|", "Details", "SelectAll"];
            selectedTree = "Recent";
            fileObj.ajaxSettings.url = hostUrl + 'api/FileManager/FileOperations';
            fileObj.ajaxSettings.getImageUrl = hostUrl + 'api/FileManager/GetImage';
            fileObj.ajaxSettings.downloadUrl = hostUrl + 'api/FileManager/Download';
            break;
        case "03":
            newToolItems = ["Download", "SortBy", "Refresh", "Selection", "View", "Details"];
            newFileMenu = ["Open", "|", "Download", "|", "Details"];
            newFolderMenu = ["Open", "|", "Download", "|", "Details"];
            newLayoutMenu = ["SortBy", "|", "View", "|", "Refresh", "|", "Details", "|", "SelectAll"];
            selectedTree = "Shared";
            fileObj.ajaxSettings.url = hostUrl + 'api/SharedFiles/FileOperations';
            fileObj.ajaxSettings.getImageUrl = hostUrl + 'api/SharedFiles/GetImage';
            fileObj.ajaxSettings.downloadUrl = hostUrl + 'api/SharedFiles/Download';
            break;
        case "04":
            newToolItems = ["Delete", "SortBy", "Refresh", "Selection", "View", "Details"];
            newFileMenu = ["Delete", "|", "Details", "|", "SelectAll"];
            newFolderMenu = ["Download", "|", "Details", "|", "SelectAll"];
            newLayoutMenu = ["SortBy", "View", "Refresh", "|", "Details", "SelectAll"];
            selectedTree = "Trash";
            fileObj.ajaxSettings.url = hostUrl + 'api/Trash/FileOperations';
            fileObj.ajaxSettings.getImageUrl = hostUrl + 'api/Trash/GetImage';
            break;
        case "05":
            window.location.href = baseURLDev + '#/about';
            break;
        default:
            if (isProduction) {
                newToolItems = ["Delete", "Download", "Rename", "SortBy", "Refresh", "Selection", "View", "Details"];
            } else {
                newToolItems = ["Upload", "Delete", "Download", "Rename", "SortBy", "Refresh", "Selection", "View", "Details"];
            }
            newFileMenu = ["Open", "|", "Delete", "Download", "Rename", "|", "Details"];
            newFolderMenu = ["Open", "|", "Delete", "Download", "Rename", "|", "Details"];
            newLayoutMenu = ["SortBy", "View", "Refresh", "|", "NewFolder", "|", "Details", "SelectAll"];
            selectedTree = "AllFiles";
            fileObj.ajaxSettings.url = hostUrl + 'api/FileManager/FileOperations';
            fileObj.ajaxSettings.getImageUrl = hostUrl + 'api/FileManager/GetImage';
            fileObj.ajaxSettings.uploadUrl = hostUrl + 'api/FileManager/Upload';
            fileObj.ajaxSettings.downloadUrl = hostUrl + 'api/FileManager/Download';
            break;
    }
    fileMenu = newFileMenu;
    folderMenu = newFolderMenu;
    layoutMenu = newLayoutMenu;

    if (!flag) {
        fileObj.path = "/";
        fileObj.refresh();
    }
};

const beforeDownload = (args) => {
    if (selectedTree === "Recent") {
        var modifiedPath = args.data.data[0].filterPath;
        args.data.path = modifiedPath;
    }
};

function beforeSend(args) {
    if (args.action != "upload") {
        args.ajaxSettings.beforeSend = function (args) {
            args.httpRequest.setRequestHeader('Authorization', selectedTree);
        };
    }
}

const buttons = [
    {
        'click': () => {
            dialogObj.hide();
        },
        buttonModel:{
            isPrimary: true,
            content:'OK'
        }
    },
  ];

const field = { dataSource: data, id: 'id', text: 'name', selected: 'select', iconCss: 'Icon' };

function onFileOpen(args) {
    const file = args.fileDetails;
    fileName = file.name;
    filePath = file.filterPath;
    const path = file.filterPath.replace(/\\/g, "/") + fileName;

    if (file.isFile) {
        switch (file.type) {
            case ".jpg":
            case ".png":
            case ".dib":
            case ".jpeg":
            case ".jpe":
            case ".jfif":
            case ".gif":
            case ".tif":
            case ".tiff":
            case ".ico":
                isImageOpen = true;
                break;
            case ".pdf":
            case ".pptx":
                isPDF = true;
                getFileStream(path, true);
                break;
            case '.docx':
            case '.doc':
            case '.rtf':
            case '.txt':
                isPDF = false;
                getFileStream(path, false);
                break;
            case ".xlsx":
                getBlob(fileName, path);
                break;
            default:
                isUnSupported = true;
                dialogObj.show();
                dialogObj.header = fileName;
                break;
        }
    }
}

function getFileStream(Path, isPDF) {
    const ajax = new XMLHttpRequest();
    ajax.open("POST", hostUrl + "api/FileManager/GetDocument", true);
    ajax.setRequestHeader("content-type", "application/json");
    ajax.onreadystatechange = function () {
        if (ajax.readyState === 4 && (ajax.status === 200 || ajax.status === 304)) {
            fileLoad(ajax.responseText, isPDF);
        }
    };
    ajax.send(JSON.stringify({ "FileName": Path, "Action": (!isPDF ? "ImportFile" : "LoadPDF") }));
}

window.currentImageUrl = '';
window.fileName = '';
window.pdfUrl = '';

const fileLoad = (response, isPDF) => {
    window.pdfUrl = response;
    window.currentUrl = response;

    const queryParams = new URLSearchParams({
        url: window.currentUrl,
        name: window.fileName
    });

    // Simulate Angular's data sharing
    window.localStorage.setItem('fileName', window.fileName);

    if (isPDF) {
        // Navigate to PDF viewer
        window.location.href = baseURLDev + "#/pdfViewer";
    } else {
        // Navigate to document editor
        window.location.href = baseURLDev + "#/docEditor";
    }
};

function beforeImageLoad(args) {
    if (isImageOpen) {
        let file = (args).fileDetails;
        if (args.imageUrl) {
            currentImageUrl = args.imageUrl;
        }
        fileName = file[0].name;
        filePath = file[0].filterPath;
        window.localStorage.setItem('imgUrl', window.currentImageUrl);
        isImageOpen = false;
        window.location.href = baseURLDev + '#/imageEditor';
    }
    isImageOpen = false;
}

function getBlob(fileName, Path) {
    var request = new XMLHttpRequest();
    request.responseType = "blob";
    request.onload = function () {
        var file = new File([request.response], fileName);
        getExcel(fileName, file);
    };
    request.open("GET", hostUrl + "api/FileManager/GetExcel" + "?FileName=" + Path);
    request.send();
}

function getExcel(fileName, file) {
    window.fileName = fileName;
    window.fileExcel = file;
    window.location.href = baseURLDev + '#/excel';
}

function getIconStatus() {
    return popupVisibility === 'e-hide-popup' ? 'e-user-icon' : 'e-user-icon select-highlight';
}

function hamburgerClick(args) {
    sidebarToggle = !sidebarToggle;
    sideObj.isOpen = sidebarToggle;
}

function openClick(args) {
    document.getElementById('file-overlay')?.classList.add('e-file-show-overlay');
    document.getElementById('file-overlay')?.classList.remove('e-file-hide-overlay');
    sidebarToggle = true;
}

function closeClick(args) {
    document.getElementById('file-overlay')?.classList.remove('e-file-show-overlay');
    document.getElementById('file-overlay')?.classList.add('e-file-hide-overlay');
    sidebarToggle = false;
}



function toolbarClick(args) {
    switch (args.item.id) {
        case 'User':
            document.getElementById('user-Popup')?.classList.add(popupVisibility === 'e-hide-popup' ? 'e-show-popup' : 'e-hide-popup');
            document.getElementById('user-label')?.classList.add(popupVisibility === 'e-hide-popup' ? 'e-show-popup' : 'e-hide-popup');
            popupVisibility = popupVisibility === 'e-hide-popup' ? 'e-show-popup' : 'e-hide-popup';

            if (popupVisibility === 'e-show-popup') {
                document.getElementById('user-Popup')?.classList.remove('e-hide-popup');
                document.getElementById('user-label')?.classList.remove('e-hide-popup');
            }
            break;
        case 'GitHub':
            window.open('https://github.com/essential-studio/ej2-js-document-explorer', '_blank'); // Navigate to GitHub in a new tab
            break;
        default:
            break;
    }
}