// Global State //
const perSeatPrice = 550;
let totalBill = 0;
let totalAvailableSeats = 40;
let selectedSeats = [];
const availableCoupons = ['new 15', 'couple 20']

function toggleSeatIfAvailable(seatButton) {
  const curSeatNumber = seatButton.attributes["data-seat"].value;
  const isSelected = selectedSeats.includes(curSeatNumber);

  if (isSelected) {
    // remove the item if it is already selected
    let foundIndex = selectedSeats.findIndex(function (element) {
      return element == curSeatNumber;
    });

    selectedSeats.splice(foundIndex, 1);
    seatButton.classList.remove("selected");
    totalAvailableSeats = totalAvailableSeats + 1;
    updateSeatCountView(totalAvailableSeats);
    removeItemFromSeatListView(curSeatNumber, perSeatPrice);
  } else {
    // exit out function if there is already 4 items selected
    if (selectedSeats.length >= 4) {
      alert("You can select upto 4 seats.");
      return;
    }

    // add the item to list
    selectedSeats.push(curSeatNumber);
    seatButton.classList.add("selected");
    totalAvailableSeats = totalAvailableSeats - 1;
    updateSeatCountView(totalAvailableSeats);
    addItemToSeatListView(curSeatNumber, perSeatPrice);
  }
}
// DOM Manipulation //
function updateSeatCountView(count) {
  document.querySelector("#available-seat-data").innerText = count;
}
function addItemToSeatListView(seatNumber, price) {
  const SeatListView = document.querySelector("#seat-list");

  let itemData = `<div class="flex justify-evenly pt-4">
    <p class="font-medium">${seatNumber}</p>
    <p class="font-medium">Economy</p>
    <p class="font-medium">${price}</p>
  </div>`;

  const item = document.createElement("div");
  item.id = `seat-no-${seatNumber}`;
  item.innerHTML = itemData;
  SeatListView.appendChild(item);

  totalBill = totalBill + price;

  document.getElementById("total-price").innerText = `BDT ${totalBill}`;

  // console.log(totalBill);
}
function removeItemFromSeatListView(seatNumber, price) {
  document.querySelector(`#seat-no-${seatNumber}`).remove();

  totalBill = totalBill - price;

  document.getElementById("total-price").innerText = `BDT ${totalBill}`;
  console.log(totalBill);
}

// Event listeners //
const seatSelectorBtns = document.querySelectorAll(".seat-selector-btn");
for (const seatButton of seatSelectorBtns) {
  seatButton.addEventListener("click", function () {
    toggleSeatIfAvailable(seatButton);
  });
}

const couponApplyBtn = document.getElementById("coupon-apply-btn");
couponApplyBtn.addEventListener("click", function () {
  // 1. get input text
  const getInputValue = document.getElementById("coupon-input");
  const inputValue = getInputValue.value;
  // parse number with regex
  const numberPattern = /\d+/g;
  let discountPercentage = inputValue.match(numberPattern).join('');
  console.log('percentage', discountPercentage)
  // discountPercentage = parseInt(discountPercentage);

  // // 2. calculate the percentage
  // // Ex: => 20%
  // // 20 / 100 * 200
  // // result 40
  const discountRate = (discountPercentage / 100) * totalBill;
  const afterDiscount = totalBill - discountRate;

  // // 3. dom manipulate to grand total
  const grandTotal = document.getElementById("grand-price");
  grandTotal.innerText = `BDT ${afterDiscount}`;
});
