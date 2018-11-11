// BalderLib
// version 2.3.2 (2018-10-19)
// Mattias Steinwall
// Baldergymnasiet, Skellefteå, Sweden


//
// Init IO
//

let _prompt = document.getElementById('prompt') as HTMLInputElement;
let _input = document.getElementById('input') as HTMLTextAreaElement;
let _submit = document.getElementById('submit') as HTMLButtonElement;
let _output = document.getElementById('output') as HTMLTextAreaElement;
let _action = document.getElementById('action') as HTMLButtonElement;

if (!_prompt) _prompt = document.createElement('input');
if (!_input) _input = document.createElement('textarea');
if (!_submit) _submit = document.createElement('button');
if (!_output) _output = document.createElement('textarea');
if (!_action) _action = document.createElement('button');

_prompt.placeholder = "prompt";
_prompt.readOnly = true;

_input.placeholder = "input";
_submit.textContent = "submit";
_submit.title = "Ctrl+Enter";

_output.placeholder = "output";
_output.readOnly = true;
_action.textContent = "clear";
_action.title = "Alt+Enter";

let prompts: string;    // Deprecated - use setPrompts()

let _promptLines: string[] = [];
let _promptLineindex = 0;

function _setPrompt() {
    const toCursor = _input.value.substr(0, _input.selectionStart);
    _promptLineindex = toCursor.split('\n').length - 1;
    _prompt.value = _promptLines[_promptLineindex];

    if (_promptLines[_promptLineindex] === undefined)
        _prompt.value = "";

    const lastLine = _promptLines[_promptLines.length - 1];     // 3.2.2
    if (lastLine !== undefined) {
        const indexStart = _promptLines.length - 1 - lastLine.length;

        if (/^""*$/.test(lastLine) && _promptLineindex >= indexStart) {
            const nr = Math.floor((_promptLineindex - indexStart) / lastLine.length) + 1;
            const index = indexStart + (_promptLineindex - indexStart) % lastLine.length;
            _prompt.value = _promptLines[index] + ` (${nr})`;
        }
    }
}

function setPrompts(...lines: string[]) {
    _promptLines = lines;
    _setPrompt();
}

_input.addEventListener('keyup', () => {
    _setPrompt();
});

_input.addEventListener('click', () => {
    _setPrompt();

    //workaround until event 'selectionchange' 
    setTimeout(() => {
        _setPrompt();
    }, 5);
});

function clearOutput() {
    _output.value = "";
    _input.focus();
    _input.select();
}

_action.onclick = () => {
    clearOutput();
};

_output.onkeydown = (event) => {
    if (event.altKey && (event.keyCode == 13 || event.keyCode == 10))
        clearOutput();
};

let _inputLines: string[] = [];
let _inputLineIndex = 0;

let clearOutputOnSubmit = true;

function _submitHandler() {
    if (clearOutputOnSubmit)
        _output.value = "";

    _inputLines = _input.value.split('\n');
    _inputLineIndex = 0

    if (typeof this['submit'] == 'function')
        this['submit']();

    if (!submitOnInput)
        _input.select();
}

_input.onkeydown = (event) => {
    if ((event.ctrlKey || event.metaKey) && (event.keyCode == 13 || event.keyCode == 10))
        _submitHandler();
};

let submitOnInput = false;

_input.oninput = () => {
    if (submitOnInput)
        _submitHandler();
}

_submit.onclick = () => {
    _submitHandler();
};

function input(): string {
    return _inputLines[_inputLineIndex++];
}

function output(value: any = "", newLine = true) {
    _output.value += value

    if (newLine)
        _output.value += '\n';
}


//
// Init Canvas
//

let canvas = document.getElementById('canvas') as HTMLCanvasElement;
if (!canvas) canvas = document.createElement('canvas');

const context = canvas.getContext('2d');

const _canvasParent = canvas.parentElement;
if (_canvasParent) {
    canvas.width = Math.max(_canvasParent.getBoundingClientRect().width, canvas.getBoundingClientRect().width);
    canvas.height = Math.max(_canvasParent.getBoundingClientRect().height, canvas.getBoundingClientRect().height);
}

canvas.tabIndex = 0;
context.font = "24px monospace";
text("canvas");


