+++
title = "My wishlist"
description = "Ixion's wishlist"
author = "Ixion"
+++

<script>
    fetch("https://wishlist-tracker.illixion.workers.dev")
    .then(res => res.json())
    .then(data => window.reservationList = data)

    function checkItem(name) {
        if (!(name in window.reservationList)) {
            window.reservationList[name] = {}
            window.reservationList[name]["value"] = false
            fetch("https://wishlist-tracker.illixion.workers.dev/?item=force_refresh")
            .then(res => res.json())
            .then(data => window.reservationList = data)
        }
        if (reservationList[name]['value']) {
            alert(`Somebody else has already reserved this item at ${new Date(reservationList[name]['reserved']).toISOString().split('T')[0]}\n\nThey left the following contact info:\n${reservationList[name]['contactInfo']}`)
            return
        }
        let contactInfo = prompt(`${name} is not yet reserved by anyone.\n\nPlease leave your Telegram username or some other contact info and press OK to confirm reservation. This will be shown to others who try to reserve this item.\nPress CANCEL to cancel.`)
        if (contactInfo === "") {
            contactInfo = "< No contact info provided >"
        }
        if (contactInfo !== null) {
            fetch(`https://wishlist-tracker.illixion.workers.dev/?item=${name}&contact=${contactInfo}&reserve`)
            .then(res => {
                if (res.status === 200) {
                    alert("You've successfully reserved this item!")
                    reservationList[name]['value'] = true
                    reservationList[name]['contactInfo'] = contactInfo
                } else if (res.status === 403) {
                    alert(`Somebody else has already reserved this item at ${new Date(reservationList[name]['reserved']).toISOString().split('T')[0]}\n\nThey left the following contact info:\n${reservationList[name]['contactInfo']}`)
                }
                else {
                    alert("Sorry, an error occured. Check the developer console for more information.")
                }
            })
            .catch(err => {
                console.log(err)
                alert("Sorry, an error occured. Check the developer console for more information.")
            })
        }
    }
</script>

---

||Item|Price|Availability|
|---|---|---|---|
|![FiiO BTR5-2021](/post_files/wishlist/fiiobtr5.jpg)|[FiiO BTR5-2021](https://www.amazon.com/FiiO-BTR5-2021-Receiver-Bluetooth-Headphone/dp/B09G9TNB2R/)|~120EUR|<a href="#" onclick="checkItem('FiiO BTR5-2021')">Check availability</a>|
|![Flair Neo](/post_files/wishlist/flairneo.jpg)|[Flair Neo](https://www.gemoss.lv/shop/lv/riks-kafijas-pagatavosanai-flair-neo-peleks-647213148046)|~100EUR|<a href="#" onclick="checkItem('Flair Neo')">Check availability</a>|
|![Teenage Engineering PO-33 K.O!](/post_files/wishlist/te-po-33.jpg)|[Teenage Engineering PO-33 K.O!](https://soundium.lv/teenage-engineering-po-33-k-o)|99EUR|<a href="#" onclick="checkItem('Teenage Engineering PO-33 K.O!')">Check availability</a>|
