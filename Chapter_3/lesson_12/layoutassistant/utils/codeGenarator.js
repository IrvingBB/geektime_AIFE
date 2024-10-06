const registeriedComponents = [];

const typeToComponents = {
    "0": "Opbar", // 0
    "3": "Seckill", // 1
    "1": "Banner",
    "2": "Item"
}

const createImportTemplate = (component) => {
    return `import ${component} from './components/${component}'
    `;
}

// {top:"200px",left:"800px",width:"200px",height:"70px"}
const createBodyTemplate = (componenet, style) => {
    return `<${componenet} position={${style}}/>
    `;
}

const createHeaderTemplate = (importTemplate) => {
    return `import './App.css';
    ${importTemplate}
    function App() {
      return (
        <div className="App">
    `
}

const createFooterTemplate = () => {
    return `
        </div>
        );
        }
    
    export default App;
    `
}


const codeGen = (layout) => {
    let importHTML = '';
    let bodyHTML = '';
    for (let i = 0; i < layout.length; i++) {
        let cur = layout[i];
        if (!registeriedComponents.includes(cur.type)) {
            importHTML += createImportTemplate(typeToComponents[cur.type]);
            registeriedComponents.push(cur.type);
        }
        const tempStyle = { left: parseInt(cur.left)-parseInt(cur.width)/2, top: parseInt(cur.top)-parseInt(cur.height)/2, width: parseInt(cur.width), height: parseInt(cur.height) }
        bodyHTML += createBodyTemplate(typeToComponents[cur.type], JSON.stringify(tempStyle));
    }
    console.log(importHTM, bodyHTML, layout);
    return `${createHeaderTemplate(importHTML)}
    ${bodyHTML}
    ${createFooterTemplate()}
    `
}


module.exports = {
    codeGen
}
