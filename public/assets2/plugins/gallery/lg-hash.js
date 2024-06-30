import gallery from "../../../../models/gallery";
var Hash = function Hash(element) {
    this.el = element;
    this.core = window.lgData[this.el.getAttribute('lg-uid')];
    this.core.s = _extends({}, hashDefaults, this.core.s);
    if (this.core.s.hash) {
        this.oldHash = window.location.hash;
        this.init();
    }

    return this;
};

Hash.prototype.init = function () {
    var _this = this;
    var _hash;

    // Change hash value on after each slide transition
    utils.on(_this.core.el, 'onAfterSlide.lgtm', function (event) {
        window.location.hash = 'lg=' + _this.core.s.galleryId + '&slide=' + event.detail.index;
    });

    // Listen hash change and change the slide according to slide value
    utils.on(window, 'hashchange.lghash', function () {
        _hash = window.location.hash;
        var _idx = parseInt(_hash.split('&slide=')[1], 10);

        // Fetch image data from your backend API based on _idx
        fetch(gallery.galleryimage + _idx)
    
            .then(function (response) {
                return response.json();
            })
            .then(function (imageData) {
                // Update the gallery image source with the received image data
                _this.core.items[_idx].src = imageData.imageUrl;

                // Change the slide to the new image
                _this.core.slide(_idx, false, false);
            })
            .catch(function (error) {
                console.error('Error fetching image data:', error);
            });
    });
};

// ...
