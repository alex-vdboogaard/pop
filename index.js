function closeAllPop() {
    document.querySelectorAll(".pop").forEach(pop => { pop.remove(); });
}

//this makes the popup move up out of the screen then disappear
function delayedRemove() {
    const popElements = document.querySelectorAll(".pop");
    setTimeout(function () {
        popElements.forEach(pop => {
            pop.style.transition = "margin-top 0.5s ease-out";
            pop.style.marginTop = "-80px";
            pop.addEventListener("transitionend", function () {
                pop.remove();
            }, { once: true });
        });
    }, 3000);
}

//positions: top-right, bottom-right, bottom
export function simplePop(type, message, position = "top") {
    closeAllPop();
    if (type === "success") type = "pop-success"
    else if (type === "error") type = "pop-error"
    else if (type === "warning") type = "pop-warning"
    else if (type === "info") type = "pop-info"

    const body = document.querySelector("body");
    const alert = document.createElement("div");
    alert.classList.add("pop-top", "pop", type);

    switch (type) {
        case "pop-success":
            alert.innerHTML = `<svg class="pop-svg" style="margin-right:15px" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 7L10 17L5 12" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <p>${message}</p>`;
            break;
        case "pop-error":
            alert.innerHTML = `<svg style="margin-right:15px" class="pop-svg" width="90" height="90" viewBox="0 0 90 90" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_2287_12)">
            <path d="M45 0C20.1445 0 0 20.1445 0 45C0 69.8555 20.1445 90 45 90C69.8555 90 90 69.8555 90 45C90 20.1445 69.8555 0 45 0ZM11.25 45C11.25 26.3496 26.3672 11.25 45 11.25C52.4004 11.25 59.2383 13.6582 64.793 17.7012L17.7012 64.793C13.6582 59.2383 11.25 52.4004 11.25 45ZM45 78.75C37.5996 78.75 30.7617 76.3418 25.207 72.2988L72.2988 25.207C76.3418 30.7793 78.75 37.5996 78.75 45C78.75 63.6504 63.6328 78.75 45 78.75Z" fill="white"/>
            </g>
            <defs>
            <clipPath id="clip0_2287_12">
            <rect width="90" height="90" fill="white"/>
            </clipPath>
            </defs>
            </svg><p>${message}</p>`;
            break;
        case "pop-warning":
            alert.innerHTML = `<svg style="margin-right:15px" class="pop-svg" width="100" height="100" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 21L12 2L23 21H1ZM12 18C12.2833 18 12.521 17.904 12.713 17.712C12.905 17.52 13.0007 17.2827 13 17C12.9993 16.7173 12.9033 16.48 12.712 16.288C12.5207 16.096 12.2833 16 12 16C11.7167 16 11.4793 16.096 11.288 16.288C11.0967 16.48 11.0007 16.7173 11 17C10.9993 17.2827 11.0953 17.5203 11.288 17.713C11.4807 17.9057 11.718 18.0013 12 18ZM11 15H13V10H11V15Z" fill="white"/>
            </svg><p>${message}</p>`;
            break;
        case "pop-info":
            alert.innerHTML = `<svg style="margin-right:15px" class="pop-svg" width="100" height="100" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11 17H13V11H11V17ZM12 9C12.2833 9 12.521 8.904 12.713 8.712C12.905 8.52 13.0007 8.28267 13 8C12.9993 7.71733 12.9033 7.48 12.712 7.288C12.5207 7.096 12.2833 7 12 7C11.7167 7 11.4793 7.096 11.288 7.288C11.0967 7.48 11.0007 7.71733 11 8C10.9993 8.28267 11.0953 8.52033 11.288 8.713C11.4807 8.90567 11.718 9.00133 12 9ZM12 22C10.6167 22 9.31667 21.7373 8.1 21.212C6.88334 20.6867 5.825 19.9743 4.925 19.075C4.025 18.1757 3.31267 17.1173 2.788 15.9C2.26333 14.6827 2.00067 13.3827 2 12C1.99933 10.6173 2.262 9.31733 2.788 8.1C3.314 6.88267 4.02633 5.82433 4.925 4.925C5.82367 4.02567 6.882 3.31333 8.1 2.788C9.318 2.26267 10.618 2 12 2C13.382 2 14.682 2.26267 15.9 2.788C17.118 3.31333 18.1763 4.02567 19.075 4.925C19.9737 5.82433 20.6863 6.88267 21.213 8.1C21.7397 9.31733 22.002 10.6173 22 12C21.998 13.3827 21.7353 14.6827 21.212 15.9C20.6887 17.1173 19.9763 18.1757 19.075 19.075C18.1737 19.9743 17.1153 20.687 15.9 21.213C14.6847 21.739 13.3847 22.0013 12 22Z" fill="white"/>
            </svg><p>${message}</p>`;
        default:
            break;
    }

    body.appendChild(alert);

    setTimeout(function () {
        alert.style.transition = "top 0.5s ease-out";
        alert.style.top = "10px";
    }, 100);

    delayedRemove();
}

