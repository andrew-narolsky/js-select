const FormStyler = function(options) {
    this.selectors = document.querySelectorAll(options.selectors);
    this.countItems = options.countItems;
    this.init(this.selectors);
}

FormStyler.prototype.init = function($selectors) {
    for (let $selector in $selectors) {
        if ($selectors.hasOwnProperty($selector)) {
            $selectors[$selector].style.display = 'none';
            let $lists = '';
            let $title = '';
            let $options = $selectors[$selector].querySelectorAll('option');
            for (let $option in $options) {
                if ($options.hasOwnProperty($option)) {
                    if ($option === '0') {
                        $title = $options[$option].innerText;
                    }
                    $lists += '<li data-id="' + $options[$option].value + '">' + $options[$option].innerText + '</li>';
                }
            }
            $selectors[$selector].insertAdjacentHTML('afterend', '<div class="swf-list">' +
                '<div class="title">' + $title + '</div>' +
                '<div class="list-wrapper">' +
                '<ul>' + $lists + '</ul>' +
                '</div>' +
                '</div>');
        }
    }
    this.clickOnTitle();
    this.selectOption();
    this.closeOnBody();
}

FormStyler.prototype.changeHeight = function(countItems) {
    for (let $selector in this.selectors) {
        if (this.selectors.hasOwnProperty($selector)) {
            let $listItem = this.selectors[$selector].nextSibling.querySelector('.list-wrapper ul li');
            let listItemsCounts = this.selectors[$selector].nextSibling.querySelectorAll('.list-wrapper ul li').length;
            if (listItemsCounts > countItems) {
                let $newSelect = this.selectors[$selector].nextSibling.querySelector('.list-wrapper ul');
                $newSelect.style.maxHeight = countItems * $listItem.offsetHeight + 'px';
                $newSelect.style.overflowY = 'scroll';
            }
            this.selectors[$selector].nextSibling.querySelector('.list-wrapper').style.top = $listItem.offsetHeight + 'px';
        }
    }
}

FormStyler.prototype.clickOnTitle = function() {
    for (let $selector in this.selectors) {
        if (this.selectors.hasOwnProperty($selector)) {
            let $title = this.selectors[$selector].nextSibling.querySelector('.title');
            $title.addEventListener('click',  (event) => {
                event.stopPropagation();
                this.selectors[$selector].nextSibling.classList.toggle('opened');
                this.changeHeight(this.countItems);
            });
        }
    }
}

FormStyler.prototype.selectOption = function() {
    for (let $selector in this.selectors) {
        if (this.selectors.hasOwnProperty($selector)) {
            let $title = this.selectors[$selector].nextSibling.querySelector('.title');
            let $lists = this.selectors[$selector].nextSibling.querySelectorAll('.list-wrapper ul li');
            let $select = this.selectors[$selector];
            for (let $li in $lists) {
                if ($lists.hasOwnProperty($li)) {
                    $lists[$li].addEventListener('click',  function (event) {
                        event.stopPropagation();
                        let id = $lists[$li].getAttribute('data-id');
                        $title.innerText = $lists[$li].innerText;
                        $select.value = id;
                        $select.nextSibling.classList.remove('opened');
                    });
                }
            }
        }
    }
}

FormStyler.prototype.closeOnBody = function() {
    let $body = document.querySelector('body');
    for (let $selector in this.selectors) {
        if (this.selectors.hasOwnProperty($selector)) {
            $body.addEventListener('click',  () => {
                this.selectors[$selector].nextSibling.classList.remove('opened');
            });
        }
    }
}
