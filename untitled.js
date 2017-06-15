var data = {
  "tag": "div",
  "content": [{
    "tag": "span",
    "attributes": {
      "style": "color: red"
    },
    "content": [
      { "text": "Enter value:" }
    ]
  }, {
    "tag": "input",
    "attributes": {
      "type": "text",
      "value": "test",
      "style": "color: green"
    }
  }]
};


for(let el of data){
  console.log(el);
}