//
// Load and update
//

let updatesPerSecond = 60;

window.addEventListener('load', () => {
    const url = new URL(window.location.href);
    let pParam = url.searchParams.get("p");
    let iParam = url.searchParams.get("i");
    let oParam = url.searchParams.get("o");
    let mParam = url.searchParams.get("m");

    let iParamValue: string;
    let oParamValue: string;
    let mParamValue: string;

    if (pParam !== null) {
        prompts = decodeURIComponent(pParam);   // make local in 3.0
    }

    if (prompts !== undefined) {
        _promptLines = prompts.split('\n');
        _setPrompt();
    }

    if (iParam !== null) {
        iParamValue = decodeURIComponent(iParam);
        _input.value = iParamValue;
    }

    let createMode = false;

    if (mParam !== null) {
        mParamValue = decodeURIComponent(mParam);
        if (mParamValue === "create")
            createMode = true;
    }

    if (createMode) {
        function createParams() {
            if (_output.value.slice(-1) === "\n")
                _output.value = _output.value.slice(0, -1);

            pParam = encodeURIComponent(_promptLines.join("\n"));
            iParam = encodeURIComponent(_input.value);
            oParam = encodeURIComponent(_output.value);

            let getParam = "";
            let firstParam = true;

            if (pParam !== null) {
                getParam += "/?p=" + pParam;
                firstParam = false;
            }

            if (iParam !== null) {
                if (firstParam) {
                    getParam += "/?i=" + iParam;
                    firstParam = false;
                }
                else {
                    getParam += "&i=" + iParam;
                }
            }

            if (oParam !== null) {
                if (firstParam) {
                    getParam += "/?o=" + oParam;
                }
                else {
                    getParam += "&o=" + oParam;
                }
            }

            window.open(window.location.origin + getParam, "_blank");
        }

        _prompt.readOnly = false;
        _output.readOnly = false;
        _action.textContent = "create";

        _prompt.addEventListener('input', () => {
            _promptLines[_promptLineindex] = _prompt.value;
        });

        _action.onclick = () => {
            createParams();
        };

        _output.onkeydown = (event) => {
            if (event.altKey && (event.keyCode == 13 || event.keyCode == 10))
                createParams();
        };
    }

    if (iParam !== null || oParam !== null) {
        new Promise((resolve) => {
            _submitHandler();
            resolve();
        }).then(() => {
            if (oParam !== null) {
                oParamValue = decodeURIComponent(oParam);
                let outputValue = _output.value;

                if (outputValue.slice(-1) === "\n")
                    outputValue = outputValue.slice(0, -1);

                outputValue = outputValue.split("\n").map(line => line.trim()).join("\n"); // -trimEnd()    

                if (!createMode) {
                    _input.readOnly = true;
                    _input.onkeydown = null;
                    _submit.style.visibility = 'hidden';

                    _output.focus();
                    _action.textContent = "peek";

                    const correctColor = getComputedStyle(_output).getPropertyValue('--correct-color');
                    const incorrectColor = getComputedStyle(_output).getPropertyValue('--incorrect-color');

                    if (outputValue === oParamValue) {
                        _action.textContent = "next";
                        _output.style.backgroundColor = correctColor;

                        function newPage() {
                            let getParam = "";

                            if (pParam !== null) {
                                getParam = "/?p=" + encodeURIComponent(pParam);
                            }

                            window.open(window.location.origin + getParam, "_blank");
                        }

                        _action.onclick = () => {
                            newPage();
                        };

                        _output.onkeydown = (event) => {
                            if (event.altKey && (event.keyCode == 13 || event.keyCode == 10))
                                newPage();
                        };
                    }
                    else {
                        _output.value = outputValue;
                        _action.textContent = "peek";
                        _output.style.backgroundColor = incorrectColor;

                        function toggleOutput() {
                            if (_output.value === outputValue) {
                                _output.value = oParamValue;
                                _action.textContent = "back";
                                _output.style.backgroundColor = correctColor;
                            }
                            else {
                                _output.value = outputValue;
                                _action.textContent = "peek";
                                _output.style.backgroundColor = incorrectColor;
                            }
                        }

                        _action.onclick = () => {
                            toggleOutput();
                        };

                        _output.onkeydown = (event) => {
                            if (event.altKey && (event.keyCode == 13 || event.keyCode == 10))
                                toggleOutput();
                        };
                    }
                }
            }
        });
    }

    if (submitOnInput)
        _submit.style.visibility = "hidden";

    _input.focus();
    _input.select();

    if (typeof this['update'] == 'function') {
        this['update']();

        setInterval(this['update'], 1000 / updatesPerSecond);

        canvas.focus();
    }
});

