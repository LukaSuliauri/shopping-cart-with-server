const $alert = (_) => {
  const {status, message} = _
  return `<div class="alert alert-${status}" role="alert">
              ${message}
          </div>`
}

const $button = (_) => {
  const {type, text} = _
  return `<button type="button" class="btn btn-${type}">${text}</button>`
}

const $product = (_) => {
  const {id, title, price, icon} = _
  const addCartButton = `<button type="button" class="btn btn-primary float-end" data-product-id="${id}" onclick="addProduct(event)">
                            <i class="fa-solid fa-cart-plus"></i>
                        </button>`

  return `<div class="col-lg-4 col-md-2 mb-4" id="${id}">
              <div class="card">
                    <div class="card-header">
                      <img src="images/products/${icon}" class="card-img-top" alt="..." />
                    </div>
                    <div class="card-body">
                      <h3 class="card-title">${title}</h3>
                    </div>
                    <div class="card-footer">
                      <div class="row align-items-center">
                        <div class="col-6">
                          <span class="fw-bold">${price}</span> ₾
                        </div>
                        <div class="col-6">
                          ${ localStorage.hasOwnProperty("auth") ? addCartButton : '' }
                        </div>
                      </div>
                    </div>
                  </div>
              </div>`
}

const $item = (_) => {
    const {id, title, price, icon, quantity } = _

    return `<tr id="${id}">
                <td>
                  <input class="form-check-input cart-items" type="checkbox" value="${id}" />
                </td>
                <td>
                  <img src="images/products/${icon}" class="img-thumbnail w-100" alt="" />
                </td>
                <td class="w-50">
                  <span class="text-muted">${title}</span>
                </td>
                <td>
                  <input type="number" class="form-control" min="1" value="${quantity}" data-id="${id}" onchange="updateProductQuantity(event)" />
                </td>
                <td>
                  <span class="text-muted">${price}</span>
                </td>
                <td>
                  <span class="text-muted">${price * quantity} ₾</span>
                </td>
                <td>
                  <button type="button" class="btn btn-danger" data-id="${id}" onclick="removeProduct(event)">
                    <i class="fa-solid fa-trash-can"></i>
                  </button>
                </td>
          </tr>`
}

const $itemHeader = (_) => {

  return`<tr>
          <td class="w-25">
            <button type="button" class="btn btn-info" style="font-size:0.75rem;" onclick="toggleCheck(event)" data-action="check">ყველას მონიშვნა</button>
          </td>
          <td>
            <span class="text-muted fw-bold">პოსტერი</span>
          </td>
          <td class="w-50">
            <span class="text-muted fw-bold">დასახელება</span>
          </td>
          <td>
            <span class="text-muted fw-bold">რაოდენობა</span>
          </td>
          <td>
            <span class="text-muted fw-bold">ფასი</span>
          </td>
          <td>
            <span class="text-muted d-block fw-bold">ჯამი</span>
          </td>
          <td>
            <span class="text-muted d-block fw-bold">მოდიფიკაცია</span>
          </td>
      </tr>`

}

const $itemFooter = (_) => {
  const {sum, cart_id} = _
  return`<tr>
          <td class="w-25" colspan="2">
            <button type="button" class="btn btn-warning d-flex flex-nowrap align-items-center gap-2" onclick="removeChecked()">
              <i class="fa-solid fa-trash-can"></i>  
              <span class="fw-bold text-black" style="font-size:0.75rem;"> მონიშნულების წაშლა </span>  
            </button>
          </td>
          <td class="w-25" colspan="3">
            <button type="button" class="btn btn-danger d-flex flex-nowrap align-items-center gap-2" data-cart-id="${cart_id}" onclick="emptyCart(event)">
              <i class="fa-solid fa-trash-can"></i>  
              <span class="text-white fw-bold empty-cart">კალათის გასუთავება</span>  
            </button>
          </td>
          <td class="w-25" colspan="2">
            <span class="text-muted d-block fw-bold">საერთო ჯამი: ${sum} ₾ </span>
          </td>
      </tr>`
}

const $authBlock = (_) => {
  const {itemsCount, itemsPrice} = _
      // TODO => Component Block
        const authUser = `<div class="btn-group" role="group">
                              <button type="button" class="btn btn-danger" onclick="logOut()"> 
                                Log Out
                              </button>
                              <button type="button" class="btn btn-secondary d-flex align-items-center flex-nowrap gap-2" onclick="showItems(event)">
                                <i class="fa-solid fa-cart-shopping fa-lg"></i>
                                <span class="cart-info" data-items-count="${itemsCount} ცალი" data-items-price="${itemsPrice} ₾"></span>
                              </button>
                          </div>`

      const guest = `<div class="btn-group" role="group">
                        <button type="button" class="btn btn-primary" onclick="register()"> Register </button>
                        <button type="button" class="btn btn-warning" onclick="authorization()"> Authorization </button>
                    </div>`

      return `<div class="col-md-4">
                ${ localStorage.hasOwnProperty("auth") ? authUser : guest }
              </div>`
}