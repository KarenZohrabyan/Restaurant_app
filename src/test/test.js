const express = require("express")

beforeEach(() => {
    console.log('Testing ...')
})

afterEach(() => {
    console.log('End ...')
})


test("should run the server", async () => {
    const app = express();
    app.listen(3000, () => {
        console.log('Server is runing');
    })
});