window.addEventListener('resize', () => {
    window.location.reload();
});


// 
// Drawing functions
// 

function line(x1: number, y1: number, x2: number, y2: number, color?: string, lineWidth = 1) {
    context.beginPath();
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);

    if (color)
        context.strokeStyle = color;

    context.lineWidth = lineWidth;

    context.stroke();
}

function circle(x: number, y: number, radius: number, color?: string, lineWidth?: number) {
    context.beginPath();
    context.arc(x, y, radius, 0, 2 * Math.PI);

    if (lineWidth) {
        context.lineWidth = lineWidth;

        if (color)
            context.strokeStyle = color;

        context.stroke();
    }
    else {
        if (color)
            context.fillStyle = color;

        context.fill();
    }
}

function rectangle(x: number, y: number, width: number, height: number, color?: string, lineWidth?: number) {
    if (lineWidth) {
        context.lineWidth = lineWidth;

        if (color)
            context.strokeStyle = color;

        context.strokeRect(x, y, width, height);
    }
    else {
        if (color)
            context.fillStyle = color;

        context.fillRect(x, y, width, height);
    }
}

function triangle(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number, color?: string, lineWidth?: number) {
    context.beginPath();
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.lineTo(x3, y3);
    context.closePath();

    if (lineWidth) {
        context.lineWidth = lineWidth;
        context.strokeStyle = color;
        context.stroke();
    }
    else {
        context.fillStyle = color;
        context.fill();
    }
}

function text(value: any, x = 0, y = canvas.height, fontSize = 24, color?: string) {
    if (fontSize)
        context.font = fontSize + "px monospace";

    if (color)
        context.fillStyle = color;

    context.fillText(value, x, y);
}

let _images: HTMLImageElement[] = [];

function image(path: string, x: number, y: number, width?: number, height?: number) {
    let draw = () => {
        if (width && height) {
            context.drawImage(_images[path], x, y, width, height);
        }
        else {
            context.drawImage(_images[path], x, y);
        }
    };

    if (_images[path] === undefined) {
        _images[path] = new Image();
        _images[path].src = path;
        _images[path].addEventListener('load', draw);
    }
    else if (_images[path].complete) {
        draw();
    }
    else {
        _images[path].addEventListener('load', draw);
    }
}

function clear() {
    context.clearRect(0, 0, canvas.width, canvas.height);
}

function fill(color?: string) {
    if (color)
        context.fillStyle = color;

    context.fillRect(0, 0, canvas.width, canvas.height);
}


//
// Keyboard
//

const _key = {
    8: "backspace",
    13: "enter",
    16: "shift",
    17: "control",
    18: "alt",
    27: "escape",
    32: "space",
    33: "pageUp",
    34: "pageDown",
    35: "end",
    36: "home",
    37: "left",
    38: "up",
    39: "right",
    40: "down",
    45: "insert",
    46: "delete",
    48: "d0",
    49: "d1",
    50: "d2",
    51: "d3",
    52: "d4",
    53: "d5",
    54: "d6",
    55: "d7",
    56: "d8",
    57: "d9",
    65: "a",
    66: "b",
    67: "c",
    68: "d",
    69: "e",
    70: "f",
    71: "g",
    72: "h",
    73: "i",
    74: "j",
    75: "k",
    76: "l",
    77: "m",
    78: "n",
    79: "o",
    80: "p",
    81: "q",
    82: "r",
    83: "s",
    84: "t",
    85: "u",
    86: "v",
    87: "w",
    88: "x",
    89: "y",
    90: "z"
};