export async function confirmPop(message) {
    closeAllPop();
    return new Promise((resolve, reject) => {
        const body = document.querySelector("body");
        const alert = document.createElement("div");
        alert.classList.add("pop", "pop-confirm");
        alert.innerHTML = `<p>${message}</p><div class="pop-buttonGroup"><button class="pop-btn pop-cancelButton">Cancel</button><button class="pop-btn pop-yesButton">Yes</button></div>`;
        body.appendChild(alert);

        document.querySelector(".pop-cancelButton").addEventListener("click", () => {
            alert.remove();
            resolve(false);
        });

        document.querySelector(".pop-yesButton").addEventListener("click", () => {
            alert.remove();
            resolve(true);
        });
    });
}

export async function inputPop(message) {
    closeAllPop();
    return new Promise((resolve, reject) => {
        const body = document.querySelector("body");
        const alert = document.createElement("form");
        alert.classList.add("pop-confirm");
        alert.innerHTML = `<p>${message}</p><input required class="pop-input" id="inputText" type="text"><div class="pop-buttonGroup"><button class="pop-btn pop-cancelButton">Cancel</button><button type="submit" class="pop-btn pop-yesButton pop-submitButton">Submit</button></div>`;
        body.appendChild(alert);

        document.querySelector(".pop-cancelButton").addEventListener("click", () => {
            alert.remove();
            resolve(null);
        });

        alert.addEventListener("submit", function (event) {
            event.preventDefault();
            if (this.checkValidity()) {
                const input = document.querySelector("#inputText").value;
                alert.remove();
                resolve(input);
            }
        });
    });
}

export async function inputPops(vals) {
    closeAllPop();
    return new Promise((resolve, reject) => {
        const body = document.querySelector("body");
        const alert = document.createElement("form");
        alert.classList.add("pop-confirm");
        vals.forEach(val => {
            const key = Object.keys(val)[0];
            const message = val[key];
            const inputDiv = document.createElement("div");
            inputDiv.classList.add("inputDiv");
            inputDiv.innerHTML = `<p class="inputPopsText">${message}</p><input required class="pop-input" id="${key}" type="text">`;
            alert.appendChild(inputDiv);
        });
        alert.innerHTML += `<div class="pop-buttonGroup inputPopsButtons"><button class="pop-btn pop-cancelButton">Cancel</button><button type="submit" class="pop-btn pop-yesButton pop-submitButton">Submit</button></div>`;
        body.appendChild(alert);

        document.querySelector(".pop-cancelButton").addEventListener("click", () => {
            alert.remove();
            resolve(null);
        });

        alert.addEventListener("submit", function (event) {
            event.preventDefault();
            if (this.checkValidity()) {
                const inputs = document.querySelectorAll(".pop-input");
                const response = [];
                inputs.forEach(input => {
                    const val = input.value;
                    const key = input.id;
                    response.push({ [key]: val });
                });
                alert.remove();
                resolve(response);
            }
        });
    });
}