const authRow = _getById('auth-row');
const productsRow = _getById('products');

const registerForm = _getById('register-form');
const authorizationForm = _getById('authorization-form');

// TODO => Make Bootstrap Modal
const registerModal = new bootstrap.Modal(_getById('register-modal'), {
    keyboard: false
})
const authorizationModal = new bootstrap.Modal(_getById('authorization-modal'), {
    keyboard: false
})

const items_modal = _getById('items-modal');
const itemsModal = new bootstrap.Modal(items_modal, {
    keyboard: false
})

window.addEventListener('DOMContentLoaded', () => {
    getData(`${baseUrl}/products`)
    .then((products) => {
        _render(productsRow, products.map((product) => $product(product)).join(''))
    })

    getData(`${baseUrl}/items`)
    .then((items) => {
        let itemsCount = 0;
        let itemsPrice = 0;
        if (localStorage.hasOwnProperty('auth')) {
            const auth = JSON.parse(localStorage.getItem('auth'));
            const filteredItems = items.filter((item) => item.cart_id === auth.cart_id)
            itemsCount = filteredItems.reduce((acc, item) => acc + item.quantity, 0);
            itemsPrice = filteredItems.reduce((acc, item) => acc + (item.quantity * item.price), 0);
        }
        _render(authRow, $authBlock({itemsCount, itemsPrice}))
    })
    
})

registerForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const email = registerForm.register_email.value.trim()
    const password = registerForm.register_password.value.trim()
    const repeatPassword = registerForm.register_repeat_password.value.trim()

    if (password !== repeatPassword) {
        alert('password is not matches')
    } else {
        // TODO: Create new user account
        const userID = uid()
        const cartID = uid()
        const user = {
            id: userID,
            email: email,
            password: password,
            cart_id: cartID
        }
        addData(`${baseUrl}/users`, user)
        .then((result) => {
            const cart = {
                id: cartID,
                user_id: user.id
            }
            if (result) {
                addData(`${baseUrl}/carts`, cart)
                .then((result) => {
                    if (result) {
                        delete user.password
                        localStorage.setItem('auth', JSON.stringify(user))
                    }
                    // end then
                })
            }
            // end then
        })

        // TODO => set User Authentication
        // delete user.password
        // localStorage.setItem('auth', JSON.stringify(user))

        // TODO => Clear form && Close Modal
        // registerForm.reset()
        // registerModal.hide()

        // TODO => Reload Page
        // window.location.reload()
    }
})

authorizationForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const email = authorizationForm.authorization_email.value.trim()
    const password = authorizationForm.authorization_password.value.trim()
    getData(`${baseUrl}/users`)
    .then((users) => {
        const authUser = users.find((user) => user.email === email && user.password === password)
        if (authUser) {
            delete authUser.password
            localStorage.setItem('auth', JSON.stringify(authUser))
            // TODO => Clear form && Close Modal
            authorizationForm.reset()
            authorizationModal.hide()
            // TODO => Reload Page
            window.location.reload()

        } else {
            alert('email Or password is incorrect')
        }
    })
})