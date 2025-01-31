'use strict';

const PageBreaksXform = require('./page-breaks-xform');

const ListXform = require('../list-xform');

class ColBreaksXform extends ListXform {
  constructor() {
    const options = {
      tag: 'colBreaks',
      count: true,
      childXform: new PageBreaksXform(),
    };
    super(options);
  }

  // get tag() { return 'colBreaks'; }

  render(xmlStream, model) {
    if (model && model.length) {
      xmlStream.openNode(this.tag, this.$);
      if (this.count) {
        xmlStream.addAttribute(this.$count, model.length);
        xmlStream.addAttribute('manualBreakCount', model.length);
      }

      const {childXform} = this;
      model.forEach(childModel => {
        childXform.render(xmlStream, childModel);
      });

      xmlStream.closeNode();
    } else if (this.empty) {
      xmlStream.leafNode(this.tag);
    }
  }
}

module.exports = ColBreaksXform;
