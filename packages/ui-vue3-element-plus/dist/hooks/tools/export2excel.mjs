import { deepClone } from "@bluesyoung/utils";
import { saveAs } from "file-saver";
import { utils, write } from "xlsx";
function sheet_from_array_of_arrays(data) {
  const ws = {};
  const range = {
    s: {
      c: 1e7,
      r: 1e7
    },
    e: {
      c: 0,
      r: 0
    }
  };
  for (let R = 0; R != data.length; ++R) {
    for (let C = 0; C != data[R].length; ++C) {
      if (range.s.r > R)
        range.s.r = R;
      if (range.s.c > C)
        range.s.c = C;
      if (range.e.r < R)
        range.e.r = R;
      if (range.e.c < C)
        range.e.c = C;
      const cell = {
        v: data[R][C]
      };
      if (cell.v == null)
        continue;
      const cell_ref = utils.encode_cell({
        c: C,
        r: R
      });
      if (typeof cell.v === "number") {
        cell.t = "n";
      } else if (typeof cell.v === "boolean") {
        cell.t = "b";
      } else {
        cell.t = "s";
      }
      ws[cell_ref] = cell;
    }
  }
  if (range.s.c < 1e7) {
    ws["!ref"] = utils.encode_range(range);
  }
  return ws;
}
class Workbook {
  SheetNames = [];
  Sheets = {};
}
const s2ab = (s) => {
  const buf = new ArrayBuffer(s.length);
  const view = new Uint8Array(buf);
  for (let i = 0; i < s.length; ++i) {
    view[i] = s.charCodeAt(i) & 255;
  }
  return buf;
};
export const export_json_to_excel = ({ header, data, filename }) => {
  data = deepClone(data);
  data.unshift(header);
  const ws_name = "SheetJS";
  const wb = new Workbook();
  const ws = sheet_from_array_of_arrays(data);
  const colWidth = data.map((row) => {
    return row.map((val) => {
      if (val == null) {
        return {
          wch: 10
        };
      } else if (val.toString().charCodeAt(0) > 255) {
        return {
          wch: val.toString().length * 2
        };
      } else {
        return {
          wch: val.toString().length
        };
      }
    });
  });
  let result = colWidth[0];
  for (let i = 1; i < colWidth.length; i++) {
    for (let j = 0; j < colWidth[i].length; j++) {
      if (result[j]["wch"] < colWidth[i][j]["wch"]) {
        result[j]["wch"] = colWidth[i][j]["wch"];
      }
    }
  }
  ws["!cols"] = result;
  wb.SheetNames.push(ws_name);
  wb.Sheets[ws_name] = ws;
  const wbout = write(wb, {
    bookType: "xlsx",
    bookSST: false,
    type: "binary"
  });
  saveAs(
    new Blob([s2ab(wbout)], {
      type: "application/octet-stream"
    }),
    `${filename}.xlsx`
  );
};
