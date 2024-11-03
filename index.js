import pops from "node_modules/pop-message/index.js";
document.querySelector("#simpleSuccess").addEventListener("click", () => {
    const successMessage = document.querySelector(
        "#simplePopTextSuccess"
    ).value;
    if (successMessage) {
        pops.simplePop("success", successMessage);
    } else pops.simplePop("success", "Welcome to my website!");
});
document.querySelector("#simpleError").addEventListener("click", () => {
    const errorMessage = document.querySelector("#simplePopTextError").value;
    if (errorMessage) {
        pops.simplePop("error", errorMessage);
    } else pops.simplePop("error", "An error occurred");
});
document.querySelector("#confirm").addEventListener("click", async () => {
    const confirmMessage = document.querySelector("#confirmText").value;
    let bool;
    if (confirmMessage) {
        bool = await pops.confirmPop(confirmMessage);
    } else {
        bool = await pops.confirmPop("Are you sure you want to delete?");
    }
    if (bool) {
        pops.simplePop(
            "success",
            "The user confirmed, 'true' was returned to the function"
        );
    } else {
        pops.simplePop(
            "error",
            "The user cancelled, 'false' was returned to the function"
        );
    }
});
document.querySelector("#input1").addEventListener("click", async () => {
    const inputMessage = document.querySelector("#inputForm1").value;
    let input;
    if (inputMessage) {
        input = await pops.inputPop(inputMessage);
    } else {
        input = await pops.inputPop("What's your name?");
    }
    if (input) {
        pops.simplePop("success", `"${input}" was returned to the variable`);
    } else {
        pops.simplePop("error", `"${input}" was returned to the variable`);
    }
});
document.querySelector("#input2").addEventListener("click", async () => {
    let inputMessage = document.querySelector("#inputForm2").value;
    let input;
    if (inputMessage) {
        inputMessage = JSON.parse(inputMessage);
        input = await inputPops(inputMessage);
    } else {
        input = await inputPops([
            { name: "What's your name?" },
            { surname: "Surname?" },
        ]);
    }
    if (input) {
        let res = "[";
        input.forEach((val) => {
            res +=
                "{" +
                Object.keys(val)[0] +
                " : " +
                val[Object.keys(val)[0]] +
                "} ,";
        });
        res = res.slice(0, -2);
        res += "]";
        pops.simplePop("success", `"${res}" was returned to the variable`);
    } else {
        pops.simplePop("error", `"${input}" was returned to the variable`);
    }
});
//live preview:
const sandboxPreview1 = document.getElementById("sandboxPreview1");
const sandboxPreview2 = document.getElementById("sandboxPreview2");
const sandboxPreview3 = document.getElementById("sandboxPreview3");
const sandboxPreview4 = document.getElementById("sandboxPreview4");
const sandboxPreview5 = document.getElementById("sandboxPreview5");

const successInput = document.getElementById("simplePopTextSuccess");
const errorInput = document.getElementById("simplePopTextError");
const confirmInput = document.getElementById("confirmText");
const inputInput = document.getElementById("inputForm1");
const multipleInput = document.getElementById("inputForm2");

function updatePreview() {
    const successInput = document.getElementById("simplePopTextSuccess").value;
    const errorInput = document.getElementById("simplePopTextError").value;
    const confirmInput = document.getElementById("confirmText").value;
    const inputInput = document.getElementById("inputForm1").value;
    const multipleInput = document.getElementById("inputForm2").value;

    sandboxPreview1.innerText = `pops.simplePop("success", "${successInput}")`;
    sandboxPreview2.innerText = `pops.simplePop("error", "${errorInput}")`;
    sandboxPreview3.innerText = `const bool = await pops.confirmPop("${confirmInput}")`;
    sandboxPreview4.innerText = `const input = await pops.inputPop("${inputInput}")`;
    sandboxPreview5.innerText = `const multipleInput = await inputPops("${multipleInput}")`;
}

successInput.addEventListener("input", updatePreview);
errorInput.addEventListener("input", updatePreview);
confirmInput.addEventListener("input", updatePreview);
inputInput.addEventListener("input", updatePreview);
multipleInput.addEventListener("input", updatePreview);
updatePreview();
sandboxPreview5.innerText = `const multipleInput = await inputPops([{"name":"What's your name?"}, {"surname":"Surname?"}])`;
