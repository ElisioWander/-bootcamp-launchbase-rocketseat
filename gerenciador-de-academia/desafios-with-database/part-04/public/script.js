const currentPage = window.location.pathname
const menuItems = document.querySelectorAll("header .links a")

for(let item of menuItems) {
    if(currentPage.includes(item.getAttribute("href"))) {
        item.classList.add('active')
    }
}
function paginate(selectedPage, totalPage) {
    let oldPage,
        pages = []

    for(let currentPage = 1; currentPage <= totalPage; currentPage++) {
        const firstAndLastPage = currentPage == 1 || currentPage == totalPage
        const pagesAfterSelectedPage = currentPage <= selectedPage + 2
        const pagesBeforeSelectedPage = currentPage >= selectedPage - 2
        

        if(firstAndLastPage || pagesAfterSelectedPage && pagesBeforeSelectedPage) {
            if(oldPage && currentPage - oldPage > 2) {
                pages.push("...")
            }

            if(oldPage && currentPage - oldPage == 2) {
                pages.push(oldPage + 1)
            }
            
            pages.push(currentPage)

            oldPage = currentPage
        }
    }

    return pages
}

const pagination = document.querySelector(".pagination")
const page = +pagination.dataset.page
const total = +pagination.dataset.total
const filter = pagination.dataset.filter

const pages = paginate(page, total)

let elements = ""

for (let page of pages) {

    if(String(page).includes("...")) {
        elements += `<span>${page}</span>`
    } else {
        if(filter) {
            elements += `<a href="?page=${page}&filter=${filter}">${page}</a>`
        } else {
            elements += `<a href="?page=${page}">${page}</a>`
        }
    }    
}

pagination.innerHTML = elements

    
    