The command-line tool converts hex colour to clarify the colour name

# <code>Install</code>

```shell
npm i -g hex2name
```

# <code>Usage</code>

```shell
hex2name #000000
```
```shell
# Result
"C:\Program Files\nodejs\hex2name.cmd" #ff00ff
--- Tailwind ---
"magentaFuchsia": "#ff00ff"
---
magentaFuchsia
--- React Material UI ---
declare module "@mui/material/styles" {
  interface Palette {
    magentaFuchsia: Palette["primary"];
  }
  interface PaletteOptions {
    magentaFuchsia: PaletteOptions["primary"];
  }
}
---
"magentaFuchsia": {
  "main": "#ff00ff"
}
---
magentaFuchsia.main

Process finished with exit code 0

```
```shell
# Result
"C:\Program Files\nodejs\hex2name.cmd" #000000
--- Tailwind ---
import colors from "tailwindcss/colors"
colors.black
--- React Material UI ---
import { common } from "@mui/material/colors";
common["black"]

Process finished with exit code 0
```
