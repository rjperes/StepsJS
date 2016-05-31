exports.steps = [
    { command: "Navigate", url: "https://www.google.com" },
    { command: "InsertScript", script: "alert('aqui')" },
    { command: "Goto", stepIndex: 8 },
    { command: "Condition", selector: ".xpto", false: { command: "Log", message: "not found" } },
    { command: "Condition", selector: "[name=q]", true: { command: "Log", message: "found" } },
    { command: "SetValue", selector: "[name=q]", property: "value", value: "webdriver" },
    { command: "Click", selector: "[name=btnG]" },
    { command: "Wait", contains: true, title: "webdriver" },
    { command: "FindElement", selector: "div.g" },
    { command: "Stop" }
];