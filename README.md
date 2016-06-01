# StepsJS

A JavaScript framework for Selenium WebDriver automation

    { command: "Navigate", url: "https://www.google.com" },
    { command: "SetValue", selector: "[name=q]", property: "value", value: "webdriver" },
    { command: "Click", selector: "[name=btnG]" },
    { command: "Wait", contains: true, title: "webdriver" },
    { command: "TakeScreenshot", filename: "/webdriver - results.jpg" },
    { command: "Stop", id: "End", message: "Finished" }