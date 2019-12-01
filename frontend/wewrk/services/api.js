const axios = require("axios");

const myAPI = axios.create({
    baseURL: 'http://localhost:9001/'
});

async function testFunction() {
    let data = await myAPI.get("example");
    // console.log(data.data); // Will console log correctly
    return await data.data;
}



console.log(testFunction()); // Will never show console log correctly, will show promise pending

let testResult = testFunction();
testResult.then((res) => {
    console.log(res); //Will console log correctly
})

//Reason I don't use await here in the top level function, is because I can't set the top level to be async.