const keyboard = {
    "backspace": false,
    "enter": false,
    "shift": false,
    "control": false,
    "alt": false,
    "escape": false,
    "space": false,
    "pageUp": false,
    "pageDown": false,
    "end": false,
    "home": false,
    "left": false,
    "up": false,
    "right": false,
    "down": false,
    "insert": false,
    "delete": false,
    "d0": false,
    "d1": false,
    "d2": false,
    "d3": false,
    "d4": false,
    "d5": false,
    "d6": false,
    "d7": false,
    "d8": false,
    "d9": false,
    "a": false,
    "b": false,
    "c": false,
    "d": false,
    "e": false,
    "f": false,
    "g": false,
    "h": false,
    "i": false,
    "j": false,
    "k": false,
    "l": false,
    "m": false,
    "n": false,
    "o": false,
    "p": false,
    "q": false,
    "r": false,
    "s": false,
    "t": false,
    "u": false,
    "v": false,
    "w": false,
    "x": false,
    "y": false,
    "z": false
};

canvas.addEventListener('keydown', (event) => {
    event.preventDefault();
    keyboard[event.keyCode] = true;

    if (_key[event.keyCode] !== undefined)
        keyboard[_key[event.keyCode]] = true;
});

canvas.addEventListener('keyup', (event) => {
    event.preventDefault();
    keyboard[event.keyCode] = false;

    if (_key[event.keyCode] !== undefined) {
        keyboard[_key[event.keyCode]] = false;
    }
});


// 
// Mouse 
//

const mouse: {
    x: number,
    y: number,
    over: boolean,
    primary: boolean,
    secondary: boolean,
    middle: boolean
} = {
    x: null,
    y: null,
    over: null,
    primary: false,
    secondary: false,
    middle: false
};

window.addEventListener('mousedown', (event) => {
    if (event.button === 0) {
        mouse.primary = true;
    }
    else if (event.button === 1) {
        mouse.middle = true;
    }
    else if (event.button === 2) {
        mouse.secondary = true;
    }
});

window.addEventListener('mouseup', (event) => {
    if (event.button === 0) {
        mouse.primary = false;
    }
    else if (event.button === 1) {
        mouse.middle = false;
    }
    else if (event.button == 2) {
        mouse.secondary = false;
    }
});

canvas.addEventListener('mousemove', (event) => {
    const rect = canvas.getBoundingClientRect();

    mouse.x = event.clientX - rect.left;
    mouse.y = event.clientY - rect.top;
    mouse.over = true;
});

canvas.addEventListener('mouseout', () => {
    mouse.over = false;
});

canvas.addEventListener('contextmenu', (event) => {
    event.preventDefault();
});


//
// Touchscreen
//

interface _TouchInfo {
    x: number;
    y: number;
    id: number;
}

const touchscreen: {
    x: number,
    y: number,
    touched: boolean,
    touches: _TouchInfo[]
} = {
    x: null,
    y: null,
    touched: false,
    touches: []
};

canvas.ontouchstart = touchHandler;
canvas.ontouchend = touchHandler;
canvas.ontouchmove = touchHandler;

function touchHandler(event: TouchEvent) {
    event.preventDefault();

    const rect = canvas.getBoundingClientRect();

    touchscreen.touched = false;
    for (let i = 0; i < event.touches.length; i++) {
        touchscreen.touches[i] = {
            x: event.touches[i].clientX - rect.left,
            y: event.touches[i].clientY - rect.top,
            id: event.touches[i].identifier
        }

        if (i == 0) {
            touchscreen.touched = true;
            touchscreen.x = touchscreen.touches[0].x;
            touchscreen.y = touchscreen.touches[0].y;
        }
    }
}


//
// Turtle graphics
// 

class Turtle {
    public penColor = "black";
    public penWidth = 1;

    constructor(
        public x = canvas.width / 2,
        public y = canvas.height / 2,
        public direction = 0,
        public isPenDown = true) {
    }

    forward(length: number) {
        context.beginPath();
        context.moveTo(this.x, this.y);
        this.x += Math.cos(toRadians(-this.direction)) * length;
        this.y += Math.sin(toRadians(-this.direction)) * length;

        if (this.isPenDown) {
            context.lineTo(this.x, this.y);
            context.strokeStyle = this.penColor;
            context.lineWidth = this.penWidth;
            context.stroke();
        }
        else {
            context.moveTo(this.x, this.y);
        }
    }

