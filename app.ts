

let grey = createColor(202, 202, 202, 79);
let diff = 16;

let g = new Grid(diff, diff, 450, 150, 500, 500, "grey", 2, 2);
g.fill("grey");

for (let i = 0; i < diff; i++) {
    for (let j = 0; j < diff; j++) {
        g.cell(i, j).fill(grey);
        g.cell(i, j).tag = 0;
    }
}

for (let i = 0; i < 0; i++) {
    let r;
    let c;
    while (true) {
        r = randomInt(0, diff - 1);
        c = randomInt(0, diff - 1);
        if (g.cell(r, c).imagePath == null) break;
    }
    g.cell(r, c).tag = 100;
}

for (let r = 0; r < diff; r++) {
    for (let c = 0; c < diff; c++) {
        if (g.cell(r, c).tag >= 100) {
            if (r < diff - 1) {
                g.cell(r + 1, c).tag++;
            }
            if (r > 0) {
                g.cell(r - 1, c).tag++;
            }
            if (c < diff - 1) {
                g.cell(r, c + 1).tag++;
            }
            if (c > 0) {
                g.cell(r, c - 1).tag++;
            }
            if (r < diff - 1 && c < diff - 1) {
                g.cell(r + 1, c + 1).tag++;
            }
            if (r < diff - 1 && c > 0) {
                g.cell(r + 1, c - 1).tag++;
            }
            if (r > 0 && c < diff - 1) {
                g.cell(r - 1, c + 1).tag++;
            }
            if (r > 0 && c > 0) {
                g.cell(r - 1, c - 1).tag++;
            }
        }
    }
}



function empty(row, col) {

    for (let r = (row - 1); r <= (row + 1); r++) {
        for (let c = (col - 1); c <= (col + 1); c++) {
            try {

                // Om rutan inte innehåller en bomb och är utan bild
                if (g.cell(r, c).tag < 100 && g.cell(r, c).imagePath == null) {

                    // Sätt bild
                    g.cell(r, c).imagePath = g.cell(r, c).tag + 'p.png'

                    // Om det var en tom ruta
                    // så undersök rutorna runtom den (rekursivt anrop)
                    if (g.cell(r, c).tag == 0)
                        empty(r, c)
                }
            }
            catch (err) {

            }
        }
    }

}

function update() {
    if (g.selected) {
        if (g.selectedCell.tag < 100) {
            g.selectedCell.imagePath = g.selectedCell.tag + "p.png";

            // Om tom ruta
            if (g.selectedCell.tag == 0) {

                // Sätt bild
                g.selectedCell.imagePath = '0p.png'

                // Undersök rutorna runtom den
                empty(g.selectedCell.row, g.selectedCell.col);
            }
        } else {
            g.selectedCell.imagePath = "bomb.jpg";
        }
    }
}
