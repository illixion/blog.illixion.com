+++
title = "My wishlist"
description = "Manual's wishlist"
author = "Manual"
+++

<script>
    fetch("https://wishlist-tracker.catto.workers.dev")
    .then(res => res.json())
    .then(data => window.reservationList = data)

    function checkItem(name) {
        if (!(name in window.reservationList)) {
            window.reservationList[name] = {}
            window.reservationList[name]["value"] = false
            fetch("https://wishlist-tracker.catto.workers.dev/?item=force_refresh")
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
            fetch(`https://wishlist-tracker.catto.workers.dev/?item=${name}&contact=${contactInfo}&reserve`)
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
|![Elgato Stream Deck](/post_files/wishlist/streamdeck.jpg)|[Elgato Stream Deck](https://www.amazon.de/-/en/Corsair-Elgato-Stream-Deck-Buttons/dp/B06W2KLM3S)|~150EUR|<a href="#" onclick="checkItem('Elgato Stream Deck')">Check availability</a>|
|![Selfie Ring Light](/post_files/wishlist/ring%20light.jpg)|[Selfie Ring Light](https://www.aliexpress.com/item/4001079355903.html)<br>(26cm light arm stand option)|~27EUR|<a href="#" onclick="checkItem('Selfie Ring Light')">Check availability</a>|