    backward(length: number) {
        this.forward(-length);
    }

    right(angleDeg = 90) {
        this.direction -= angleDeg;
    }

    left(angleDeg = 90) {
        this.direction += angleDeg;
    }

    penUp() {
        this.isPenDown = false;
    }

    penDown() {
        this.isPenDown = true;
    }
}

const turtle = new Turtle();


//
// Grid
//

class Cell {
    private _imagePath: string = null;
    private _char: string = null;
    public foreColor = "black";
    public backColor = "white";
    public tag: any = null;

    constructor(
        public row: number,
        public col: number,
        public x: number,
        public y: number,
        public width: number,
        public height: number,
        private fontSize: number,
        private charWidth: number,
        private charHeight: number
    ) {
    }

    public get imagePath() {
        return this._imagePath;
    }

    public set imagePath(path: string) {
        this.fill();

        if (path) {
            image(path, this.x, this.y, this.width, this.height);
            this._imagePath = path;
        }
    }

    public get char() {
        return this._char;
    }

    public set char(char: string) {
        this.fill();

        if (char) {
            text(char[0],
                this.x + this.width / 2 - this.charWidth / 2,
                this.y + this.height / 2 + this.charHeight / 2,
                this.fontSize,
                this.foreColor);
            this._char = char[0];
        }
    }

    public fill(color?: string) {
        if (color)
            this.backColor = color;         // 2.3.1

        if (this.backColor)
            context.fillStyle = this.backColor;

        context.fillRect(this.x, this.y, this.width, this.height);

        this._imagePath = null;
        this._char = null;
    }
}

class Grid {
    private cells: Cell[][] = [];
    public selectedCell: Cell = null;
    public tag: any = null;
    private selectable = true;

    constructor(
        public rows: number,
        public cols: number,
        public x = 0,
        public y = 0,
        public width = canvas.width,
        public height = canvas.height,
        private spacingX = 0,
        private spacingY = 0,
        private isPadded = false,
        private cellWidth: number = null,
        private cellHeight: number = null,
        cellAspectRatio: number = null
    ) {
        if (cellAspectRatio) {
            if (this.cellWidth) {
                this.cellHeight = this.cellWidth / cellAspectRatio;
            }
            else if (this.cellHeight) {
                this.cellWidth = this.cellHeight * cellAspectRatio;
            }
        }

        if (this.cellWidth) {
            if (isPadded) {
                this.width = cols * this.cellWidth + (cols + 1) * spacingX;
            }
            else {
                this.width = cols * this.cellWidth + (cols - 1) * spacingX;
            }
        }
        else {
            if (isPadded) {
                this.cellWidth = (this.width - (cols + 1) * spacingX) / cols;
            }
            else {
                this.cellWidth = (this.width - (cols - 1) * spacingX) / cols;
            }
        }

        if (cellAspectRatio)
            this.cellHeight = this.cellWidth / cellAspectRatio;

        if (this.cellHeight) {
            if (isPadded) {
                this.height = rows * this.cellHeight + (rows + 1) * spacingY;
            }
            else {
                this.height = rows * this.cellHeight + (rows - 1) * spacingY;
            }
        }
        else {
            if (isPadded) {
                this.cellHeight = (this.height - (rows + 1) * spacingY) / rows;
            }
            else {
                this.cellHeight = (this.height - (rows - 1) * spacingY) / rows;
            }
        }

        let fontSize = this.cellHeight;
        let charWidth: number;

        while (true) {
            context.font = fontSize + "px monospace";

            charWidth = context.measureText("X").width;
            if (charWidth <= this.cellWidth)
                break;

            fontSize--;
        }

        let charHeight = charWidth * 4 / 3;

        for (let i = 0; i < rows; i++) {
            this.cells[i] = [];
            for (let j = 0; j < cols; j++) {
                this.cells[i][j] = new Cell(
                    i, j,
                    this.x + j * (this.cellWidth + spacingY) + (isPadded ? spacingX : 0),
                    this.y + i * (this.cellHeight + spacingX) + (isPadded ? spacingY : 0),
                    this.cellWidth, this.cellHeight,
                    fontSize,
                    charWidth, charHeight);
            }
        }
    }

