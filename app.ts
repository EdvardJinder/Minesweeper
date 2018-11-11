let sco = 0

let grey = createColor(202, 202, 202, 79)
let diff = 8

let g = new Grid(diff, diff, 450, 150, 500, 500, 2, 2)
g.fill('grey')

for (let i = 0; i < diff; i++) {
    for (let j = 0; j < diff; j++) {

        g.cell(i, j).fill(grey)
        g.cell(i, j).tag = 0
    }
}

for (let i = 0; i < 10; i++) {
    let r
    let c
    while (true) {
        r = randomInt(0, diff - 1)
        c = randomInt(0, diff - 1)
        if (g.cell(r, c).imagePath == null)
            break
    }
    g.cell(r, c).tag = 100

}

for (let r = 0; r < diff; r++) {
    for (let c = 0; c < diff; c++) {

        if (g.cell(r, c).tag >= 100) {
            if (r < (diff - 1)) { g.cell(r + 1, c).tag++; }
            if (r > 0) { g.cell(r - 1, c).tag++; }
            if (c < (diff - 1)) { g.cell(r, c + 1).tag++; }
            if (c > 0) { g.cell(r, c - 1).tag++; }
            if (r < (diff - 1) && c < (diff - 1)) { g.cell(r + 1, c + 1).tag++; }
            if (r < (diff - 1) && c > 0) { g.cell(r + 1, c - 1).tag++; }
            if (r > 0 && c < (diff - 1)) { g.cell(r - 1, c + 1).tag++; }
            if (r > 0 && c > 0) { g.cell(r - 1, c - 1).tag++; }
        }
    }
}




function update() {
    if (g.selected) {
        if (g.selectedCell.tag < 100) {
            if (g.selectedCell.tag)
                g.selectedCell.imagePath = g.selectedCell.tag + 'p.png'
        }
        else {
            g.selectedCell.imagePath = 'bomb.jpg'
        }



        if (g.selectedCell.imagePath == 'bomb.jpg') {
            image('gao.png', 525, -75, 365, 365)
        }
        if (g.selectedCell.imagePath == '1p.png') {
            sco += 1
        }
        if (g.selectedCell.imagePath == '2p.png') {
            sco += 2
        }
        if (g.selectedCell.imagePath == '3p.png') {
            sco += 3
        }
        if (g.selectedCell.imagePath == '4p.png') {
            sco += 4
        }
        if (g.selectedCell.imagePath == '5p.png') {
            sco += 5
        }

    }
    rectangle(90, 0, 50, 30, 'white')
    text(sco, 100, 20, 26, 'black')

}

