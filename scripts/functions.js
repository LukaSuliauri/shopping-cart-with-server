// TODO => Pages FUNCTIONS

const logOut = () => {
    localStorage.removeItem('auth')
    window.location.reload()
}

const register = () => {
    registerModal.show()
}

const authorization = () => {
    authorizationModal.show()
}

const showItems = () => {
    getData(`${baseUrl}/items`)
    .then((items) => {
        let itemsSum = 0
        const itemsTable = items_modal.querySelector('.items-table')
        const auth = JSON.parse(localStorage.getItem("auth"))

        let itemsTemplate = []
        const filteredItems = items.filter((item) => item.cart_id === auth.cart_id)
        if (filteredItems.length) {
            itemsTemplate = filteredItems.map((item) => $item(item))
            itemsSum = items.reduce((acc, item) => acc + (item.quantity * item.price), 0)
            itemsTemplate.unshift($itemHeader({}))
            itemsTemplate.push($itemFooter({sum: itemsSum, cart_id: auth.cart_id}))
            _render(itemsTable, itemsTemplate.join(''))
            itemsModal.show()
        } else {
            itemsModal.hide()
        }
    })
}

const addProduct = (e) => {
    const {productId} = e.target.dataset
    const auth = JSON.parse(localStorage.getItem('auth'))

    // TODO => Find Product in Databases
    getData(`${baseUrl}/items`)
    .then((items) => {
        getData(`${baseUrl}/products/${productId}`)
        .then((product) => {
            const selectedProduct = items.find((item) => item.product_id === product.id && item.cart_id === auth.cart_id)
            if (selectedProduct) {
                const {id, quantity} = selectedProduct
                const updateProductQuantity = {
                    ...selectedProduct,
                    quantity: quantity + 1
                }
                const result = updateData(`${baseUrl}/items/${id}`, updateProductQuantity)
            } else {
                const  item = {
                    id: uid(),
                    cart_id: auth.cart_id,
                    product_id: product.id,
                    title: product.title,
                    price: product.price,
                    icon: product.icon,
                    quantity: 1
                }
                const result = addData(`${baseUrl}/items`, item)
            }
        })
    })


    if (selectedProduct) {
        const updatedItemsList = items.map((item) => {
            if (item.product_id === product.id && item.cart_id === auth.cart_id) return {...item, quantity: item.quantity + 1}
            return item
        })
        localStorage.setItem('items', JSON.stringify(updatedItemsList))
    }

    // TODO => UPDATE CART INFO ATTRIBUTES
    updateCartAttributes()
}

const removeProduct = (e) => {
    if (confirm(`Are you sure you want to Delete this product 📦`)) { 
        const {id} = e.target.dataset
        deleteData(`${baseUrl}/items/${id}`)
        .then((result) => {
            updateCartAttributes()
            showItems()
        })
    }
} 

const updateProductQuantity = (e) => {
    const auth = JSON.parse(localStorage.getItem('auth'))
    const input = e.target 
    const {id} = input.dataset //* item ID
    const value = +input.value //* Quantity Value
    input.disabled = true
    getData(`${baseUrl}/items/${id}`)
    .then ((item) => {
        const updateQuantity = {
            ...item,
            quantity: value
        }
        updateData(`${baseUrl}/items/${id}`, updateQuantity)
        .then((result) => {
            updateCartAttributes()
            showItems()
        })
    })
}

const emptyCart = (e) => {
    if (confirm(`Are you sure you want to Empty Cart 🛒`)) {
        const {cartId} = e.target.dataset
        getData(`${baseUrl}/items`)
        .then ((items) => {
            const filteredItems = items.filter(item => item.cart_id === cartId)
            filteredItems.forEach((item) => {
                deleteData(`${baseUrl}/items/${item.id}`)
            })
            const cartInfo = document.querySelector('.cart-info')
            cartInfo.dataset.itemsCount = `0 ცალი`
            cartInfo.dataset.itemsPrice = `0 ₾`
            itemsModal.hide()
        })
    }
}

const updateCartAttributes = () => {
    const auth = JSON.parse(localStorage.getItem('auth'))
    getData(`${baseUrl}/items`)
    .then((items) => {
        const filteredItems = items.filter((item) => item.cart_id === auth.cart_id)
        itemsCount = filteredItems.reduce((acc, item) => acc + item.quantity, 0)
        itemsPrice = filteredItems.reduce((acc, item) => acc + (item.quantity * item.price), 0)
        const cartInfo = document.querySelector('.cart-info')
        cartInfo.dataset.itemsCount = `${itemsCount} ცალი`
        cartInfo.dataset.itemsPrice = `${itemsPrice} ₾`
    })
}

const updateDomComponent = (data, component) => {
    const {id} = data
    const old = _getById(id)
    old.classList.add('d-none')
    _insertHtml(old, 'beforebegin', component(data))
    old.remove()
}

// TODO => Check all && remove

const toggleCheck = (e) => {
    const cartItems = document.querySelectorAll('.cart-items')
    const button = e.target
    if (button.dataset.action ==='check') {
            cartItems.forEach((item) => {
            item.checked = true
        })
        button.innerHTML = 'მონიშვნის მოხსნა'
        button.dataset.action = 'uncheck'
    } else {
        cartItems.forEach((item) => {
            item.checked = false
        })
        button.innerHTML = 'ყველას მონიშვნა'
        button.dataset.action = 'check'
    }
    
}

const removeChecked = () => {
    if (confirm(`Are you sure you want to Delete this products list 📦`)) { 
        const checkedCartItems = document.querySelectorAll('.cart-items:checked')
        checkedCartItems.forEach((item) => {
            deleteData(`${baseUrl}/items/${item.value}`)
        })
        updateCartAttributes()
        showItems()
    }
}