    public get selected(): boolean {
        let selectedRow: number;
        let selectedCol: number;
        this.selectedCell = null;

        if (mouse.primary || touchscreen.touched) {
            if (this.selectable) {
                let x = touchscreen.x;
                let y = touchscreen.y;

                if (mouse.primary) {
                    x = mouse.x;
                    y = mouse.y;
                }

                if ((x - this.x - (this.isPadded ? this.spacingX : 0) + this.cellWidth + this.spacingX) % (this.cellWidth + this.spacingX) < this.cellWidth) {
                    selectedCol = Math.floor((x - this.x) / (this.cellWidth + this.spacingX));
                }
                else {
                    return false;
                }

                if ((y - this.y - (this.isPadded ? this.spacingY : 0) + this.cellHeight + this.spacingY) % (this.cellHeight + this.spacingY) < this.cellHeight) {
                    selectedRow = Math.floor((y - this.y) / (this.cellHeight + this.spacingY));
                }
                else {
                    return false;
                }

                this.selectedCell = this.cell(selectedRow, selectedCol);

                this.selectable = false;
                return true;
            }
            else {
                return false;
            }
        }

        this.selectable = true;
        return false;
    }

    public fill(color?: string) {
        rectangle(this.x, this.y, this.width, this.height, color);
    }

    public fillCells(color?: string) {
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                this.cell(i, j).fill(color);
            }
        }
    }

    public cell(row: number, col: number) {
        return this.cells[row][col];
    }
}


//
// Helper functions
//

function randomInt(start: number, stop: number) {
    return start + Math.floor(Math.random() * (stop - start + 1));
}

function randomChoice(...args: any[]) {
    return args[Math.floor(Math.random() * args.length)];
}

function toRadians(angleDeg: number) {
    return angleDeg * Math.PI / 180;
}

function createColor(red: number, green: number, blue: number, alpha = 1) {
    return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
}

function getColor(x: number, y: number) {
    const data = context.getImageData(x, y, 1, 1).data;

    return { red: data[0], green: data[1], blue: data[2], alpha: data[3] };
}

function distance(x1: number, y1: number, x2: number, y2: number) {
    return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
}

function sleep(msTimeout) {
    return new Promise(resolve => setTimeout(resolve, msTimeout));
}

class Hitbox {
    constructor(
        public x: number,
        public y: number,
        public width: number,
        public height: number
    ) {
    }

    intersects(other: Hitbox): boolean {
        return this.x + this.width > other.x &&
            this.x < other.x + other.width &&
            this.y + this.height > other.y &&
            this.y < other.y + other.height;
    }

    contains(x: number, y: number): boolean {
        return this.x + this.width > x && this.x <= x &&
            this.y + this.height > y && this.y <= y;
    }

    drawOutline(color?: string, lineWidth = 1) {
        rectangle(this.x, this.y, this.width, this.height, color, lineWidth);
    }
}


// 
// Sound
//

let _sounds: HTMLAudioElement[] = [];

function preloadSound(path: string) {
    if (_sounds[path] === undefined) {
        _sounds[path] = new Audio(path);
    }
}

function playSound(path: string, volume: number = 1, loop = false) {
    let play = () => {
        _sounds[path].loop = loop;
        _sounds[path].volume = volume;
        _sounds[path].play();
    };

    if (_sounds[path] === undefined) {
        _sounds[path] = new Audio(path);

        _sounds[path].oncanplaythrough = () => {
            _sounds[path].oncanplaythrough = null;
            play();
        };
    }
    else {
        play();
    }
}

function pauseSound(path: string) {
    if (_sounds[path] instanceof HTMLAudioElement) {
        _sounds[path].pause();
    }
}

function stopSound(path: string) {
    if (_sounds[path] instanceof HTMLAudioElement) {
        _sounds[path].pause();
        _sounds[path].currentTime = 0;
    }
}

function setVolume(path: string, volume: number) {
    if (_sounds[path] instanceof HTMLAudioElement) {
        _sounds[path].volume = volume;
    }
}