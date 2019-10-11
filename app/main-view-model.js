const Observable = require("tns-core-modules/data/observable").Observable;
const platformModule = require("tns-core-modules/platform");

const points = [
    {
        top: 40,
        left: 160,
    },
    {
        top: 210,
        left: 180,
    },
    {
        top: 310,
        left: 140,
    },
    {
        top: 380,
        left: 120,
    },
    {
        top: 450,
        left: 150,
    }
];

const devices = [
    {
        width: 1024,
        height: 1366,
        padding: 120,
    },
    {
        width: 834,
        height: 1194,
        padding: 120,
    },
    {
        width: 834,
        height: 1112,
        padding: 120,
    },
    {
        width: 768,
        height: 1024,
        padding: 120,
    },
]



function createViewModel() {
    const viewModel = new Observable();


    const pointWidth = 50;
    const initialWidth = 375;
    let widthDIPs = platformModule.screen.mainScreen.widthDIPs;
    const heightDIPs = platformModule.screen.mainScreen.heightDIPs;
    viewModel.containerPadding = 5;

    if (platformModule.device.deviceType === 'Tablet') {
        viewModel.containerPadding = devices.find(device => device.width === widthDIPs && device.height === heightDIPs).padding;
        widthDIPs -= viewModel.containerPadding * 2;
    }



    viewModel.bodyPoints = points.map(point => ({
        top: Math.round(point.top * widthDIPs / initialWidth),
        left: Math.round(point.left * widthDIPs / initialWidth),
        width: Math.round(((widthDIPs / initialWidth) * pointWidth))
    }));


    viewModel.set("screenInformationheightDIPs", platformModule.screen.mainScreen.heightDIPs);
    viewModel.set("screenInformationscale", platformModule.screen.mainScreen.scale);
    viewModel.set("screenInformationwidthDIPs", platformModule.screen.mainScreen.widthDIPs);
    viewModel.set("device", platformModule.device.deviceType);


    viewModel.onImageLoaded = ($event) => {
        viewModel.set("topPosition", viewModel.top);
        viewModel.set("leftPosition", viewModel.left);
    };

    viewModel.onTap = (a) => {

        const position = a.object.position;
        if (position === 'top') {
            viewModel.top += 10;
        } else {
            viewModel.left += 10;
        }

        viewModel.set("topPosition", viewModel.top);
        viewModel.set("leftPosition", viewModel.left);

    };

    return viewModel;
}

exports.createViewModel = createViewModel;
