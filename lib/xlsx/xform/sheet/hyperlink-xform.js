const BaseXform = require('../base-xform');

class HyperlinkXform extends BaseXform {
  get tag() {
    return 'hyperlink';
  }

  render(xmlStream, model) {
    if (this.isInternalLink(model)) {
      // Remove '#' example #sheet1!A1 -> sheet1!A1
      model.target = model.target ? model.target.slice(1) : model.target;
      xmlStream.leafNode('hyperlink', {
        ref: model.address,
        // 'r:id': model.rId, // Internal hyperlink don't need 'r:id', it's enough to have location
        tooltip: model.tooltip,
        location: model.target,
        display: model.tooltip, // TODO: For the time being, this is compatible with google sheet. https://www.google.cn/sheets/about/
      });
    } else {
      xmlStream.leafNode('hyperlink', {
        ref: model.address,
        'r:id': model.rId,
        tooltip: model.tooltip,
      });
    }
  }

  parseOpen(node) {
    if (node.name === 'hyperlink') {
      this.model = {
        address: node.attributes.ref,
        rId: node.attributes['r:id'],
        tooltip: node.attributes.tooltip,
      };

      // This is an internal link
      if (node.attributes.location) {
        this.model.target = node.attributes.location;
      }
      return true;
    }
    return false;
  }

  parseText() {}

  parseClose() {
    return false;
  }

  /**
   * @desc example Sheet2!D3  Sheet2!D3:E3  D3:E3
   * @returns
   */
  isInternalLink(model) {
    // @example: Sheet2!D3, return true
    // return model.target && /^[^!]+![a-zA-Z]+[\d]+$/.test(model.target);

    // Using regular expressions is not enough to cover all cases like the one below,
    // An example of the xlsx library, which is also generic
    // https://docs.sheetjs.com/docs/csf/features/hyperlinks#internal-links
    // ws["C1"].l = { Target: "#SheetJSDN", Tooltip: "Defined Name" };
    // wb.Workbook = {
    //   Names: [{Name: "SheetJSDN", Ref:"Sheet2!A1:B2"}]
    // }
    // an example of the xlsx library, so instead pass '#' manually to determine if it is an internal hyperlink.
    return model.target && model.target.slice(0, 1) === '#';
  }
}

module.exports = HyperlinkXform;
