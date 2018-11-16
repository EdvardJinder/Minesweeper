let sco = 0;
let grey = createColor(202, 202, 202, 79);
let diff = 24;
let g = new Grid(diff, diff, 450, 150, 500, 500, "grey", 2, 2);
g.fill("grey");
for (let i = 0; i < diff; i++) {
    for (let j = 0; j < diff; j++) {
        g.cell(i, j).fill(grey);
        g.cell(i, j).tag = 0;
    }
}
for (let i = 0; i < 99; i++) {
    let r;
    let c;
    while (true) {
        r = randomInt(0, diff - 1);
        c = randomInt(0, diff - 1);
        if (g.cell(r, c).imagePath == null)
            break;
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
function empty() {
    let r = g.selectedCell.row;
    let c = g.selectedCell.col;
    if (g.cell(r - 1, c).tag < 100) {
        g.cell(r - 1, c).imagePath = g.cell(r - 1, c).tag + "p.png";
    }
    if (g.cell(r - 1, c - 1).tag < 100) {
        g.cell(r - 1, c - 1).imagePath = g.cell(r - 1, c - 1).tag + "p.png";
    }
    if (g.cell(r - 1, c + 1).tag < 100) {
        g.cell(r - 1, c + 1).imagePath = g.cell(r - 1, c + 1).tag + "p.png";
    }
    if (g.cell(r + 1, c).tag < 100) {
        g.cell(r + 1, c).imagePath = g.cell(r + 1, c).tag + "p.png";
    }
    if (g.cell(r + 1, c - 1).tag < 100) {
        g.cell(r + 1, c - 1).imagePath = g.cell(r + 1, c - 1).tag + "p.png";
    }
    if (g.cell(r + 1, c + 1).tag < 100) {
        g.cell(r + 1, c + 1).imagePath = g.cell(r + 1, c + 1).tag + "p.png";
    }
    if (g.cell(r, c - 1).tag < 100) {
        g.cell(r, c - 1).imagePath = g.cell(r, c - 1).tag + "p.png";
    }
    if (g.cell(r, c + 1).tag < 100) {
        g.cell(r, c + 1).imagePath = g.cell(r, c + 1).tag + "p.png";
    }
    //   if (g.cell(r - 1, c).tag == 0) {
    //     let r = (g.selectedCell.row -= 1);
    //     if (g.cell(r - 1, c).tag < 100) {
    //       g.cell(r - 1, c).imagePath = g.cell(r - 1, c).tag + "p.png";
    //     }
    //     if (g.cell(r - 1, c - 1).tag < 100) {
    //       g.cell(r - 1, c - 1).imagePath = g.cell(r - 1, c - 1).tag + "p.png";
    //     }
    //     if (g.cell(r - 1, c + 1).tag < 100) {
    //       g.cell(r - 1, c + 1).imagePath = g.cell(r - 1, c + 1).tag + "p.png";
    //     }
    //     if (g.cell(r + 1, c).tag < 100) {
    //       g.cell(r + 1, c).imagePath = g.cell(r + 1, c).tag + "p.png";
    //     }
    //     if (g.cell(r + 1, c - 1).tag < 100) {
    //       g.cell(r + 1, c - 1).imagePath = g.cell(r + 1, c - 1).tag + "p.png";
    //     }
    //     if (g.cell(r + 1, c + 1).tag < 100) {
    //       g.cell(r + 1, c + 1).imagePath = g.cell(r + 1, c + 1).tag + "p.png";
    //     }
    //     if (g.cell(r, c - 1).tag < 100) {
    //       g.cell(r, c - 1).imagePath = g.cell(r, c - 1).tag + "p.png";
    //     }
    //     if (g.cell(r, c + 1).tag < 100) {
    //       g.cell(r, c + 1).imagePath = g.cell(r, c + 1).tag + "p.png";
    //     }
    //     if (g.selectedCell.tag == 0) {
    //       return empty();
    //     }
    //   }
    //   if (g.cell(r - 1, c - 1).tag == 0) {
    //     let r = (g.selectedCell.row -= 1);
    //     let c = (g.selectedCell.col -= 1);
    //     if (g.cell(r - 1, c).tag < 100) {
    //       g.cell(r - 1, c).imagePath = g.cell(r - 1, c).tag + "p.png";
    //     }
    //     if (g.cell(r - 1, c - 1).tag < 100) {
    //       g.cell(r - 1, c - 1).imagePath = g.cell(r - 1, c - 1).tag + "p.png";
    //     }
    //     if (g.cell(r - 1, c + 1).tag < 100) {
    //       g.cell(r - 1, c + 1).imagePath = g.cell(r - 1, c + 1).tag + "p.png";
    //     }
    //     if (g.cell(r + 1, c).tag < 100) {
    //       g.cell(r + 1, c).imagePath = g.cell(r + 1, c).tag + "p.png";
    //     }
    //     if (g.cell(r + 1, c - 1).tag < 100) {
    //       g.cell(r + 1, c - 1).imagePath = g.cell(r + 1, c - 1).tag + "p.png";
    //     }
    //     if (g.cell(r + 1, c + 1).tag < 100) {
    //       g.cell(r + 1, c + 1).imagePath = g.cell(r + 1, c + 1).tag + "p.png";
    //     }
    //     if (g.cell(r, c - 1).tag < 100) {
    //       g.cell(r, c - 1).imagePath = g.cell(r, c - 1).tag + "p.png";
    //     }
    //     if (g.cell(r, c + 1).tag < 100) {
    //       g.cell(r, c + 1).imagePath = g.cell(r, c + 1).tag + "p.png";
    //     }
    //     return empty();
    //   }
    //   if (g.cell(r - 1, c + 1).tag == 0) {
    //     let r = (g.selectedCell.row -= 1);
    //     let c = (g.selectedCell.col += 1);
    //     if (g.cell(r - 1, c).tag < 100) {
    //       g.cell(r - 1, c).imagePath = g.cell(r - 1, c).tag + "p.png";
    //     }
    //     if (g.cell(r - 1, c - 1).tag < 100) {
    //       g.cell(r - 1, c - 1).imagePath = g.cell(r - 1, c - 1).tag + "p.png";
    //     }
    //     if (g.cell(r - 1, c + 1).tag < 100) {
    //       g.cell(r - 1, c + 1).imagePath = g.cell(r - 1, c + 1).tag + "p.png";
    //     }
    //     if (g.cell(r + 1, c).tag < 100) {
    //       g.cell(r + 1, c).imagePath = g.cell(r + 1, c).tag + "p.png";
    //     }
    //     if (g.cell(r + 1, c - 1).tag < 100) {
    //       g.cell(r + 1, c - 1).imagePath = g.cell(r + 1, c - 1).tag + "p.png";
    //     }
    //     if (g.cell(r + 1, c + 1).tag < 100) {
    //       g.cell(r + 1, c + 1).imagePath = g.cell(r + 1, c + 1).tag + "p.png";
    //     }
    //     if (g.cell(r, c - 1).tag < 100) {
    //       g.cell(r, c - 1).imagePath = g.cell(r, c - 1).tag + "p.png";
    //     }
    //     if (g.cell(r, c + 1).tag < 100) {
    //       g.cell(r, c + 1).imagePath = g.cell(r, c + 1).tag + "p.png";
    //     }
    //     if (g.selectedCell.tag == 0) {
    //       return empty();
    //     }
    //   }
    //   if (g.cell(r + 1, c + 1).tag == 0) {
    //     let r = (g.selectedCell.row += 1);
    //     let c = (g.selectedCell.col += 1);
    //     if (g.cell(r - 1, c).tag < 100) {
    //       g.cell(r - 1, c).imagePath = g.cell(r - 1, c).tag + "p.png";
    //     }
    //     if (g.cell(r - 1, c - 1).tag < 100) {
    //       g.cell(r - 1, c - 1).imagePath = g.cell(r - 1, c - 1).tag + "p.png";
    //     }
    //     if (g.cell(r - 1, c + 1).tag < 100) {
    //       g.cell(r - 1, c + 1).imagePath = g.cell(r - 1, c + 1).tag + "p.png";
    //     }
    //     if (g.cell(r + 1, c).tag < 100) {
    //       g.cell(r + 1, c).imagePath = g.cell(r + 1, c).tag + "p.png";
    //     }
    //     if (g.cell(r + 1, c - 1).tag < 100) {
    //       g.cell(r + 1, c - 1).imagePath = g.cell(r + 1, c - 1).tag + "p.png";
    //     }
    //     if (g.cell(r + 1, c + 1).tag < 100) {
    //       g.cell(r + 1, c + 1).imagePath = g.cell(r + 1, c + 1).tag + "p.png";
    //     }
    //     if (g.cell(r, c - 1).tag < 100) {
    //       g.cell(r, c - 1).imagePath = g.cell(r, c - 1).tag + "p.png";
    //     }
    //     if (g.cell(r, c + 1).tag < 100) {
    //       g.cell(r, c + 1).imagePath = g.cell(r, c + 1).tag + "p.png";
    //     }
    //     if (g.selectedCell.tag == 0) {
    //       return empty();
    //     }
    //   }
    //   if (g.cell(r + 1, c - 1).tag == 0) {
    //     let r = (g.selectedCell.row += 1);
    //     let c = (g.selectedCell.col -= 1);
    //     if (g.cell(r - 1, c).tag < 100) {
    //       g.cell(r - 1, c).imagePath = g.cell(r - 1, c).tag + "p.png";
    //     }
    //     if (g.cell(r - 1, c - 1).tag < 100) {
    //       g.cell(r - 1, c - 1).imagePath = g.cell(r - 1, c - 1).tag + "p.png";
    //     }
    //     if (g.cell(r - 1, c + 1).tag < 100) {
    //       g.cell(r - 1, c + 1).imagePath = g.cell(r - 1, c + 1).tag + "p.png";
    //     }
    //     if (g.cell(r + 1, c).tag < 100) {
    //       g.cell(r + 1, c).imagePath = g.cell(r + 1, c).tag + "p.png";
    //     }
    //     if (g.cell(r + 1, c - 1).tag < 100) {
    //       g.cell(r + 1, c - 1).imagePath = g.cell(r + 1, c - 1).tag + "p.png";
    //     }
    //     if (g.cell(r + 1, c + 1).tag < 100) {
    //       g.cell(r + 1, c + 1).imagePath = g.cell(r + 1, c + 1).tag + "p.png";
    //     }
    //     if (g.cell(r, c - 1).tag < 100) {
    //       g.cell(r, c - 1).imagePath = g.cell(r, c - 1).tag + "p.png";
    //     }
    //     if (g.cell(r, c + 1).tag < 100) {
    //       g.cell(r, c + 1).imagePath = g.cell(r, c + 1).tag + "p.png";
    //     }
    //     if (g.selectedCell.tag == 0) {
    //       return empty();
    //     }
    //   }
    //   if (g.cell(r + 1, c).tag == 0) {
    //     let r = (g.selectedCell.row += 1);
    //     if (g.cell(r - 1, c).tag < 100) {
    //       g.cell(r - 1, c).imagePath = g.cell(r - 1, c).tag + "p.png";
    //     }
    //     if (g.cell(r - 1, c - 1).tag < 100) {
    //       g.cell(r - 1, c - 1).imagePath = g.cell(r - 1, c - 1).tag + "p.png";
    //     }
    //     if (g.cell(r - 1, c + 1).tag < 100) {
    //       g.cell(r - 1, c + 1).imagePath = g.cell(r - 1, c + 1).tag + "p.png";
    //     }
    //     if (g.cell(r + 1, c).tag < 100) {
    //       g.cell(r + 1, c).imagePath = g.cell(r + 1, c).tag + "p.png";
    //     }
    //     if (g.cell(r + 1, c - 1).tag < 100) {
    //       g.cell(r + 1, c - 1).imagePath = g.cell(r + 1, c - 1).tag + "p.png";
    //     }
    //     if (g.cell(r + 1, c + 1).tag < 100) {
    //       g.cell(r + 1, c + 1).imagePath = g.cell(r + 1, c + 1).tag + "p.png";
    //     }
    //     if (g.cell(r, c - 1).tag < 100) {
    //       g.cell(r, c - 1).imagePath = g.cell(r, c - 1).tag + "p.png";
    //     }
    //     if (g.cell(r, c + 1).tag < 100) {
    //       g.cell(r, c + 1).imagePath = g.cell(r, c + 1).tag + "p.png";
    //     }
    //     if (g.selectedCell.tag == 0) {
    //       return empty();
    //     }
    //   }
    //   if (g.cell(r, c - 1).tag == 0) {
    //     let c = (g.selectedCell.col -= 1);
    //     if (g.cell(r - 1, c).tag < 100) {
    //       g.cell(r - 1, c).imagePath = g.cell(r - 1, c).tag + "p.png";
    //     }
    //     if (g.cell(r - 1, c - 1).tag < 100) {
    //       g.cell(r - 1, c - 1).imagePath = g.cell(r - 1, c - 1).tag + "p.png";
    //     }
    //     if (g.cell(r - 1, c + 1).tag < 100) {
    //       g.cell(r - 1, c + 1).imagePath = g.cell(r - 1, c + 1).tag + "p.png";
    //     }
    //     if (g.cell(r + 1, c).tag < 100) {
    //       g.cell(r + 1, c).imagePath = g.cell(r + 1, c).tag + "p.png";
    //     }
    //     if (g.cell(r + 1, c - 1).tag < 100) {
    //       g.cell(r + 1, c - 1).imagePath = g.cell(r + 1, c - 1).tag + "p.png";
    //     }
    //     if (g.cell(r + 1, c + 1).tag < 100) {
    //       g.cell(r + 1, c + 1).imagePath = g.cell(r + 1, c + 1).tag + "p.png";
    //     }
    //     if (g.cell(r, c - 1).tag < 100) {
    //       g.cell(r, c - 1).imagePath = g.cell(r, c - 1).tag + "p.png";
    //     }
    //     if (g.cell(r, c + 1).tag < 100) {
    //       g.cell(r, c + 1).imagePath = g.cell(r, c + 1).tag + "p.png";
    //     }
    //     if (g.selectedCell.tag == 0) {
    //       return empty();
    //     }
    //   }
    //   if (g.cell(r, c + 1).tag == 0) {
    //     let c = (g.selectedCell.col += 1);
    //     if (g.cell(r - 1, c).tag < 100) {
    //       g.cell(r - 1, c).imagePath = g.cell(r - 1, c).tag + "p.png";
    //     }
    //     if (g.cell(r - 1, c - 1).tag < 100) {
    //       g.cell(r - 1, c - 1).imagePath = g.cell(r - 1, c - 1).tag + "p.png";
    //     }
    //     if (g.cell(r - 1, c + 1).tag < 100) {
    //       g.cell(r - 1, c + 1).imagePath = g.cell(r - 1, c + 1).tag + "p.png";
    //     }
    //     if (g.cell(r + 1, c).tag < 100) {
    //       g.cell(r + 1, c).imagePath = g.cell(r + 1, c).tag + "p.png";
    //     }
    //     if (g.cell(r + 1, c - 1).tag < 100) {
    //       g.cell(r + 1, c - 1).imagePath = g.cell(r + 1, c - 1).tag + "p.png";
    //     }
    //     if (g.cell(r + 1, c + 1).tag < 100) {
    //       g.cell(r + 1, c + 1).imagePath = g.cell(r + 1, c + 1).tag + "p.png";
    //     }
    //     if (g.cell(r, c - 1).tag < 100) {
    //       g.cell(r, c - 1).imagePath = g.cell(r, c - 1).tag + "p.png";
    //     }
    //     if (g.cell(r, c + 1).tag < 100) {
    //       g.cell(r, c + 1).imagePath = g.cell(r, c + 1).tag + "p.png";
    //     }
    //     if (g.selectedCell.tag == 0) {
    //       return empty();
    //     }
    //   }
}
function update() {
    if (g.selected) {
        if (g.selectedCell.tag < 100) {
            g.selectedCell.imagePath = g.selectedCell.tag + "p.png";
            if (g.selectedCell.tag == 0) {
                return empty();
            }
        }
        else {
            g.selectedCell.imagePath = "bomb.jpg";
        }
    }
}
//# sourceMappingURL=app.js.map