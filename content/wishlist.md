+++
title = "My wishlist"
description = "Manual's wishlist"
author = "Manual"
+++

<script>
    fetch("https://wishlist-tracker.manul.workers.dev")
    .then(res => res.json())
    .then(data => window.reservationList = data)

    function checkItem(name) {
        if (!(name in window.reservationList)) {
            window.reservationList[name] = {}
            window.reservationList[name]["value"] = false
            fetch("https://wishlist-tracker.manul.workers.dev/?item=force_refresh")
            .then(res => res.json())
            .then(data => window.reservationList = data)
        }
        if (reservationList[name]['value']) {
            alert(`Somebody else already reserved this item at ${new Date(+new Date()).toISOString().split('T')[0]}, you might want to get something else instead`)
            return
        }
        if (confirm(`${name} is not yet reserved by anyone. Do you wish to reserve this?`)) {
            fetch(`https://wishlist-tracker.manul.workers.dev/?item=${name}&reserve`)
            .then(res => {
                if (res.status === 200) {
                    alert("You've successfully reserved this item!")
                    reservationList[name]['value'] = true
                } else if (res.status === 403) {
                    alert(`Somebody else already reserved this item at ${new Date(+new Date()).toISOString().split('T')[0]}, so you might want to get something else instead!`)
                }
                else {
                    alert("Sorry, an error occured.")
                }
            })
            .catch(err => {
                console.log(err)
                alert("Sorry, an error occured.")
            })
        }
    }
</script>

[Amazon.de list for international friends](https://www.amazon.de/-/en/hz/wishlist/ls/33KB3IWNOKJOA)

**New!** Check whether anybody else has already pledged to buy this as a gift by clicking the *Check availability* link. <noscript>Unfortunately, JavaScript is disabled in your browser, so this won't work until you enable it.</noscript>

---

||Item|Price|Reservation|
|---|---|---|---|
|![Panasonic Lumix G80/G85 w/ kit lens](/post_files/wishlist/lumix.jpg)|[Panasonic Lumix G80/G85 w/ kit lens](https://www.amazon.de/-/en/Panasonic-DMC-Lumix-system-camera/dp/B01LXB6P78)|~689EUR|<a href="#" onclick="checkItem('Panasonic Lumix G80/G85 w/ kit lens')">Check availability</a>|
|![Audio-Technica AT2020 USB](/post_files/wishlist/AT2020USB.jpg)|[Audio-Technica AT2020USB+](https://www.amazon.co.uk/dp/B00B5ZX9FM)|~140EUR|<a href="#" onclick="checkItem('Audio-Technica AT2020 USB')">Check availability</a>|
|![Edifier R1280DB](/post_files/wishlist/R1280DB.jpg)|[Edifier R1280DB](https://www.rdveikals.lv/products/lv/163/285579/sort/1/filter/0_0_0_0/Edifier-R1280DB-Brown-datora-ska%C4%BCru%C5%86i.html)|~110EUR|<a href="#" onclick="checkItem('Edifier R1280DB')">Check availability</a>|
|![Xiaomi Mijia 360° Panoramic Camera](/post_files/wishlist/pano360.jpg)|[Xiaomi Mijia 360° Panoramic Camera](https://www.aliexpress.com/item/4000837378897.html)|~92EUR|<a href="#" onclick="checkItem('Xiaomi Mijia 360° Panoramic Camera')">Check availability</a>|
|![Raspberry Pi 4B 2GB](/post_files/wishlist/pi4b.jpg)|[Raspberry Pi 4B 4GB](https://www.amazon.de/-/en/Raspberry-ARM-Cortex-A72-WLAN-ac-Bluetooth-Micro-HDMI-Single/dp/B07TC2BK1X/)|~59EUR|<a href="#" onclick="checkItem('Raspberry Pi 4B 2GB')">Check availability</a>|
|![Selfie Ring Light](/post_files/wishlist/ring%20light.jpg)|[Selfie Ring Light](https://www.aliexpress.com/item/4001079355903.html)<br>(26cm light arm stand option)|~27EUR|<a href="#" onclick="checkItem('Selfie Ring Light')">Check availability</a>|
|![Better soldering iron](/post_files/wishlist/soldering%20iron.jpg)|[Better soldering iron](https://www.aliexpress.com/item/4000019437594.html)|15-20EUR|<a href="#" onclick="checkItem('Better soldering iron')">Check availability</a>|
|![Digital Love Synth Enamel Pin](/post_files/wishlist/synth%20pin.jpg)|[Digital Love Synth Enamel Pin](https://www.etsy.com/listing/735338626/digital-love-synth-enamel-pin)|11EUR<br>6EUR shipping|<a href="#" onclick="checkItem('Digital Love Synth Enamel Pin')">Check availability</a>|
---

Last updated: 2020/11/05
