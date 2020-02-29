console.log("Hello from module");
let name = "Vova";
let introduce = function () {
    console.log("Hello my name is " + name);
};


if(module.parent) {
    console.log("File is connected");
} else {
    console.log("File is invoked");
}