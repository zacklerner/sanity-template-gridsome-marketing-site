function toPlainText(blocks = []) {
  if (blocks !== null) {
    return blocks
      .map(block => {
        if (block._type !== 'block' || !block.children) {
          return ''
        }
        return block.children.map(child => child.text).join('')
      })
      .join('\n\n')
  }
}

export default toPlainText