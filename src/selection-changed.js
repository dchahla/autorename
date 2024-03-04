// let's get a hold on the Sketch API
const sketch = require('sketch')

// we will also need a function to transform an NSArray into a proper JavaScript array
// the `util` package contains such a function so let's just use it.
const { toArray } = require('util')

// ### Defining The Action Handler
//
// In the manifest, we told Sketch that every time the `SelectionChanged` action finishes, we want it
// to run the onSelectionChanged handler in our `selection-changed.js` script file.
//
// So now we need to put some code into the `selection-changed.js` file to define that handler and make it do something useful.

export function onSelectionChanged (context) {
  // ### Extracting Context Information
  // Whenever sketch calls a handler in one of our plugins, it passes in a single context argument.
  // This dictionary is our connection with Sketch itself, and contains all the information that
  // we need to work out which document was open, perform whatever task we want to on it, and so on.
  //
  // When we're being called in response to an action occurring, the context will contain
  // an actionContext property with additional information about the action, so that's the first
  // thing that we want to retrieve:
  const doc = sketch.getSelectedDocument()
  const pages = doc.pages
  const selectedLayersContext = doc.selectedLayers

  const action = context.actionContext

  // The context information for each action will be different. For the SelectionChanged action,
  // we are passed three interesting values: which document the selection has changed in,
  // what the old selection was, what the new selection is (or will be).

  // For our purposes, we can ignore the old selection, but we need the other two values.

  // let's wrap the native document
  const document = sketch.fromNative(action.document)
  // and transform the NSArray that is `newSelection` into a proper array
  const selection = toArray(action.newSelection)
  selection.forEach(layer => {
    // console.log(layer)
    // if (layer.isKindOfClass(MSTextLayer)) {
    // //   const text = layer.stringValue()
    //   console.log('onSelectionChanged - Text Content:', layer.stringValue())
    //   //   layer.onGroup = function (group) {
    //   //     group.name = layer.stringValue()
    //   //     sketch.UI.message(`Group renamed to ${group.name}`, document)
    //   //   }

    //   // Text Content: Favorties
    //   // Text Content: Recents

    //   // Text Content: Most visited
    // }
    if (layer.isKindOfClass(MSLayerGroup)) {
      if (selectedLayersContext.length != 0) {
        selectedLayersContext.forEach(layer => {
          if (layer.layers && layer.layers.length) {
            const firstText = getFirstTextElement(layer.layers.reverse())
            if (firstText && firstText.text) layer.name = firstText.text
          }
        })
      }
      //   pages.forEach(page => {
      //     page.layers.forEach(layer => {
      //       console.log(
      //         getSelectedLayers(JSON.stringify(layer)),
      //         Object.keys(layer)
      //       )
      //       let g = getSelectedLayers(JSON.stringify(layer))
      //       g.name = 'Artboard'
      //       //   if (layer.type === 'Artboard') {
      //       //     layer.onInsertLayers = function () {
      //       //       logSelectedLayers(layer.layers)
      //       //       console.log('layer.layers')
      //       //     }
      //       //   }
      //     })
      //   })
    } else {
      return
    }
  })
  // Now for the meat of the plugin. What we want it to do is to show a small message at the bottom
  // of the canvas, showing how many items the user has selected. If there are no items, the message
  // area should be hidden.

  // So first let's get the selection count.
  const count = selection.length
  if (count === 0) {
    sketch.UI.message('No layers selected', document)
  } else {
    // If one or more items are selected, we want to show a message.
    // We check for a single item and handle that as a special case so that we can get the wording correct.

    const message =
      count === 1 ? '1 layer selected' : `${count} layers selected`

    sketch.UI.message(message, document)
  }
}

function getFirstTextElement (array) {
  return array.reduce((acc, cur) => {
    if (acc) {
      return acc
    }
    return cur.type === 'Text' ? cur : null
  }, null)
}
